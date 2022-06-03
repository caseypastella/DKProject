var client = require('./connection.js');
const fetch = require('node-fetch');

async function getDataMLB() {
    try {
    //Get the contests
    const contestsResponse = await fetch('https://www.draftkings.com/lobby/getcontests?sport=MLB');
    const contestsJson = await contestsResponse.json();
    var indexCount = 0; 

    //Loop through all contests and build a list of the unique draft groups
    let groupIdList = [];
    contestsJson['Contests'].forEach(contest => {
        if (!groupIdList.includes(contest['dg'])) {
            groupIdList.push(contest['dg'])
        }
    });

    //For each draft group, grab the draftables by replacing the parameter in the URL with the correct group Id
    for (const groupId of groupIdList) {
        console.log('Players for GroupId:')
        console.log(groupId);
        console.log('\n')

        const draftablePlayersResponse = await fetch('https://api.draftkings.com/draftgroups/v1/draftgroups/' + groupId + '/draftables');
        const draftableplayersJson = await draftablePlayersResponse.json();

        //Nice! Now we have the players so let's just console.log them as a simple example
        draftableplayersJson['draftables'].forEach(async player => { 
            indexCount++; 
            await client.index({
                index: 'dktest',
                id: player['draftableId'],
                body: {
                    "FirstName": player['firstName'],
                    "LastName": player['lastName'],
                    "DisplayName": player['displayName'],
                    "PlayerId": player['playerId'],
                    "Position": player['position'],
                    "Salary": player['salary'],
                    "Status": player['status'],
                    "IsSwappable": player['isSwappable'],
                    "isDisabled": player['isDisabled'],
                    "Team": player['teamAbbreviation']
                }
            },function(err,resp,status) {
                console.log(resp); 
                console.log(status);
                console.log(err); 
            });
        });
    }

    console.log('Success! number of docs indexed is:', indexCount);

} catch (error) {
    console.log(error);
}
}

async function getDataNBA() {
    try {
    //Get the contests
    const contestsResponse = await fetch('https://www.draftkings.com/lobby/getcontests?sport=NBA');
    const contestsJson = await contestsResponse.json();
    var indexCount = 0; 
    //Loop through all contests and build a list of the unique draft groups
    let groupIdList = [];
    contestsJson['Contests'].forEach(contest => {
        if (!groupIdList.includes(contest['dg'])) {
            groupIdList.push(contest['dg'])
        }
    });

    //For each draft group, grab the draftables by replacing the parameter in the URL with the correct group Id
    for (const groupId of groupIdList) {
        console.log('Players for GroupId:')
        console.log(groupId);
        console.log('\n')

        const draftablePlayersResponse = await fetch('https://api.draftkings.com/draftgroups/v1/draftgroups/' + groupId + '/draftables');
        const draftableplayersJson = await draftablePlayersResponse.json();

        //Nice! Now we have the players so let's just console.log them as a simple example
        draftableplayersJson['draftables'].forEach(async player => { 
            await client.index({
                index: 'dknbaplayers',
                id: player['draftableId'],
                body: {
                    "FirstName": player['firstName'],
                    "LastName": player['lastName'],
                    "DisplayName": player['displayName'],
                    "PlayerId": player['playerId'],
                    "Position": player['position'],
                    "Salary": player['salary'],
                    "Status": player['status'],
                    "IsSwappable": player['isSwappable'],
                    "isDisabled": player['isDisabled'],
                    "Team": player['teamAbbreviation']
                }
            }).then(res => {
                //console.log(res);
                indexCount++;
            })
            .catch(error => {
                console.error(error); 
            });
            
        });
    }

    console.log('Success! number of docs indexed is:', indexCount);

} catch (error) {
    console.log(error);
}
}

async function getDataPGA() {
    try {
    //Get the contests
    const contestsResponse = await fetch('https://www.draftkings.com/lobby/getcontests?sport=GOLF');
    const contestsJson = await contestsResponse.json();
    var indexCount = 0; 
    //Loop through all contests and build a list of the unique draft groups
    let groupIdList = [];
    contestsJson['Contests'].forEach(contest => {
        if (!groupIdList.includes(contest['dg']) && contest['gameType'] == "Classic") {
            groupIdList.push(contest['dg'])
        }
        console.log(contest['n']);
    });

    //For each draft group, grab the draftables by replacing the parameter in the URL with the correct group Id
    for (const groupId of groupIdList) {
        console.log('Players for GroupId:')
        console.log(groupId);

        console.log('\n')

        const draftablePlayersResponse = await fetch('https://api.draftkings.com/draftgroups/v1/draftgroups/' + groupId + '/draftables');
        const draftableplayersJson = await draftablePlayersResponse.json();

        //Nice! Now we have the players so let's just console.log them as a simple example
        draftableplayersJson['draftables'].forEach(async player => { 
            await client.index({
                index: 'dkpgaplayers',
                id: player['draftableId'],
                body: {
                    "FirstName": player['firstName'],
                    "LastName": player['lastName'],
                    "DisplayName": player['displayName'],
                    "PlayerId": player['playerId'],
                    "Position": player['position'],
                    "Salary": player['salary'],
                    "Status": player['status'],
                    "IsSwappable": player['isSwappable'],
                    "isDisabled": player['isDisabled'],
                    "Team": player['teamAbbreviation']
                }
            }).then(res => {
                //console.log(res);
                indexCount++;
            })
            .catch(error => {
                console.error(error); 
            });
            
        });
    }

    console.log('Success! number of docs indexed is:', indexCount);

} catch (error) {
    console.log(error);
}
}

getDataPGA().catch(console.log);

