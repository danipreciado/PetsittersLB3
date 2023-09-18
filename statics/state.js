module.exports = function (StateController) {
    StateController.getAllStates = async function (req, res) {
        try {
            const states = await StateController.find();
            res.status(201).json(states);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    StateController.createState = async function (req, res) {
        try {
            const newState = await StateController.create(req.body);
            res.json(newState);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    
};