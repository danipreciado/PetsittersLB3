const Petsitter = require('../common/models/petsitter');

module.exports = function (PettypeController) {
    PettypeController.getAllPettypes = async function (req, res) {
        try {
            const pettypes = await PettypeController.find();
            res.status(201).json(pettypes);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    
 /*    PettypeController.addPettypeToPetsitter = async function (req, res) {
        try {

            const petsitter = await PettypeController.app.models.Petsitter.findById(req.params.id);
            const pettype = await PettypeController.findById(req.body.pettypeId);

            
            if (!petsitter || !pettype) {
                res.status(404).json({ error: 'Petsitter not found' });
            } else {
                await petsitter.updateAttributes(req.body);

                let existingPetTypes = petsitter.petttypeId || [];

                if (!existingPetTypes.includes(pettype.id)) {
                    existingPetTypes.push(pettype.id);

                    
                    await petsitter.updateAttributes( existingPetTypes );
                    res.json(petsitter);
                }
            } 
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'An error occurred' });
            }
        }; */

    PettypeController.addPettypeToPetsitter = async function (req, res) {
        try {
            const petsitter = await PettypeController.app.models.Petsitter.findById(req.params.id);
            const pettype = await PettypeController.findById(req.body.pettypeId);

            if (!petsitter || !pettype) {
                res.status(404).json({ error: 'Petsitter or PetType not found' });
            } else {

                 let existingPetTypes = petsitter.pettypeId || [];

                if (!existingPetTypes.includes(pettype.id)) {
                    existingPetTypes.push(pettype.id);

                    // Update the pettypeId property on the Petsitter model using updateAttributes
                    await petsitter.updateAttributes({ pettypeId: existingPetTypes });
                    
                }

 
                res.json(petsitter);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    };


};