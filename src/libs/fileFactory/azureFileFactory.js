import File from '../../models/File'

export default function factory (file) {
    if (file.blob) {
        file.filename = file.blob
    }

    return new File(file)
}
