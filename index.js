import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './router/router.js'
import bodyParser from "body-parser"
import dotenv from 'dotenv'

const app = express()
dotenv.config()
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))

app.use(cors())
//route should be below cors
app.use('/posts',router)
const CONN=process.env.CONNECTION

const url = 'mongodb://localhost/MernStack';

const PORT =process.env.PORT || 5000

mongoose.connect(CONN,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{app.listen(PORT,()=>(console.log(`server running on port ${PORT}`)))})
.catch((error)=>{console.log(error.message)})

mongoose.set('useFindAndModify', false)
