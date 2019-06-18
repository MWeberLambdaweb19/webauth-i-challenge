const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const Users = require('../users/users-model.js');

const server = express();

const sessionConfig = {
  name: 'Professor Shinonome',
  secret: 'Nano nano nano nano nano nano nano nano nano nano nano nano!',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new knexSessionStore({
    knex: require('../data/dbConfig.js'),
    tableName: 'sessions',
    sidfieldname: 'sid',
    createTable: true,
    clearInterval: 1000 * 60 * 60,
  })
}

const restricted = require('./restricted-middleware.js')
const studentRouter = require('./routes/students/student-router.js');
const teacherRouter = require('./routes/teachers/teacher-router.js');

server.use(session(sessionConfig));
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
            req.session.user = user;
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

server.get('/api/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if(error){
        res.send('ishiki sezaru wo emasen!')
      } else {
        res.send('wake wakannai nai!! ')
      }
    })
  } else {
    res.end();
  }
})

// Middleware for Reference

function restriction(req, res, next){ 
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