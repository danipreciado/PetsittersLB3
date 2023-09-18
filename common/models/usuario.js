
const usuarioStatic = require('../../statics/usuario')

module.exports = function (Usuario) {

    Usuario.on('dataSourceAttached', (usuario) => usuarioStatic(usuario));

    Usuario.remoteMethod('getAllUsers', {
        description: 'Get all users',
        http: {
            path: '/list',
            verb: 'get'
        },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: {
            arg: 'response',
            type: 'object',
            root: true
        }
    }),

    Usuario.remoteMethod('createUser', {
        description: 'Create a new user at signup',
        http: { path: '/signup', verb: 'post' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'user', type: 'object', root: true },
        });

    Usuario.remoteMethod('getUserById', {
        description: 'Retrieve a specific User by ID',
        http: { path: '/:id', verb: 'get' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'user', type: 'object', root: true },
    });

    Usuario.remoteMethod('updateUser', {
        description: 'Update a specific user by ID',
        http: { path: '/:id', verb: 'put' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'user', type: 'object', root: true },
    });


    Usuario.remoteMethod('deleteUser', {
        description: 'Delete a specific user by ID',
        http: { path: '/:id', verb: 'delete' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'status', type: 'object', root: true },
    });

    Usuario.remoteMethod('login', {
        description: 'Authenticate user',
        http: { path: '/login', verb: 'post' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'user', type: 'object', root: true },
    });

}

