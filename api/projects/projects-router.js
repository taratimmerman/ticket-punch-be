const router = require('express').Router();
const Model = require('../shared-model');

// GET - View all projects
router.get('/', (req, res) => {
    Model.findAll('projects')
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// GET - View project by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Model.findById('projects', id)
        .then((project) => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ error: `Project ${id} not found` });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// GET - View projects by user
router.get('/user/:id', (req, res) => {
    const { id } = req.params;

    Model.findByUser('projects', id)
        .then((projects) => {
            if (projects) {
                res.status(200).json(projects);
            } else {
                res.status(404).json({ error: `User ${id} project's not found` });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// POST - Create new project
router.post('/', (req, res) => {
    Model.create('projects', req.body)
      .then((newProject) => {
        res.status(201).json({ message: 'Project created', newProject });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

// PUT - Update project by ID
router.put('/:id', (req, res) => {
    Model.update('projects', req.params.id, req.body)
        .then((editedProject) => {
            res.status(200).json({
                message: `Project ${req.params.id} updated`,
                editedProject,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// DELETE - Remove project by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Model.remove('projects', id)
      .then((count) => {
        if (count > 0) {
          res.status(200).json({ message: `Project ${id} has been removed` });
        } else {
          res.status(404).json({ message: `Project ${id} could not be found` });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

module.exports = router;