import { IResultPaginated } from "../../../dtos";
import { IDriverRepository } from "../../../repositories";


export class FindAllDriverUseCase {
  constructor(
    private driverRepository: IDriverRepository
  ) { }

  async execute(page: number, perPage: number, status: string, driverCode: string, driverName: string, month: number, year: number): Promise<IResultPaginated> {

    const result = await this.driverRepository.findAll(page, perPage, status, driverCode, driverName, month, year);
    return result;
  }
}