const router = require('express').Router();
const Model = require('../shared-model');

// GET - View all tickets
router.get('/', (req, res) => {
    Model.findAll('tickets')
        .then((tickets) => {
            res.status(200).json(tickets);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// GET - View ticket by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Model.findById('tickets', id)
        .then((ticket) => {
            if (ticket) {
                res.status(200).json(ticket);
            } else {
                res.status(404).json({ error: `Ticket ${id} not found` });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// GET - View tickets by user
router.get('/user/:id', (req, res) => {
    const { id } = req.params;

    Model.findByUser('tickets', id)
        .then((tickets) => {
            if (tickets) {
                res.status(200).json(tickets);
            } else {
                res.status(404).json({ error: `User ${id} tickets not found` });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// POST - Create new ticket
router.post('/', (req, res) => {
    Model.create('tickets', req.body)
      .then((newTicket) => {
        res.status(201).json({ message: 'Ticket created', newTicket });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

// PUT - Update ticket by ID
router.put('/:id', (req, res) => {
    Model.update('tickets', req.params.id, req.body)
        .then((editedTicket) => {
            res.status(200).json({
                message: `Ticket ${req.params.id} updated`,
                editedTicket,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// DELETE - Remove ticket by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Model.remove('tickets', id)
      .then((count) => {
        if (count > 0) {
          res.status(200).json({ message: `Ticket ${id} has been removed` });
        } else {
          res.status(404).json({ message: `Ticket ${id} could not be found` });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

module.exports = router;