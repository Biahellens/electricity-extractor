import { Router } from 'express';
import {
    createInvoice,
    deleteInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    getEletricityData,
    getInvoceValueData
} from '../controllers/eletricityData';

const router = Router();

router.get('/invoces', getAllInvoices);
router.get('/eletricityData', getEletricityData);
router.get('/invoceValueData', getInvoceValueData);
router.post('/invoces', createInvoice);
router.get('/invoces/:id', getInvoiceById);
router.put('/invoces/:id', updateInvoice);
router.delete('/invoces/:id', deleteInvoice);

export default router;