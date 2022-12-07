const https = require('http');
const main = require('./index.js');

https
  .createServer((req, res) => {
    main('./data.json');
    res.writeHead(200);
    res.end('App running...');
  })
  .listen(443);
