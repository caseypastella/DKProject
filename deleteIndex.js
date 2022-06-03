var client = require('./connection.js');

async function deleteIndex() {
    
    var response = await client.indices.delete({index: 'gov'});
    console.log(response); 
};

deleteIndex().catch(console.log); 