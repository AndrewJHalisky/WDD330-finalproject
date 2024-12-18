teamDetails = []
// const teamId 

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
            console.log(team.id);
            const html = `<img id=${team.id} src="${team.logo}" alt="logo">
            <h2>Team: ${team.name}</h2>
            <p>ID: ${team.id} </p>`
            document.getElementById('showTeams').insertAdjacentHTML('beforeend', html)
            let teamLogo = document.getElementById(team.id);
            teamLogo.addEventListener('click', () => showDetails(team.id))
            // Nested function: 
        }})
    .catch(error => console.log(error))
}

function showDetails(teamId) {
    fetch(`https://hockey-highlights-api.p.rapidapi.com/matches/homeTeamId=${teamId}`, options)
        .then(response => { return response.json()})
        .then(teamDetails => {
            // Check if the response contains a valid `data` property
            console.log("Team Details for ID", teamId, ":", teamDetails);
            if (teamDetails.length >= 0) {
                const team = teamDetails
                const html = `<img id=${team[0].homeTeam.id} src="${team[0].logo}" alt="logo">
                <h2>Team: ${team[0].name}</h2>
                <h3>${team[0].homeTeam}</h3>
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
