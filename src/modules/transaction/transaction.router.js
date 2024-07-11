import { Router } from 'express';
import Transaction from '../../../database/models/user/transaction.model.js';
const router = Router();


router.get('/history/:accountId', async (req, res) => {
    let { accountId } = req.params
    let data = await Transaction.findAll({ where: { account_id: accountId } })
    if (data) {
        res.json(data)
    } else {
        res.json({ error: 'No transactions found' })
    }
})

export default router