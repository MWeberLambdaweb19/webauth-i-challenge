const express = require('express');

const restrict = require('../../server.js')

const Students = require('./student-model.js');

const router = express.Router();

// CREATE

router.post('/', (req, res) => {
    const {student_name} = req.body
    const {class_year} = req.body
    const {class_section} = req.body
    if (!class_section) {
        res.status(422).json({message: "Please add a class section"})
    }
    if (!class_year) {
        res.status(422).json({message: "Please add a class year"})
    }
    if (!student_name) {
        res.status(422).json({message: "Please add a student name"})
    }
    const body = req.body
    Students.add(body)
    .then(body => {
        res.status(201).json(body)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// READ

router.get('/', (req, res) => {
    Students.find()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    Students.findById(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// UPDATE

router.put('/:id', (req, res) => {
    const {student_name} = req.body
    const {class_year} = req.body
    const {class_section} = req.body
    if (!class_section) {
        res.status(422).json({message: "Please update class section"})
    }
    if (!class_year) {
        res.status(422).json({message: "Please update class year"})
    }
    if (!student_name) {
        res.status(422).json({message: "Please update student name"})
    }
    const changes = req.body
    Students.update(id, changes)
    .then(updated => {
        if (updated) {
            res.status(200).json({success: true, updated})
        } else {
            res.status(404).json({message: "That student does not exist in our database"})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// DELETE

router.delete('/:id', (req, res) => {
    const {id} = req.params
    Students.remove(id)
    .then(removed => {
        if(removed) {
            res.status(204).json()
        } else {
            res.status(404).json({success: false, message: "That student does not exist in our database"})
        }
    })
    .catch(err => {
        res.status(500).json({success: false, err})
    })
})

module.exports = router;