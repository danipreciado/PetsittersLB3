
const pettypeStatic = require('../../statics/pettype')

module.exports = function (Pettype) {

    Pettype.on('dataSourceAttached', (model) => pettypeStatic(model));

    Pettype.remoteMethod('addPettypeToPetsitter', {
        description: '',
        http: {
            path: '/:id',
            verb: 'post'
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
    })


}
