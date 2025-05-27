import express from 'express';
import userRauter from './routes/userRouter';
import penulisRouter from "./routes/penulisRouter"
import kategoriRouter from "./routes/kategoriRouter"
import { errorHandler } from './middlewares/errorHandler';
import beritaRouter from './routes/beritaRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRauter);
app.use('/api/penulis', penulisRouter);
app.use('/api/kategori', kategoriRouter);

app.use('/api/berita', beritaRouter);

app.use(errorHandler)

export default app;
