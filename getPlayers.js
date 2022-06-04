var client = require('./connection.js');
const axios = require('axios'); 
require('array.prototype.flatmap').shim();



async function grabContests() {
    try {
        const contests = await axios.get('https://www.draftkings.com/lobby/getcontests?sport=MLB');
        const contestsJson = await contestsJson.json(); 


    }
    catch (error) {
        console.log(error); 
    }
}
async function getDataMLB() {
    try {
    //Get the contests
    const contestsResponse = await axios.get('https://www.draftkings.com/lobby/getcontests?sport=MLB');
    //const contestsJson = await contestsResponse.json();
    var totalIndexed = 0; 

    //Loop through all contests and build a list of the unique draft groups
    let groupIdList = [];
    contestsResponse.data.Contests.forEach(contest => {
        if (!groupIdList.includes(contest.dg)) {
            groupIdList.push(contest.dg)
        }
    });

    //For each draft group, grab the draftables by replacing the parameter in the URL with the correct group Id
    for (const groupId of groupIdList) {
        console.log('Players for GroupId:')
        console.log(groupId);
        console.log('\n')

        const draftablePlayersResponse = await axios.get('https://api.draftkings.com/draftgroups/v1/draftgroups/' + groupId + '/draftables');
        //const draftableplayersJson = await draftablePlayersResponse.json();
        totalIndexed += Object.keys(draftablePlayersResponse.data.draftables).length;
        //const dataToIndex = draftablePlayersResponse.data.draftables.flatMap(doc => [{ index: {_index: 'dkmlbplayers'}}, doc])
        const bulkResponse = await client.helpers.bulk({
            datasource: draftablePlayersResponse.data.draftables,
            onDocument (doc) {
                return {
                    index: { _index: 'dkmlbplayers', _id: doc.PlayerId}
                }
            }
        })
        console.log(bulkResponse);
        const count = await client.count({ index: 'dkmlbplayers' })
        console.log('Documents currently in index', count)
        console.log('Total Documents that were just indexed', totalIndexed)
    }

} catch (error) {
    console.log(error);
}
}

async function getDataNBA() {
    try {
        //Get the contests
        const contestsResponse = await axios.get('https://www.draftkings.com/lobby/getcontests?sport=NBA');
        //const contestsJson = await contestsResponse.json();
        var totalIndexed = 0; 
    
        //Loop through all contests and build a list of the unique draft groups
        let groupIdList = [];
        contestsResponse.data.Contests.forEach(contest => {
            if (!groupIdList.includes(contest.dg)) {
                groupIdList.push(contest.dg)
            }
        });
    
        //For each draft group, grab the draftables by replacing the parameter in the URL with the correct group Id
        for (const groupId of groupIdList) {
            console.log('Players for GroupId:')
            console.log(groupId);
            console.log('\n')
    
            const draftablePlayersResponse = await axios.get('https://api.draftkings.com/draftgroups/v1/draftgroups/' + groupId + '/draftables');
            //const draftableplayersJson = await draftablePlayersResponse.json();
            totalIndexed += Object.keys(draftablePlayersResponse.data.draftables).length;
            //const dataToIndex = draftablePlayersResponse.data.draftables.flatMap(doc => [{ index: {_index: 'dkmlbplayers'}}, doc])
            const bulkResponse = await client.helpers.bulk({
                datasource: draftablePlayersResponse.data.draftables,
                onDocument (doc) {
                    return {
                        index: { _index: 'dknbaplayers', _id: doc.PlayerId}
                    }
                }
            })
            console.log(bulkResponse);
            const count = await client.count({ index: 'dknbaplayers' })
            console.log('Documents currently in index', count)
            console.log('Total Documents that were just indexed', totalIndexed)
        }
    
    } catch (error) {
        console.log(error);
    }
}

async function getDataPGA() {
    try {
        //Get the contests
        const contestsResponse = await axios.get('https://www.draftkings.com/lobby/getcontests?sport=GOLF');
        //const contestsJson = await contestsResponse.json();
        var totalIndexed = 0;
    
        //Loop through all contests and build a list of the unique draft groups
        let groupIdList = [];
        contestsResponse.data.Contests.forEach(contest => {
            if (!groupIdList.includes(contest.dg)) {
                groupIdList.push(contest.dg)
            }
        });
    
        //For each draft group, grab the draftables by replacing the parameter in the URL with the correct group Id
        for (const groupId of groupIdList) {
            console.log('Players for GroupId:')
            console.log(groupId);
            console.log('\n')
    
            const draftablePlayersResponse = await axios.get('https://api.draftkings.com/draftgroups/v1/draftgroups/' + groupId + '/draftables');
            //const draftableplayersJson = await draftablePlayersResponse.json();
            totalIndexed += Object.keys(draftablePlayersResponse.data.draftables).length;
            //const dataToIndex = draftablePlayersResponse.data.draftables.flatMap(doc => [{ index: {_index: 'dkmlbplayers'}}, doc])
            const bulkResponse = await client.helpers.bulk({
                datasource: draftablePlayersResponse.data.draftables,
                onDocument (doc) {
                    return {
                        index: { _index: 'dkpgaplayers', _id: doc.PlayerId}
                    }
                }
            })
            console.log(bulkResponse);
            const count = await client.count({ index: 'dkpgaplayers' })
            console.log('Documents currently in index', count)
            console.log('Total Documents that were just indexed', totalIndexed)
        }
    
    } catch (error) {
        console.log(error);
    }
}

getDataMLB().catch(console.log);

