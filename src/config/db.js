const db = {
    development: {
        uri: 'mongodb://localhost:27017/nodeshare',
        name: 'nodeshare'
    },
    production: {
        uri: process.env.DB_URI
    }
}

export default db[process.env.NODE_ENV]
