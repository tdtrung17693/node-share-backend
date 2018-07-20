const PORT = process.env.PORT || 3000
const ROOT = process.env.ROOT_URL || 'localhost:3000'
const WEB_ROOT = process.env.WEB_ROOT || 'localhost:3001'

export default {
    apiRoot: `${ROOT}/api`,
    port: PORT,
    root: `${ROOT}`,
    webRoot: `${WEB_ROOT}`,
    adminEmail: process.env.ADMIN_EMAIL,
    adminName: process.env.ADMIN_NAME
}
