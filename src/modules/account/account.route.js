import { Router } from 'express';
import User from '../../../database/models/user/user.model.js';
import Account from '../../../database/models/user/account.model.js';
import Transaction from '../../../database/models/user/transaction.model.js';
const router = Router();

// Create Account
router.post('/createAccount', async (req, res) => {
    let { username } = req.body
    let data = await User.findOne({ where: { username } })
    if (data) {
        let foundedAccount = await Account.findOne({ where: { user_id: data.id } })
        if (foundedAccount) {
            res.json({ error: 'Account already exists' })
        } else {
            let accountData = await Account.create({ user_id: data.id })
            if (!accountData) {
                res.json({ error: 'Failed to create account' })
            } else {
                res.json(accountData)
            }
        }
    } else {
        res.json({ error: 'you have to rigester first ' })
    }
})

// Deposit
router.put('/deposit', async (req, res) => {
    let { amount, username } = req.body
    let user = await User.findOne({ where: { username } })
    if (user) {
        console.log(user);
        let account = await Account.findOne({ where: { user_id: user.id } })
        if (account) {
            account.balance += amount
            await account.save()
            let data = await Transaction.create({ amount, type: "deposit", account_id: account.id, transaction_date: new Date() })
            res.json(account)
        } else {
            res.json({ error: 'Account not found' })
        }
    } else {
        res.json({ error: 'User not found' })
    }
})

// Withdraw
router.put('/withdraw', async (req, res) => {
    let { amount, username } = req.body
    let user = await User.findOne({ where: { username } })
    if (user) {
        let account = await Account.findOne({ where: { user_id: user.id } })
        if (account) {
            account.balance -= amount
            await account.save()
            await Transaction.create({ amount, type: "withdraw", account_id: account.id, transaction_date: new Date() })
            res.json(account)
        } else {
            res.json({ error: 'Account not found' })
        }
    } else {
        res.json({ error: 'User not found' })
    }
})

// Balance Inquiry
router.post('/balanceInquiry', async (req, res) => {
    let { username } = req.body
    let user = await User.findOne({ where: { username } })
    if (user) {
        let account = await Account.findOne({ where: { user_id: user.id } })
        if (account) {
            res.json(account)
        } else {
            res.json({ error: 'Account not found' })
        }
    } else {
        res.json({ error: 'User not found' })
    }
})


export default router