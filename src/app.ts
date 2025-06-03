import express from 'express';
import balanceRoute from './routes/balance.route';
import errorHandler from './middlewares/error-handler.middleware';
import logRequest from './middlewares/log-request.middleware';
import initModels from './models';
import cronRoute from './routes/cron.route';

initModels();

const routes = [balanceRoute, cronRoute];

const app = express();
app.use(express.json());
app.use(logRequest);
app.use('/', routes);

app.use(errorHandler);

export default app;
