const fields = [
    'id',
    'originalname',
    'filename',
    'mimetype',
    'size',
    'created'
]

class File {
    constructor (obj) {
        this.populate(obj)
        this.created = Date.now()
    }

    populate (obj) {
        fields.forEach(field => {
            const value = obj[ field ]
            if (this.validate(value, field)) {
                this[ field ] = value
            } else {
                this[ field ] = null
            }
        })
    }

    getPath (storageManager) {
        return storageManager.getDownloadPath(this)
    }

    validate (value, field) {
        return value
    }

    static create (fileFactory, file) {
        return fileFactory(file)
    }
}

export default File
export { fields }
