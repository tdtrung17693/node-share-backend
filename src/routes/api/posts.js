import { Router } from 'express'

import postRepository from '../../services/postRepository'
import fileRepository from '../../services/fileRepository'
import postMapper from '../../libs/mapper/postMapper'
import fileMapper from '../../libs/mapper/fileMapper'
import archiver from '../../libs/archiver'
import { downloadAll } from '../../libs/downloader'

import config from '../../config/misc'

const postRouter = Router()

postRouter.get('/:id', (req, res) => {
    const id = req.params.id
    const download = req.query.download

    postRepository.find(id)
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    error: {
                        message: 'Post Not Found'
                    }
                })
            }

            const postDto = postMapper.toDto(post)

            postDto.id = postDto._id
            delete postDto._id

            fileRepository.findIds(postDto.files)
                .then(files => {
                    if (!files) {
                        return res.status(404).json({
                            error: {
                                message: 'Files not Found'
                            }
                        })
                    }

                    files = files.map(file => {
                        let fileDto = fileMapper.toDto(file)

                        fileDto.path = `//${config.apiRoot}/download/${fileDto._id}`

                        if (!download) {
                            delete fileDto._id
                            delete fileDto.filename
                        }

                        return fileDto
                    })

                    if (download) {
                        res.attachment('download.zip')
                        // return archiver.download(res)
                        return downloadAll(files, res)
                    }

                    postDto.files = files

                    res.json(postDto)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
})

export default postRouter
