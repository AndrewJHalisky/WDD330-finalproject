teamDetails = []
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '472ac25993msha03284bcae70e16p15acddjsn2fb3e993030c',
		'x-rapidapi-host': 'hockey-highlights-api.p.rapidapi.com'
	}
};

let getTeamsBtn = document.getElementById("getTeams");
getTeamsBtn.addEventListener('click', getNHLTeams);

function getNHLTeams() {
    // Show Teams
    fetch(`https://hockey-highlights-api.p.rapidapi.com/teams`, options)
    .then(response => {return response.json()})
    .then(data => {
        for (let team of data.data) {
            console.log(team);
            const html = `<img id=${team.id} src="${team.logo}" alt="logo">
            <h2>Team: ${team.name}</h2>`
            document.getElementById('showTeams').insertAdjacentHTML('beforeend', html)
            let teamLogo = document.getElementById(team.id);
            teamLogo.addEventListener('click', () => showDetails(team.id))
        }})
    .catch(error => console.log(error))
}
function showDetails(teamId) {
    fetch(`https://hockey-highlights-api.p.rapidapi.com/matches/${teamId}`, options)
        .then(response => { return response.json()})
        .then(teamDetails => {
            // Check if the response contains a valid `data` property
                console.log(teamId);
                if (teamDetails.length >= 0) {
                    const team = teamDetails
                    const html = `<img id=${team[0].teamId} src="${team[0].logo}" alt="logo">
                <h2>Team: ${team[0].name}</h2>
                <h3>${team[0].homeTeam}</h3>
                <h3>vs ${team[0].awayTeam}</h3>
                <p>City: ${team[0].city}</p>
                <p>Week: ${team[0].week}</p>
                <p>Date: ${team[0].date}</p>`;
                console.log(team[0])
                    document.getElementById('getDetails').insertAdjacentHTML('beforeend', html);
                } else {
                    console.error("Unexpected API response:", teamDetails[0]);
                }
        })
        .catch(error => console.error(error));
}

// function showDetails(teamId) {
    // Show Teams
    // let teamId = fetch(`https://hockey-highlights-api.p.rapidapi.com/matches/`);
    // .then(data => {
    //     for (var i = 0; i < teamDetails.length; i++) {
        
    //         console.log(teamDetails[i]);
    //         console.log(teamId);
        // };
            //const html = `<img id=${team.id} src="${team.logo}" alt="logo">
            // <h2>Team: ${team.name}</h2>`
            // document.getElementById('showTeams').insertAdjacentHTML('beforeend', html)
            // let teamLogo = document.getElementById(team.id);
            // teamLogo.addEventListener('click', () => showDetails(team.id))
//        }})
//    .catch(error => console.log(error))
        //         const html = `<img id=${teamDetails[0].id} src="${teamDetails[0].logo}" alt="logo">
        //         <h2>Team: ${teamDetails[0].name}</h2>
        //         <h3>${teamDetails[0].homeTeam}</h3>
        //         <h3>vs ${teamDetails[0].awayTeam}</h3>
        //         <p>City: ${teamDetails[0].city}</p>
        //         <p>Week: ${teamDetails[0].week}</p>
        //         <p>Date: ${teamDetails[0].date}</p>`;
        //         console.log(teamDetails[0])
        //             document.getElementById('getDetails').insertAdjacentHTML('beforeend', html);
        //         } else {
        //             console.error("Unexpected API response:", teamDetails[0]);
        //         }
        // })
        // .catch(error => console.error(error));
