export default {
    routes : [
        {
            method: 'PUT',
            path: '/posts/:id',
            handler: 'api::post.post.modify',
        },
        {
            method: 'DELETE',
            path: '/posts/:id',
            handler: 'api::post.post.delete',
        },
        {
            method: 'POST',
            path: '/posts',
            handler: 'api::post.post.create',
        }
    ]
}