import express from 'express';
import balanceRoute from './routes/balance.route';

const app = express();
app.use(express.json());

app.use('/balance', balanceRoute);

export default app;
