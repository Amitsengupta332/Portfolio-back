import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
const app: Application = express();

// //parsers
// app.use(express.json());
// app.use(cors());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('assignment 3 running');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
