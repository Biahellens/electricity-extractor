import express from 'express';
import invoceRoutes from './routes/eletricityRoutes';

const app = express();

app.use(express.json());

app.use('/api', invoceRoutes);

export default app;
