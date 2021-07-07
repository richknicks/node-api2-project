const express = require('express');

const postsRouter = require ('../data/posts-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  const query = req.query;
  console.log('query', query)
  res.status(200).json(query)
  
});
// router handles endpoint that begin with /api/hubs
server.use('/api/posts', postsRouter);

module.exports = server;