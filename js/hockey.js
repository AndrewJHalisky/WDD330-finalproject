// Function to get the URL
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '472ac25993msha03284bcae70e16p15acddjsn2fb3e993030c',
		'x-rapidapi-host': 'nhl-ncaah-api.p.rapidapi.com'
	}
};
console.log('hello');
let getTeamsBtn = document.getElementById("getTeams");
getTeamsBtn.addEventListener('click', getNHLTeams);

function getNHLTeams() {
    fetch(`https://nhl-ncaah-api.p.rapidapi.com/teams/`, options)
        .then(response => {return response.json()})
        .then(data => {
            data.forEach(team => {
                const html = `<img id=${team.id} src=${team.logo} alt="teamLogo"/>
                <h2>${team.displayName}</h2>
                <p>Abbreviation: ${team.abbreviation}</p>
                <p>League: ${team.league}</p>`
                document.getElementById('showTeams').insertAdjacentHTML('beforeend', html)
                let teamImg = document.getElementById(team.id);
                teamImg.addEventListener('click', showDetails)
                })})
        .catch(error => console.log(error))
}

function showDetails(e) {
    let id = e.currentTarget.id;
    fetch(`https://nhl-ncaah-api.p.rapidapi.com/teams/${id}`, options)
    .then(response => {return response.json()})
    .then(data => {
        data.forEach(team => {
        })
    })

}
