import fs from 'fs'
import archiver from 'archiver'
import fileManager from '../services/fileManager'

export default {
    files: [],
    setPayload (files) {
        this.files = files
    },
    download (stream) {
        const zip = archiver('zip', { zlib: { level: 9 } })
        zip.on('end', function () {
            console.log('Archive wrote %d bytes', zip.pointer())
            stream.end()
        })
        zip.pipe(stream)

        this.files.forEach(file => {
            const filePath = fileManager.getDownloadPath(file.filename)

            zip.append(fs.createReadStream(filePath), { name: file.originalname })
        })

        zip.finalize()
    }
}
