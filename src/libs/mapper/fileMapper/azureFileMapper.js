import File from '../../../models/File'
import fileFactory from '../../fileFactory'

const mapAttrs = {
    'originalname': 'originalname',
    'filename': 'filename',
    'mimetype': 'mimetype',
    'size': 'size',
    'created': 'created',
    'id': '_id'
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

        if (dto.blob) {
            dto.filename = dto.blob
        }

        for (let [ fSrc, fDist ] of Object.entries(mapAttrs)) {
            if (dto[ fDist ]) {
                obj[ fSrc ] = dto[ fDist ]
            }
        }

        return File.create(fileFactory, obj)
    }
}

export default mapper
