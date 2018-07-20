import fs from 'fs'
import Stream from 'stream'
import path from 'path'
import archiver from 'archiver'
import azure from 'azure-storage'
import config from '../config/upload'

let azureService

if (config.engine === 'azure') {
    azureService = azure.createBlobService()
}

// the download strategy should be separate to individual class
// but I am currently a little bit lazy (~.~)
export function downloadOne (file, response) {
    if (config.engine === 'azure') {
        azureService.getBlobToStream(config.containerName, file.filename, response, (err, result, res) => {
            if (!err) {
                res.status(200)
                res.end()
                return console.log(result)
            }

            res.status(404)
            res.end()
            return console.log(err)
        })
    } else {
        return response.download(
            path.join(config.storageDir, file.filename),
            file.originalname,
            err => {
                if (err) {
                    console.error(err)
                    response.status(404).json({
                        error: {
                            message: 'File Not Found'
                        }
                    })
                }
            }
        )
    }
}

export function downloadAll (files, response) {
    const zip = archiver('zip', { zlib: { level: 9 } })

    zip.on('end', function () {
        console.log('Archive wrote %d bytes', zip.pointer())
    })
    zip.pipe(response)

    const fileStreams = files.map((file, index) => {
        let fileStream
        if (config.engine === 'azure') {
            fileStream = azureService.createReadStream('files', file.filename)
        } else {
            fileStream = fs.createReadStream(path.join(config.storageDir, file.filename))
        }

        return [fileStream, file.filename]
    })

    fileStreams.forEach(([stream, name]) => {
        zip.append(stream, { name: name })
    })

    zip.finalize()
}
