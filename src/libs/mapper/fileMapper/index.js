import config from '../../../config/upload'
import localFileMapper from './localFileMapper'
import azureFileMapper from './azureFileMapper'

const fileMapper = {
    'local': localFileMapper,
    'azure': azureFileMapper
}

export default fileMapper[config.engine]
