const server = require('./api/server.js');
const PORT = 5001

server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});