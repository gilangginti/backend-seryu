import { Router } from 'express'

import { PREFIX_ROUTE } from '../core/url'; // Prefix Global route
//* Routes *//
import { driverRoutes } from './driver.route';

const routes = Router();
routes.use(`${PREFIX_ROUTE}/driver`, driverRoutes);

export { routes }