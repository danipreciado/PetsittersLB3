const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = function (UsuarioController) {
    UsuarioController.getAllUsers = async function (req, res) {
        try {
            const users = await UserController.find();
            res.status(201).json(users);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    UsuarioController.createUser = async function (req, res) {
        try {
          const { password, ...userData } = req.body;
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
      
          userData.password = hashedPassword;
      
          const newUser = await UsuarioController.create(userData);
      
          res.json(newUser);
        } catch (error) {
          res.status(500).json({ error: 'An error occurred' });
        }
      };
      
    UsuarioController.deleteUser = async function (req, res) {
        try {
            const user = await UsuarioController.findById(req.params.id);
            if (!user) {
                res.status(404).json({ error: 'Review not found' });
            } else {
                await user.destroy();
                res.status(204);
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    UsuarioController.getUserById = async function (req, res) {
        try {
            const user = await UserController.findById(req.params.id);
            if (!user) {
                res.status(404).json({ error: 'Review not found' });
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    };

    UsuarioController.updateUser = async function (req, res) {
        try {

            const user = await UserController.findById(req.params.id);

            if(!user) {
                res.status(404).json({ error: 'User not found'});
            } else {
                await user.updateAttributes(req.body);
                res.json(user);
            }
        } catch {
            res.status(500).json({ error: 'An error ocurred' })
        }
    };

    UsuarioController.login = async function (req, res) {
        try {

            const { email, password } = req.body;
            const user = await UsuarioController.findOne( { where: { email } });

            if (!user) {
                return res.status(401).json({ error: 'Authentication failed. User not found.' });
            }

            const passwordMatches = await bcrypt.compare(password, user.password);

            if (passwordMatches) {
                const token = jwt.sign({ userId: user.id, email: user.email, name: user.name, lastname: user.lastname, photoURL: user.photoURL }, 'secret', {
                  expiresIn: '1h',
                });

                // console.log(jwt.verify(token, 'secret'));
              
                res.json( { token } );

            } else {
                res.status(401).json({ error: 'Authentication failed. Incorrect password.' });
            }
              
        } catch {
            res.status(500).json({ error: 'An error ocurred' })
        }
    };

};