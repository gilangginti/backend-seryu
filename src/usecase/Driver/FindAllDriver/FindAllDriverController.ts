import { Request, Response } from 'express'
import { FindAllDriverUseCase } from './FindAllDriverUseCase';


export class FindAllDriverController {
  constructor(
    private findAllDriverUseCase: FindAllDriverUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const page: number = parseInt(request.query.page as string)
      const perPage: number = parseInt(request.query.perPage as string)
      const status: string = request.query.status as string
      const driverCode: string = request.query.driverCode as string
      const driverName: string = request.query.driverName as string

      // Validate month and year
      const month: number = parseInt(request.query.month as string);
      const year: number = parseInt(request.query.year as string);

      if (isNaN(month) || month < 1 || month > 12) {
        return response.status(400).json({
            message: 'Invalid month. Month must be a number between 1 and 12.'
        });
    }

    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        return response.status(400).json({
            message: 'Invalid year. Year must be a valid number.'
        });
    }
    // Execute the use case with validated parameters
    const data = await this.findAllDriverUseCase.execute(page, perPage, status.toUpperCase(), driverCode, driverName, month, year);
    return response.status(200).json(data);

    } catch (err: any) {
      return response.status(400).json({
        message: err?.message || 'Unexpected error.'
      })
    }
  }
}