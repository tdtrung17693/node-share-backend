import { Router } from 'express'

import miscConfig from '../../config/misc'
import Post from '../../models/Post'
import File from '../../models/File'
import postRepository from '../../services/postRepository'
import fileRepository from '../../services/fileRepository'
import { sendDownloadLink } from '../../libs/mailer'
import fileMapper from '../../libs/mapper/fileMapper'
import postMapper from '../../libs/mapper/postMapper'
import fileFactory from '../../libs/fileFactory'
import upload from '../../libs/uploader'
import { downloadOne } from '../../libs/downloader'

const apiRouter = Router()

apiRouter.post('/upload', upload.array('files'), (req, res, next) => {
    let uploadFiles = req.files || []

    if (uploadFiles.length <= 0) {
        return res.json({
            message: 'Nothing To Upload'
        })
    }

    let files = []

    uploadFiles.forEach((file) => {
        file = File.create(fileFactory, file)
        files.push(fileMapper.toDto(file))
    })
    console.log(files)
    fileRepository.persistMany(files)
        .then(results => {
            const restResult = results.map(file => {
                let dto = fileMapper.toDto(file)

                dto.id = dto._id
                delete dto._id
                return dto
            })

            let fileIds = restResult.map(file => file.id)

            return postRepository
                .persist(Post.create({
                    ...req.body,
                    files: fileIds
                }))
                .then(post => {
                    const postDto = postMapper.toDto(post)

                    postDto.id = postDto._id
                    delete postDto._id

                    sendDownloadLink(post.from, post.to, post.message, `//${miscConfig.webRoot}/share/${post.id}`)
                        .catch(err => console.error(err))
                    return res.json(postDto)
                })
        })
        .catch(error => {
            console.error(error)
            return res.status(500).send({
                error: {
                    message: 'Unexpected Error Occurred.'
                }
            })
        })
})

apiRouter.get('/download/:fileId', (req, res, next) => {
    const fileId = req.params.fileId

    fileRepository.find(fileId)
        .then(file => {
            if (!file) {
                return res.status(404).json({
                    error: {
                        message: 'File Not Found'
                    }
                })
            }
            const fileDto = fileMapper.toDto(file)

            res.attachment(fileDto.originalname)
            return downloadOne(file, res)
        })
        .catch(err => {
            console.error(err)
            res.status(404).json({
                error: {
                    message: 'File Not Found'
                }
            })
        })
})

export default apiRouter
