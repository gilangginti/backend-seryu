import { IResultPaginated } from "../../dtos";
import { resultPaginated } from "../../helpers";
import { prismaClient } from "../../libs";
import { IDriverRepository } from "../IDriverRepository";

export class DriverRepository implements IDriverRepository {
    async findAll(
        page: number,
        perPage: number,
        status: string,
        driverCode: string,
        driverName: string,
        month: number,
        year: number
    ): Promise<IResultPaginated> {
        let query = `
        SELECT * FROM (
            WITH attendance_salary AS (
                SELECT
                    dr."name" AS NAME,
                    da.driver_code,
                    COUNT(*) * (SELECT VALUE::NUMERIC FROM variable_configs WHERE KEY = 'DRIVER_MONTHLY_ATTENDANCE_SALARY') AS total_attendance_salary
                FROM
                    driver_attendances AS da
                    JOIN drivers AS dr ON da.driver_code = dr.driver_code
                WHERE
                    da.attendance_status = TRUE
                GROUP BY
                    da.driver_code,
                    dr."name"
            ),
            shipment_costs_summary AS (
                SELECT
                    sc.driver_code,
                    SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END)::INT AS total_pending,
                    SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END)::INT AS total_confirmed,
                    SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END)::INT AS total_paid,
                    COUNT(CASE WHEN ss.shipment_status != 'CANCELLED' THEN 1 ELSE NULL END)::INT AS total_shipments
                FROM
                    shipment_costs sc
                    JOIN shipments AS ss ON sc.shipment_no = ss.shipment_no
                WHERE
                    EXTRACT(MONTH FROM ss.shipment_date) = $1
                    AND EXTRACT(YEAR FROM ss.shipment_date) = $2
                GROUP BY
                    sc.driver_code
            )
            SELECT
                scs.driver_code,
                att.NAME AS NAME,
                scs.total_pending,
                scs.total_confirmed,
                scs.total_paid,
                COALESCE(att.total_attendance_salary, 0)::INT AS total_attendance_salary,
                (COALESCE(att.total_attendance_salary, 0) + COALESCE(scs.total_paid, 0))::INT AS total_salary,
                scs.total_shipments
            FROM
                shipment_costs_summary scs
                LEFT JOIN attendance_salary att ON scs.driver_code = att.driver_code
            GROUP BY
                scs.driver_code,
                scs.total_pending,
                scs.total_confirmed,
                scs.total_paid,
                att.total_attendance_salary,
                att.NAME,
                scs.total_shipments
        ) AS driver_salary
        WHERE 1=1
    `;
        const params: any[] = [month, year];
        // Add optional filters
        if (driverCode) {
            query += ` AND driver_salary.driver_code = $${params.length + 1}`;
            params.push(driverCode);
        }

        if (driverName) {
            query += ` AND driver_salary.NAME ILIKE $${params.length + 1}`;
            params.push(`%${driverName}%`);
        }
        if (status) {
            query += `
            AND (
                CASE 
                    WHEN $${params.length + 1} = 'CONFIRMED' THEN driver_salary.total_confirmed > 0
                    WHEN $${params.length + 1} = 'PENDING' THEN driver_salary.total_pending > 0
                    WHEN $${params.length + 1} = 'PAID' THEN driver_salary.total_paid > 0
                    ELSE TRUE
                END
            )
        `;
            params.push(status);
        }
        const driverSalary = await prismaClient.$queryRawUnsafe(query, ...params);
        const result = await resultPaginated(driverSalary, page, perPage);
        return result;
    }

}