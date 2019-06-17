const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs')

const Users = require('../users/users-model.js');

const server = express();

const studentRouter = require('./routes/students/student-router.js');
const teacherRouter = require('./routes/teachers/teacher-router.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/restricted/students', restricted, studentRouter);
server.use('/api/restricted/teachers', restricted, teacherRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "Server is up and running!"})
});

server.post('/api/register', (req, res) => {
    let newUser = req.body;

    const hash = bcrypt.hashSync(newUser.password, 10);

    newUser.password = hash;

    Users.add(newUser)
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.post('/api/login', (req, res) => {
    let {username, password} = req.body;
    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({message: `Welcome ${user.username}`})
        } else {
            res.status(401).json({message: "Invalid credentials"});
        }
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

server.get('/api/users', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(error => res.send(error))
})

// Middleware

function restricted(req, res, next){ 
    const {username, password} = req.headers
  
    if (username && password) {
      Users.findBy({username})
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next()
        } else {
          res.status(401).json({message: "You are not authorized!"})
        }
      })
      .catch(error => {
        res.status(500).json({message: "Unexpected Error", error})
      })
    } else {
      res.status(400).json({message: "No credentials provided"})
    }
  }

module.exports = {server, restricted};