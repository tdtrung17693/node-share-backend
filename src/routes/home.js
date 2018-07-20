import { Router } from 'express'
import { version } from '../../package.json'
import path from 'path'

const homeRouter = Router()

homeRouter.get('/', (req, res, next) => {
    console.log('asd')
    return res.sendFile(path.join(__dirname, '/../../../app/build/index.html'))
})

export default homeRouter
