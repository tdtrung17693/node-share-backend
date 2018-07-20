import Post from '../../models/Post'

const mapAttrs = {
    'id': '_id',
    'from': 'from',
    'to': 'to',
    'files': 'files',
    'created': 'created'
}

const mapper = {
    toDto: (entity) => {
        let dto = Object.create(null)
        for (let [ fSrc, fDist ] of Object.entries(mapAttrs)) {
            if (entity[fSrc]) {
                dto[ fDist ] = entity[ fSrc ]
            }
        }

        return dto
    },

    toEntity: (dto) => {
        const obj = Object.create(null)

        for (let [ fSrc, fDist ] of Object.entries(mapAttrs)) {
            if (dto[ fDist ]) {
                obj[ fSrc ] = dto[ fDist ]
            }
        }

        return Post.create(obj)
    }
}

export default mapper
