require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const routerAuth = require('./router/index')
const loginFindAccaunt = require('./router/loginFindAccaunt')
const tokenFb = require('./router/token_fb')
const fileUpload = require('express-fileupload')
const uploadPost = require('./router/upload_post')
const fb_users = require('./router/fb_users')
const typeAccaunt = require('./router/type_find_account')
const errorMiddleware = require('./middlewares/error-middleware')
const filePathMiddleware = require('./middlewares/filepath.middleware')
const startCron = require('./middlewares/cron-middleware')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(fileUpload({}))
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.static('files'))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/api', routerAuth)
app.use('/api', loginFindAccaunt)
app.use('/api', typeAccaunt)
app.use('/api', fb_users)
app.use('/api', tokenFb)
app.use('/api', uploadPost)
app.use(errorMiddleware)
// app.use(startCron)
const start = async () =>{
   try{
       await mongoose.connect(process.env.DB_URL,{
           useNewUrlParser: true,
           useUnifiedTopology: true
       })
    app.listen(PORT, () => console.log(`Server start on PORT = ${PORT}`))
    startCron()
   }catch(e){
       console.log(e)
   }
}

start()