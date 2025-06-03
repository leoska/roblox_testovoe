import express from 'express';
import balanceRoute from './routes/balance.route';
import errorHandler from './middlewares/error-handler.middleware';
import logRequest from './middlewares/log-request.middleware';
import initModels from './models';

initModels();

const app = express();
app.use(express.json());
app.use(logRequest);
app.use('/', balanceRoute);

app.use(errorHandler);

export default app;
