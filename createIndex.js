var client = require('./connection.js');

client.indices.create({  
  index: 'dkmlbplayers'
},function(err,resp,status) {
  if(err) {
    console.log(err);
  }
  else {
    console.log(resp);
  }
});