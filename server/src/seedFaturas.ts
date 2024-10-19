import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, '../extractedData/data.json');

  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const faturas = JSON.parse(jsonData);

  for (const fatura of faturas) {
    await prisma.faturaEnergia.create({
      data: fatura,
    });
  }

  console.log('Banco de dados preenchido com sucesso com as faturas!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
