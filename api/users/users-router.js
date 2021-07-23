const router = require('express').Router();
const Users = require('../shared-model');
const { isValid } = require('./users-validation');
const bcryptjs = require('bcryptjs');

// GET - View all users
router.get('/', (req, res) => {
    Users.findAll('users')
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// GET - View user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Users.findById('users', id)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: `User ${id} not found` });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// PUT - Update user by ID, including password hash
router.put('/:id', (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 10;

        // Hash the password
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

    Users.update('users', req.params.id, credentials)
        .then((editedUser) => {
            res.status(200).json({
                message: `User ${req.params.id} updated`,
                editedUser,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
    } else {
        res.status(400).json({
            message: 'Email and password is required',
        });
    }
});

// DELETE - Remove user by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Users.remove('users', id)
      .then((count) => {
        if (count > 0) {
          res.status(200).json({ message: `User ${id} has been removed` });
        } else {
          res.status(404).json({ message: `User ${id} could not be found` });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

module.exports = router;