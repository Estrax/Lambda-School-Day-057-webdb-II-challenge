const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// endpoints here

server.route('/api/zoos')
  .get(async (req, res) => {

  })

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
