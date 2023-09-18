
const stateStatic = require('../../statics/state')

module.exports = function (State) {

    State.on('dataSourceAttached', (state) => stateStatic(state));

    State.remoteMethod('getAllStates', {
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

      State.remoteMethod('createState', {
            description: 'Create a new state',
            http: { path: '/create', verb: 'post' },
            accepts: [
                { arg: 'req', type: 'object', http: { source: 'req' } },
                { arg: 'res', type: 'object', http: { source: 'res' } }
            ],
            returns: { arg: 'state', type: 'object', root: true },
        });

    

}
