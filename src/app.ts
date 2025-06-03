import express from 'express';
import balanceRoute from './routes/balance.route';
import errorHandler from './middlewares/error-handler.middleware';

const app = express();
app.use(express.json());

app.use('/balance', balanceRoute);

app.use(errorHandler);

export default app;
