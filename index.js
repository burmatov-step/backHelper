require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const routerAuth = require('./router/index')
const loginFindAccaunt = require('./router/loginFindAccaunt')
const typeAccaunt = require('./router/type_find_account')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', routerAuth)
app.use('/api', loginFindAccaunt)
app.use('/api', typeAccaunt)
app.use(errorMiddleware)
const start = async () =>{
   try{
       await mongoose.connect(process.env.DB_URL,{
           useNewUrlParser: true,
           useUnifiedTopology: true
       })
    app.listen(PORT, () => console.log(`Server start on PORT = ${PORT}`))
   }catch(e){
       console.log(e)
   }
}

start()