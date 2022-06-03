var client = require('./connection.js')
async function test() {
  var response = await client.cluster.health();

  console.log(response);
}

test().catch(console.log); 

