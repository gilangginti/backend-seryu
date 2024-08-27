import { IResultPaginated } from "../dtos";

export interface IDriverRepository {
  findAll(page: number, perPage: number, status: string, driverCode: string, driverName: string, month: number, year: number):Promise<IResultPaginated>;
}