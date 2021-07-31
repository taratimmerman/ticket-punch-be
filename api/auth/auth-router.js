const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const Users = require('../shared-model');
const { isValid } = require('../users/users-validation');
const { jwtSecret } = require('./secret');

// POST - Hashes password and adds new user to users table
router.post('/register', (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 10;

        // Hash the password
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        // Save the user to the database
        Users.create('users', credentials)
            .then(user => {
                res.status(201).json({ data: user });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: 'Email and password is required',
        });
    }
});

// POST - Validates user exists and logs user into app
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy('users', { email: email })
            .then(([user]) => {
                // Compares the password to the hash stored in the database
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeToken(user);

                const username = user.email.substring(0, user.email.lastIndexOf("@"));

                    res.status(200).json({
                        username: username,
                        id: user.id,
                        token
                    });
                } else {
                    res.status(401).json({ message: 'Email and password required' });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: 'Invalid credentials',
        });
    }
});

function makeToken(user) {
    const payload = {
        subject: user.id,
        email: user.email
    };
    const options = {
        expiresIn: '10800s'
    };
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;