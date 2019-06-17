const express = require('express');

const restrict = require('../../server.js')

const Teachers = require('./teacher-model.js');

const router = express.Router();

// CREATE

router.post('/', (req, res) => {
    const {teacher_name} = req.body
    const {class_year} = req.body
    const {class_section} = req.body
    if (!class_section) {
        res.status(422).json({message: "Please add a class section"})
    }
    if (!class_year) {
        res.status(422).json({message: "Please add a class year"})
    }
    if (!teacher_name) {
        res.status(422).json({message: "Please add a teacher name"})
    }
    const body = req.body
    Teachers.add(body)
    .then(body => {
        res.status(201).json(body)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// READ

router.get('/', (req, res) => {
    Teachers.find()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    Teachers.findById(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// UPDATE

router.put('/:id', (req, res) => {
    const {teacher_name} = req.body
    const {class_year} = req.body
    const {class_section} = req.body
    if (!class_section) {
        res.status(422).json({message: "Please update class section"})
    }
    if (!class_year) {
        res.status(422).json({message: "Please update class year"})
    }
    if (!teacher_name) {
        res.status(422).json({message: "Please update teacher name"})
    }
    const changes = req.body
    Teachers.update(id, changes)
    .then(updated => {
        if (updated) {
            res.status(200).json({success: true, updated})
        } else {
            res.status(404).json({message: "That teacher does not exist in our database"})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// DELETE

router.delete('/:id', (req, res) => {
    const {id} = req.params
    Teachers.remove(id)
    .then(removed => {
        if(removed) {
            res.status(204).json()
        } else {
            res.status(404).json({success: false, message: "That teacher does not exist in our database"})
        }
    })
    .catch(err => {
        res.status(500).json({success: false, err})
    })
})

module.exports = router;