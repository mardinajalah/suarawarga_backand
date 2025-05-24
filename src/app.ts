import express from 'express';
import userRauter from './routes/userRouter';
import penulisRouter from "./routes/penulisRouter"
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());

app.use('/api/user', userRauter);
app.use('/api/penulis', penulisRouter);


app.use(errorHandler)

export default app;
