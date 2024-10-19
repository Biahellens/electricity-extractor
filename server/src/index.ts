import { PrismaClient } from '@prisma/client';
import app from './app';

const PORT = 3000;
const prisma = new PrismaClient();

const startServer = async () => {
    await prisma.$connect();

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();
