import { DriverRepository } from "../../../repositories/implementation/DriverRepository"
import { FindAllDriverController } from "./FindAllDriverController"
import { FindAllDriverUseCase } from "./FindAllDriverUseCase"

export const findAllDriverFactory = () =>{
    const driverRepository = new DriverRepository()
    const findAllDriverUseCase = new FindAllDriverUseCase(driverRepository)
    const findAllDriverController = new FindAllDriverController(findAllDriverUseCase)
    return findAllDriverController
}