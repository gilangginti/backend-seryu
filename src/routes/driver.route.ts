import { Router } from "express";
import { findAllDriverFactory } from "../usecase/Driver/FindAllDriver/FindAllUserFactory";

const driverRoutes = Router();
/** GET Methods */
    /**
     * @openapi
     * '/v1/driver/salary/list':
     *  get:
     *     tags:
     *     - Driver Controller
     *     summary: Get list salary drivers
     *     parameters:
     *      - in: query
     *        name: month 
     *        schema:
     *        type: string
     *        description: The month is number ex. feb = 2
     *        required: true
     *      - in: query
     *        name: year 
     *        schema:
     *        type: string
     *        description: The year is number ex. 2024
     *        required: true
     *      - in: query
     *        name: page 
     *        schema:
     *        type: string
     *        description: pagination page
     *        required: false
     *      - in: query
     *        name: perPage 
     *        schema:
     *        type: string
     *        description: pagination perPage
     *        required: false
     *      - in: query
     *        name: driverCode 
     *        schema:
     *        type: string
     *        description: filter driver code is equal
     *        required: false
     *      - in: query
     *        name: driverName 
     *        schema:
     *        type: string
     *        description: filter driver name contains driverName
     *        required: false
     *      - in: query
     *        name: status 
     *        schema:
     *        type: string
     *        description: Pending for total_pending > 0 , CONFIRMED for total_confirmed > 0 , PAID for total_paid > 0
     *        required: false
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
driverRoutes.get("/salary/list", (request, response) => {
  return findAllDriverFactory().handle(request, response);
});

export { driverRoutes }