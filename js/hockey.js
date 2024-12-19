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
getTeamsBtn.addEventListener('click', getAllTeams);

function getAllTeams() {
    // Show Teams
    fetch(`https://hockey-highlights-api.p.rapidapi.com/teams`, options)
    .then(response => {return response.json()})
    .then(data => {
        for (let team of data.data) {
            console.log(team.id);
            const html = `<table class="selectTable">
            <th>
            <div class="flipLogo">
            <img id=${team.id} src="${team.logo}" alt="logo">
            </div>
            </th>
            <td><h2>Team: ${team.name}</h2></td>
            <td><p>ID: ${team.id}</p></td>
            </table>`
            document.getElementById('showTeams').insertAdjacentHTML('beforeend', html)
            let teamLogo = document.getElementById(team.id);
            teamLogo.addEventListener('click', () => showLastFiveGames(team.id, team.name, team.logo))
            // Nested function: 
        }})
    .catch(error => console.log(error))
}

function showLastFiveGames(teamId) {
    fetch(`https://hockey-highlights-api.p.rapidapi.com/last-five-games?teamId=${teamId}`, options)
        .then(response => { return response.json()})
        .then(weekDetails => {
            // Check if the response contains a valid `data` property
            console.log("Team Details for ID", teamId, ":", teamDetails);
            if (weekDetails.length >= 0) {
                weekDetails.forEach((team) => {
                    const html = `<table class="teamTable">
                    <tr>
                    <th>
                    <h2>Week</h2>
                    </th>
                    <th>
                    <h2>Away Team</h2>
                    </th>
                    <th>
                    </th>
                    <th>
                    <h2>Home Team</h2>
                    </th>
                    <th>
                    <h2>Country</h2>
                    </th>
                    <th>
                    <h2>League</h2>
                    </th>
                    <th>
                    <h2>Score</h2>
                    </th>
                    <th>
                    <h2>Date</h2>
                    </th>
                    </tr>
                    <tr>
                    <td>
                        <p>${team.week}<p>
                    </td>
                    <td>
                        <img id=${team.awayTeam.id} src="${team.awayTeam.logo}" alt="logo">
                        <h3>${team.awayTeam.name}</h3>
                    </td>
                    <td>
                    vs
                    </td>
                    <td>
                        <img id=${team.homeTeam.id} src="${team.homeTeam.logo}" alt="logo">
                        <h3>${team.homeTeam.name}</h3>
                    </td>
                    <td>
                        <p>${team.country.name}</p>
                    </td>

                    <td>
                        <p>${team.league.name}</p>
                    </td>
                    <td>
                        <p>1st Period: ${team.state.score.firstPeriod}</p>
                        <p>2nd Period: ${team.state.score.secondPeriod}</p>
                        <p>3rd Period: ${team.state.score.thirdPeriod}</p>
                    </td>
                    <td>
                        <p>${team.date}</p>
                    </td>   
                    </tr>
                    </table>`;
                    console.log(team)
                    document.getElementById('getTeamDetails').insertAdjacentHTML('beforeend', html);
                })
            } else {
                console.error("Unexpected API response:", teamDetails[0]);
            }
        })
        .catch(error => console.error(error));
}

// Get League Teams

let getLeagueBtn = document.getElementById("getLeagues");
getLeagueBtn.addEventListener('click', getAllLeagues);

function getAllLeagues() {
    // Show Leagues
    fetch(`https://hockey-highlights-api.p.rapidapi.com/leagues`, options)
    .then(response => {return response.json()})
    .then(data => {
        for (let league of data.data) {
            console.log(league.id);
            const html = `<table class="selectTable">
            <th>
            <div class="flipLogo">
            <img id=${league.id} src="${league.logo}" alt="logo">
            </div>
            </th>
            <td><h2>League: ${league.name}</h2></td>
            <td><p>ID: ${league.id}</p></td>
            </table>`
            document.getElementById('showLeagues').insertAdjacentHTML('beforeend', html)
            let leagueLogo = document.getElementById(league.id);
            leagueLogo.addEventListener('click', () => showLeagueTeams(league.id, league.name, league.logo))
        }})
    .catch(error => console.log(error))
}

function showLeagueTeams(leagueId, leagueName, leagueLogo) {
    fetch(`https://hockey-highlights-api.p.rapidapi.com/leagues/${leagueId}`, options)
    .then(response => {return response.json()})
    .then(leagueDetails => {
        if (leagueDetails.length >= 0) {
            const league = leagueDetails[0]
            const html = `<div class="leagueDetails>
            <img id=${league.id} src="${leagueLogo}" alt="logo">
            <h2>Name: ${leagueName}</h2>
            <h2>Country: ${league.country.name}</h2>
            <img id=${league.id} src="${league.country.logo}" width="400" alt="logo">
            </div>
            <br>`
            document.getElementById('getLeagueDetails').insertAdjacentHTML('beforeend', html);
        }  else {
            console.error("Unexpected API response:", leagueDetails[0]);
        }
    })
    .catch(error => console.error(error));
}

