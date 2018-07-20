import homeRouter from './home'
import filesApiRouter from './api/files'
import postsApiRouter from './api/posts'

export function initRoutes (app) {
    app.use('/api/posts', postsApiRouter)
    app.use('/api', filesApiRouter)
    app.use('/', homeRouter)
}
