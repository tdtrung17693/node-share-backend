const PORT = process.env.PORT || 3000
const ROOT = process.env.ROOT_URI || 'localhost'

export default {
    apiRoot: `${ROOT}:${PORT}/api`,
    port: PORT,
    root: `${ROOT}:${PORT}`,
    webRoot: `${ROOT}:3001`,
    adminEmail: process.env.ADMIN_EMAIL,
    adminName: process.env.ADMIN_NAME
}
