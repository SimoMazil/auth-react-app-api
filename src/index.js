import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import auth from './routes/auth'
import users from './routes/users'
import books from './routes/books'

dotenv.config()

const app = express()
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})

app.use("/api/auth", auth)
app.use("/api/users", users)
app.use("/api/books", books)

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8080, () => console.log('Running on 8080'))