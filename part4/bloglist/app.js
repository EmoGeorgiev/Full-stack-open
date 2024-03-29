const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('connected to Mongo'))
    .catch((error) => logger.error('error connecting to MongoDB', error.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app