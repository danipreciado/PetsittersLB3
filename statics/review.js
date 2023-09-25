module.exports = function (ReviewController) {
    ReviewController.getAllReviews = async function (req, res) {
        try {
            const reviews = await ReviewController.find({
                include: {
                    relation: "petsitter"
                }
            });
            res.status(201).json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    ReviewController.getBestRated = async function (req, res) {
        try {
            const reviews = await ReviewController.find({
                limit: 10,
                where: {
                    rating: 5
                },
                include: {
                    relation: "petsitter"
                }
            });
            res.status(201).json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    ReviewController.createReview = async function (req, res) {
        try {
            const newReview = await ReviewController.create(req.body);
            res.json(newReview);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    ReviewController.deleteReview = async function (req, res) {
        try {
            const review = await ReviewController.findById(req.params.id);
            if (!review) {
                res.status(404).json({ error: 'Review not found' });
            } else {
                await review.destroy();
                res.status(204);
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    ReviewController.getReviewById = async function (req, res) {
        try {
            const review = await ReviewController.findById(req.params.id);
            if (!review) {
                res.status(404).json({ error: 'Review not found' });
            } else {
                res.json(review);
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    ReviewController.updateReview = async function (req, res) {
        try {

            const review = await ReviewController.findById(req.params.id);

            if(!review) {
                res.status(404).json({ error: 'Review not found'});
            } else {
                await review.updateAttributes(req.body);
                res.json(review);
            }
        } catch {
            res.status(500).json({ error: 'An error ocurred' })
        }
    },

    ReviewController.getAllPetsittersReviews = async function (req, res) {
        try {
            const petsitterId = req.params.id; 
            const reviews = await ReviewController.find({
                where: {
                    petsitterId: petsitterId 
                },
                include: {
                    relation: "petsitter"
                }
            });
    
            res.status(200).json(reviews);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    };
    




};