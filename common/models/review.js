
const reviewStatic = require('../../statics/review')

module.exports = function (Review) {

    Review.on('dataSourceAttached', (review) => reviewStatic(review));

    Review.remoteMethod('getAllReviews', {
        description: 'Get all reviews',
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

    Review.remoteMethod('getAllPetsittersReviews', {
        description: 'Get all reviews filtered by petsitter',
        http: {
            path: '/petsitter/:id',
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

        Review.remoteMethod('createReview', {
            description: 'Create a new review',
            http: { path: '/create', verb: 'post' },
            accepts: [
                { arg: 'req', type: 'object', http: { source: 'req' } },
                { arg: 'res', type: 'object', http: { source: 'res' } }
            ],
            returns: { arg: 'review', type: 'object', root: true },
        });

    Review.remoteMethod('getReviewById', {
        description: 'Retrieve a specific Review by ID',
        http: { path: '/:id', verb: 'get' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'review', type: 'object', root: true },
    });

    Review.remoteMethod('updateReview', {
        description: 'Update a specific Review by ID',
        http: { path: '/:id', verb: 'put' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'review', type: 'object', root: true },
    });


    Review.remoteMethod('deleteReview', {
        description: 'Delete a specific Review by ID',
        http: { path: '/:id', verb: 'delete' },
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'res', type: 'object', http: { source: 'res' } }
        ],
        returns: { arg: 'status', type: 'object', root: true },
    });



}

