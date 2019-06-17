const server = require('./api/server.js');

const port = 5000

server.server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})