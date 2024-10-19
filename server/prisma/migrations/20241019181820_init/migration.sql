-- CreateTable
CREATE TABLE "fatura_energia" (
    "id" SERIAL NOT NULL,
    "nCliente" TEXT NOT NULL,
    "mesRef" TEXT NOT NULL,
    "energiaEletricaQuantidade" DOUBLE PRECISION NOT NULL,
    "energiaEletricaValor" DOUBLE PRECISION NOT NULL,
    "energiaSCEEEQuantidade" DOUBLE PRECISION NOT NULL,
    "energiaCompensadaValor" DOUBLE PRECISION NOT NULL,
    "contribIlumPM" DOUBLE PRECISION NOT NULL,
    "pdfFatura" TEXT NOT NULL,
    "valotTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "fatura_energia_pkey" PRIMARY KEY ("id")
);
