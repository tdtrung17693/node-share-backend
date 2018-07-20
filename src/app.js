import path from 'path'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { connect } from './libs/db'
import { initRoutes } from './routes'
import fileRepository from './services/fileRepository'
import postRepository from './services/postRepository'

const app = express()
const storagePath = path.join(__dirname, '..', 'storage')

app.use(morgan('dev'))
app.use(cors({
    exposedHeaders: '*'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('root', __dirname)
app.use(express.static(path.join(__dirname, '/../../app/build')))

initRoutes(app)

connect((error, db) => {
    if (error) {
        console.error('Database Connection Error')
        throw error
    }

    fileRepository.setDb(db)
    postRepository.setDb(db)
})

export default app
