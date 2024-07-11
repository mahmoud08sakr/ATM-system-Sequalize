import express, { json } from 'express'
import userRouter from './src/modules/user/user.router.js'
import accountRoutes from './src/modules/account/account.route.js'
import transactionRouter from './src/modules/transaction/transaction.router.js'


const app = express()
const port = 3000

app.use(json())
app.use('/users',userRouter)
app.use('/account',accountRoutes)
app.use('/transaction',transactionRouter)


app.get('/', (req, res) => res.send('Hello World!'))



app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))