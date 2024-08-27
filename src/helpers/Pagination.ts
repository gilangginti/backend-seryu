import { IResultPaginated } from "../dtos";
import { paginate } from 'arrpag'

export const resultPaginated = async (content: any, page: number, perPage: number): 
Promise<IResultPaginated> => {
  const pagination = paginate(content, page, perPage)
  const successResponse = {
    status: 200,
    message: "List returned successfully"
  }

  return {
    data: (content.length === 0) ? [] : pagination.results,
    total_row: pagination.totalResults,
    current: pagination.currentPage,
    page_size: pagination.pages,
    return: successResponse,
  }
}