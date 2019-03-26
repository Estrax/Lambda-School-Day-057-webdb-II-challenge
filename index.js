const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// endpoints here

server.route('/api/zoos')
  .get(async (req, res) => {
    db('zoos')
      .then(zoos => res.status(200).json(zoos))
      .catch(err => res.status(500).json({ error: "Some useful error message" }))
  })
  .post(async (req, res) => {
    if(!req.body.name) return res.status(400).json({ error: "Some useful error message" });
    db('zoos')
      .insert(req.body)
      .then(zoos => res.status(201).json(zoos))
      .catch(err => res.status(500).json({ error: "Some useful error message" }));
  });

server.route('/api/zoos/:id')
  .get(async (req, res) => {
    db('zoos')
      .where('id', req.params.id)
      .then(zoo => res.status(200).json(zoo))
      .catch(err => res.status(500).json({ error: "Some useful error message" }));
  })
  .put(async (req, res) => {
    if(!req.body.name) return res.status(400).json({ error: "Some useful error message" });
    db('zoos')
      .where('id', req.params.id)
      .update(req.body)
      .then(zoo => res.status(200).json(zoo))
      .catch(err => res.status(500).json({ error: "Some useful error message" }));
  })
  .delete(async (req, res) => {
    db('zoos')
      .where('id', req.params.id)
      .del()
      .then(zoos => res.status(200).json(zoos))
      .catch(err => res.status(500).json({ error: "Some useful error message" }));
  });


server.route('/api/bears')
  .get(async (req, res) => {
    db('bears')
      .then(bears => res.status(200).json(bears))
      .catch(err => res.status(500).json({ error: "Some useful error message" }))
  })
  .post(async (req, res) => {
    if(!req.body.name) return res.status(400).json({ error: "Some useful error message" });
    db('bears')
      .insert(req.body)
      .then(bear => res.status(201).json(bear))
      .catch(err => res.status(500).json({ error: "Some useful error message" }));
  });

server.route('/api/bears/:id')
  .get(async (req, res) => {
    db('bears')
      .where('id', req.params.id)
      .then(bear => res.status(200).json(bear))
      .catch(err => res.status(500).json({ error: "Some useful error message" }));
  })
  .put(async (req, res) => {
    if(!req.body.name) return res.status(400).json({ error: "Some useful error message" });
    db('bears')
      .where('id', req.params.id)
      .update(req.body)
      .then(bear => res.status(200).json(bear))
      .catch(err => res.status(500).json({ error: "Some useful error message" }));
  })
  .delete(async (req, res) => {
    db('bears')
      .where('id', req.params.id)
      .del()
      .then(bear => res.status(200).json(bear))
      .catch(err => res.status(500).json({ error: "Some useful error message" }));
  });

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
