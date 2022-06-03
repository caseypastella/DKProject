var client = require('./connection.js');

client.indices.create({  
  index: 'dktest'
},function(err,resp,status) {
  if(err) {
    console.log(err);
  }
  else {
    console.log(resp);
  }
});