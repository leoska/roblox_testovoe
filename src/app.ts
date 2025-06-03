import express from 'express';
import * as routes from './routes';
import errorHandler from './middlewares/error-handler.middleware';
import logRequest from './middlewares/log-request.middleware';
import initModels from './models';

initModels();

const app = express();
app.use(express.json());
app.use(logRequest);
app.use('/', Object.values(routes));

app.use(errorHandler);

export default app;
