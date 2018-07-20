import { ObjectId } from 'mongodb'
import postMapper from '../libs/mapper/postMapper'
import fileMapper from '../libs/mapper/fileMapper'

const fileRepository = {
    setDb (dbHandler) {
        this.dbHandler = dbHandler
    },

    find (id) {
        return new Promise((resolve, reject) => {
            this.dbHandler
                .collection('posts')
                .findOne({ _id: ObjectId(id) }, (err, post) => {
                    if (err) return reject(err)

                    if (!post) resolve(null)

                    resolve(postMapper.toEntity(post))
                })
        })
    },

    persist (post) {
        return new Promise((resolve, reject) => {
            const postDto = postMapper.toDto(post)

            this.dbHandler.collection('posts')
                .insertOne(
                    postDto,
                    (err, result) => {
                        if (err) return reject(err)

                        result = result.ops.map(r => {
                            return postMapper.toEntity(r)
                        })

                        resolve(result[0])
                    }
                )
        })
    }
}

export default fileRepository
