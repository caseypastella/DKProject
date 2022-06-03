var {Client} = require('@elastic/elasticsearch');

var client = new Client({
    node: 'http://localhost:9200',
    auth: {
      username: 'elastic',
      password: 'password'
    }
});

module.exports = client;

