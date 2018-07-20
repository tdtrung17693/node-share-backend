import { MongoClient } from 'mongodb'

import database from '../config/db'

export function connect (cb) {
    MongoClient.connect(database.uri, (err, client) => {
        return cb(err, client.db(database.name))
    })
}
