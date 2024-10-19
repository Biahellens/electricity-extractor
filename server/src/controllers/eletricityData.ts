import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllInvoices = async (req: Request, res: Response): Promise<void> => {
    try {
        const invoices = await prisma.faturaEnergia.findMany();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving invoices' });
    }
};

export const createInvoice = async (req: Request, res: Response): Promise<void> => {
    try {
        const newInvoice = await prisma.faturaEnergia.create({
            data: req.body,
        });
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(500).json({ message: 'Error creating invoice' });
    }
};

export const getInvoiceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const invoice = await prisma.faturaEnergia.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (invoice) {
            res.status(200).json(invoice);
        } else {
            res.status(404).json({ message: 'Invoice not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving invoice' });
    }
};

export const updateInvoice = async (req: Request, res: Response): Promise<void> => {
    try {
        const invoice = await prisma.faturaEnergia.update({
            where: { id: Number(req.params.id) },
            data: req.body,
        });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Error updating invoice' });
    }
};

export const deleteInvoice = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.faturaEnergia.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting invoice' });
    }
};

export const getEletricityData = async (req: Request, res: Response): Promise<void> => {
  try {
      const faturas = await prisma.faturaEnergia.findMany({
          select: {
              energiaCompensadaQuantidade: true,
              energiaEletricaQuantidade: true,
              mesRef: true
          },
      });

      res.status(200).json(faturas);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving energia quantities' });
  }
};

export const getInvoceValueData = async (req: Request, res: Response): Promise<void> => {
  try {
      const faturas = await prisma.faturaEnergia.findMany({
          select: {
              contribIlumPM: true,
              valorTotal: true,
              mesRef: true
          },
      });

      res.status(200).json(faturas);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving energia quantities' });
  }
};
