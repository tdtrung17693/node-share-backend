import path from 'path'

const uploadConfig = {
    engine: process.env.UPLOAD_ENGINE,
    // For Local Engine
    storageDir: path.join(__dirname, '..', '..', 'storage'),
    // For Azure Blob Storage Engine
    azureConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    containerName: process.env.AZURE_CONTAINER_NAME
}

export default uploadConfig
