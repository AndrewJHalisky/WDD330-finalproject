const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '472ac25993msha03284bcae70e16p15acddjsn2fb3e993030c',
		'x-rapidapi-host': 'hockey-highlights-api.p.rapidapi.com'
	}
};

console.log('hello');
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
            let teams = document.getElementById(team.id);
            teams.addEventListener('click', showDetails)
        }})
    .catch(error => console.log(error))
}

function showDetails(e) {
    let id = e.currentTarget.teams;
    fetch(`https://hockey-highlights-api.p.rapidapi.com/teams/${id}`, options)
    .then(response => {return response.json()})
    .then(data => {
        for (let team of data.data) {
            const html = `<img src="${team.logo}" alt="logo">
            <h2>Team: ${team.name}</h2>`
            document.getElementById('showTeams').insertAdjacentHTML('beforeend', html);
        }})
    .catch(error => console.log(error))
}
