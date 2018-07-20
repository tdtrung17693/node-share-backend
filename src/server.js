import http from 'http'

import app from './app'

import config from './config/misc'

const server = http.createServer(app)

server.listen(config.port, () => {
    console.log(
        `App is running on port ${config.port}`
    )
})
