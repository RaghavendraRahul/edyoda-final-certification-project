// Function to extract query parameters from the URL
function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}

// Function to display player cards on the team details page
function displayPlayerCards() {
    const teamName = getQueryVariable("team");
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    const teamPlayers = players.filter(player => player.team === teamName);

    const content = document.getElementById("content");

    for (const player of teamPlayers) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${player.photo_link}" alt="${player.full_name}" width="300" height="200">
            <h2>${player.full_name}</h2>
            <p>Team: ${player.team}</p>
            <p>Price: $${player.price.toFixed(2)}</p>
            <p>Playing Status: ${player.playing_status}</p>
            <p>Role: ${player.role}</p>
        `;
        content.appendChild(card);
    }
}

// Initialize the player cards on the team details page
displayPlayerCards();
