import config from '../../config/upload'
import azureFileFactory from './azureFileFactory'
import localFileFactory from './localFileFactory'

const fileFactory = {
    'local': localFileFactory,
    'azure': azureFileFactory
}

export default fileFactory[config.engine]
