import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { routes } from './routes';
import { ErrorInternal } from './helpers/ErrorInternal';
import { swaggerSpec } from './libs';


const server = express();
server.use(express.json())
server.use(cors())
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'))
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use(routes)
server.use(ErrorInternal)

export { server }