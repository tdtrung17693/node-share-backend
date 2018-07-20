const fields = [
    'id',
    'from',
    'to',
    'files',
    'created'
]

class Post {
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

    validate (value, field) {
        return value
    }

    static create (post) {
        return new Post(post)
    }
}

export default Post
export { fields }
