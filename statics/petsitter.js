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
              include: [{'city': 'state'}, 'pettype', 'review']
            });
          res.status(201).json(petsitters);
      } catch (error) {
        console.log(error);
          res.status(500).json({ error: 'An error occurred' });
      }
  };

  PetsitterController.getAllPetsittersByName = async function (req, res) {
    try {
      
      const { name } = req.params;
     
  
      const filter = {
        where: {
          name: {
            like: `${name}%`
          }
        },
        include: [ {'city': 'state'}, 'pettype', 'review'] 
      };
  
      const petsitters = await PetsitterController.find(filter); 
  
      res.status(200).json(petsitters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  PetsitterController.getAllPetsittersByCity = async function (req, res) {
    try {

      const { city } = req.params;
    
      const filtered = {
        include: [
          {
            relation: 'city',
            scope: {
              where: { name: {
                like: `${city}%`
              } },
              include: 'state'
            }
          },
          'pettype',
          'review'
        ],
      };
  
      
      const petsitters = await PetsitterController.find(filtered);
  
      
      const filteredResults = petsitters.filter(result => result.city() !== null);

  
      res.status(200).json(filteredResults);
    } catch (error) {
      console.error(error);
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