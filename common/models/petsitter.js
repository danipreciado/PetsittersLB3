
const petsitterStatic = require('../../statics/petsitter');

module.exports = function (Petsitter) {

    Petsitter.on('dataSourceAttached', (model) => petsitterStatic(model));

    Petsitter.remoteMethod('getAllPetsitters', {
        description: '',
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

        // Crear un nuevo petsitter
        Petsitter.remoteMethod('createPetsitter', {
            description: 'Create a new Petsitter',
            http: { path: '/create', verb: 'post' },
            accepts: [
                { arg: 'req', type: 'object', http: { source: 'req' } },
                { arg: 'res', type: 'object', http: { source: 'res' } }
            ],
            returns: { arg: 'petsitter', type: 'object', root: true },
        });

    // Traer petsitter por id
    Petsitter.remoteMethod('getPetsitterById', {
        description: 'Retrieve a specific Petsitter by ID',
        http: { path: '/:id', verb: 'get' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'petsitter', type: 'object', root: true },
    });

    //Modificar petsitter
    Petsitter.remoteMethod('updatePetsitter', {
        description: 'Update a specific Petsitter by ID',
        http: { path: '/:id', verb: 'put' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'petsitter', type: 'object', root: true },
    });

    // Eliminar petsitter
    Petsitter.remoteMethod('deletePetsitter', {
        description: 'Delete a specific Petsitter by ID',
        http: { path: '/:id', verb: 'delete' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'status', type: 'object', root: true },
    });


}
