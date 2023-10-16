// Function to update the team display
function updateTeamDisplay() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    const teams = JSON.parse(localStorage.getItem("teams") || "[]");

    for (const team of teams) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${team[1]}" alt="${team[0]}" width="300" height="200">
            <h2>${team[0]}</h2>
        `;
        card.addEventListener("click", () => {
            handleTeamCardClick(team[0]);
        });
        content.appendChild(card);
    }
}

// Function to handle team card click
function handleTeamCardClick(teamName) {
    window.location.href = `team_details.html?team=${teamName}`;
}

// Function to add a new team to local storage and update the display
function addTeamToStorage() {
    const teamName = document.getElementById("team_name").value;
    const teamIconLink = document.getElementById("team_icon_link").value;

    if (teamName && teamIconLink) {
        const teams = JSON.parse(localStorage.getItem("teams") || "[]");
        teams.push([teamName, teamIconLink]);
        localStorage.setItem("teams", JSON.stringify(teams));

        updateTeamDisplay();
        document.getElementById("team-dialog").classList.add("hidden");
    }
}

// ... (previous code)

// Function to add a new player to local storage and update the display
function addPlayerToStorage() {
    const full_name = document.getElementById("full_name").value;
    const photo_link = document.getElementById("photo_link").value;
    const team = document.getElementById("team").value;
    const price = parseFloat(document.getElementById("price").value);
    const playing_status = document.querySelector('input[name="playing_status"]:checked').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    if (full_name && photo_link && team && !isNaN(price) && playing_status && role) {
        const players = JSON.parse(localStorage.getItem("players") || "[]");
        const player = {
            full_name: full_name,
            photo_link: photo_link,
            team: team,
            price: price,
            playing_status: playing_status,
            role: role
        };

        // Generate a unique ID for the player
        player.id = players.length + 1;

        players.push(player);
        localStorage.setItem("players", JSON.stringify(players));

        // Update the player display (you can add this function)
        updatePlayerDisplay();

        document.getElementById("player-dialog").classList.add("hidden");
    }
}

// Function to update the player display
function updatePlayerDisplay() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    const players = JSON.parse(localStorage.getItem("players") || "[]");

    for (const player of players) {
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


// Function to show the team form when "Add New Team" button is clicked
document.getElementById("add-team").addEventListener("click", () => {
    document.getElementById("team-dialog").classList.remove("hidden");
    document.getElementById("player-dialog").classList.add("hidden");
});

document.getElementById("team-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addTeamToStorage();
});

// Function to show the player form when "Add New Player" button is clicked
document.getElementById("add-player").addEventListener("click", () => {
    document.getElementById("player-dialog").classList.remove("hidden");
    document.getElementById("team-dialog").classList.add("hidden");
});

document.getElementById("player-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addPlayerToStorage();
});
// ... (previous code)

// Function to handle team card click
function handleTeamCardClick(teamName) {
    window.location.href = `team_details.html?team=${teamName}`;
}

// Function to filter teams based on the search query
function filterTeams(searchQuery) {
    const teams = JSON.parse(localStorage.getItem("teams") || "[]");
    const filteredTeams = teams.filter(team => team[0].toLowerCase().includes(searchQuery));
    return filteredTeams;
}

// Function to update the team display based on a list of teams
function updateTeamDisplay(teams) {
    const content = document.getElementById("content");
    content.innerHTML = "";
    if (teams) {
        for (const team of teams) {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${team[1]}" alt="${team[0]}" width="300" height="200">
                <h2>${team[0]}</h2>
            `;
            card.addEventListener("click", () => {
                handleTeamCardClick(team[0]);
            });
            content.appendChild(card);
        }
    } else {
        content.innerHTML = "<p>No teams found.</p>";
    }

}

// Event listener for the search button
document.getElementById("search-button").addEventListener("click", () => {
    const searchQuery = document.getElementById("team-search").value.toLowerCase();
    const filteredTeams = filterTeams(searchQuery);
    updateTeamDisplay(filteredTeams);
});

// Handle search when pressing Enter in the search input field
document.getElementById("team-search").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const searchQuery = this.value.toLowerCase();
        const filteredTeams = filterTeams(searchQuery);
        updateTeamDisplay(filteredTeams);
    }
});

// Initialize the team display
updateTeamDisplay(filterTeams("")); // Display all teams initially
// updateTeamDisplay(); 