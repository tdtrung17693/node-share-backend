import { Router } from 'express'
import { version } from '../../package.json'
import path from 'path'

const homeRouter = Router()

homeRouter.get('/', (req, res, next) => {
    return res.send('Hi there')
})

export default homeRouter
