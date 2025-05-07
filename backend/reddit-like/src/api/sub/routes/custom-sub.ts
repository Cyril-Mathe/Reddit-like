export default {
    routes : [
        {
            method: 'PUT',
            path: '/subs/:id',
            handler: 'api::sub.sub.modify',
        },
        {
            method: 'DELETE',
            path: '/subs/:id',
            handler: 'api::sub.sub.delete',
        },
        {
            method: 'POST',
            path: '/subs',
            handler: 'api::sub.sub.create',
        }
    ]
}