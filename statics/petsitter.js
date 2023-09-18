module.exports = function (PetsitterController) {
   /*  find({
                include: {
                  relation: "city",
                  scope: {
                    include: {
                      relation: "state",
                    },
                  },
                },
              });
  */

    PetsitterController.getAllPetsitters = async function (req, res) {
      
      try {
          const petsitters = await PetsitterController.find({
              include: [{'city': 'state'}, 'pettype']
            });
          res.status(201).json(petsitters);
      } catch (error) {
        console.log(error);
          res.status(500).json({ error: 'An error occurred' });
      }
  };

    PetsitterController.createPetsitter = async function (req, res) {
        try {
            const newPetsitter = await PetsitterController.create(req.body);
            res.json(newPetsitter);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    PetsitterController.updatePetsitter = async function (req, res) {
        try {
            const petsitter = await PetsitterController.findById(req.params.id);
            if (!petsitter) {
                res.status(404).json({ error: 'Petsitter not found' });
            } else {
                await petsitter.updateAttributes(req.body);
                res.json(petsitter);
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    PetsitterController.getPetsitterById = async function(req, res) {
        try {
          const petsitter = await PetsitterController.findById(req.params.id, {
            include: [{'city': 'state'},  {
              'relation': 'pettype',
              'scope': {
                'fields': ['description']
              }
            }]
          });
          console.log(petsitter);
          if (!petsitter) {
            res.status(404).json({ error: 'Petsitter not found' });
          } else {
            res.json(petsitter);
          }
        } catch (error) {
          res.status(500).json({ error: 'An error occurred' });
        }
      };

      PetsitterController.deletePetsitter = async function(req, res) {
        try {
          const petsitter = await PetsitterController.findById(req.params.id);
          if (!petsitter) {
            res.status(404).json({ error: 'Petsitter not found' });
          } else {
            await petsitter.destroy();
            res.status(204);
          }
        } catch (error) {
          res.status(500).json({ error: 'An error occurred' });
        }
      };
};