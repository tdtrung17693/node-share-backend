import { ObjectId } from 'mongodb'
import fileMapper from '../libs/mapper/fileMapper'

const fileRepository = {
    setDb (dbHandler) {
        this.dbHandler = dbHandler
    },

    find (id) {
        console.log(id)
        return new Promise((resolve, reject) => {
            this.dbHandler
                .collection('files')
                .findOne({ _id: ObjectId(id) }, (err, file) => {
                    if (err) return reject(err)

                    resolve(file ? fileMapper.toEntity(file) : null)
                })
        })
    },

    findIds (ids) {
        return new Promise((resolve, reject) => {
            this.dbHandler
                .collection('files')
                .find({ _id: { '$in': ids } })
                .toArray((err, result) => {
                    if (err) {
                        reject(err)
                    }

                    if (!result) resolve(null)

                    const files = result.map(r => fileMapper.toEntity(r))
                    resolve(files)
                })
        })
    },

    persist (file) {
        return new Promise((resolve, reject) => {
            const fileDto = fileMapper.toDto(file)

            this.dbHandler.collection('files')
                .insertOne(
                    fileDto,
                    (err, result) => {
                        if (err) return reject(err)

                        result = result.ops.map(r => {
                            return fileMapper.toEntity(r)
                        })

                        resolve(result[0])
                    }
                )
        })
    },

    persistMany (files) {
        let fileDtos = []

        files.forEach(file => {
            fileDtos.push(
                fileMapper.toDto(file)
            )
        })

        return new Promise((resolve, reject) => {
            this
                .dbHandler.collection('files')
                .insertMany(
                    fileDtos,
                    (err, result) => {
                        if (err) return reject(err)
                        console.log(result.ops)
                        result = result.ops.map(r => {
                            return fileMapper.toEntity(r)
                        })

                        resolve(result)
                    }
                )
        })
    }
}

export default fileRepository
