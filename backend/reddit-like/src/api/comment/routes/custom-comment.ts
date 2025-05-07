export default {
    routes : [
        {
            method: 'PUT',
            path: '/comments/:id',
            handler: 'api::comment.comment.modify',
        },
        {
            method: 'DELETE',
            path: '/comments/:id',
            handler: 'api::comment.comment.delete',
        },
        {
            method: 'POST',
            path: '/comments',
            handler: 'api::comment.comment.create',
        }
    ]
}