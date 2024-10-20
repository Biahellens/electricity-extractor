import express from 'express';
import cors from 'cors';
import invoceRoutes from './routes/eletricityRoutes';

const app = express();

(async () => {

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );

  app.use(express.json());

  app.use('/api', invoceRoutes);
})()

export default app
