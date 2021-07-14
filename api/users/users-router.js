const router = require('express').Router();
const Users = require('../users/users-model');

// GET - View all users
router.get('/', (req, res) => {
    Users.find('users')
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

// PUT - Update user by ID
router.put('/:id', (req, res) => {
    Users.update('users', req.params.id, req.body)
        .then((editedUser) => {
            res.status(200).json({
                message: `User ${req.params.id} updated`,
                editedUser,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
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