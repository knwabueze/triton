const express = require('express')
const logger = require('morgan')
const codenames = require('./routes/codenames')

const server = express();

server.use(logger("dev"));
server.use('/api/codenames', codenames);

server.listen(8080, (err) => {
    if (err) throw err;
});