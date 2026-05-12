let allGames = [];

// 1. Games inladen vanuit de JSON
async function fetchGames() {
    try {
        const response = await fetch('games.json');
        allGames = await response.json();
        displayGames(allGames);
        setupCategories();
    } catch (error) {
        console.error("Fout bij laden van games:", error);
    }
}

// 2. Games op het scherm tekenen
function displayGames(games) {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = ''; // Leegmaken

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <h3>${game.title}</h3>
            <p>${game.category}</p>
        `;
        card.onclick = () => openGame(game.path);
        grid.appendChild(card);
    });
}

// 3. Game Overlay beheer
function openGame(path) {
    const overlay = document.getElementById('gameOverlay');
    const frame = document.getElementById('gameFrame');
    frame.src = path;
    overlay.classList.remove('hidden');
}

document.getElementById('closeGame').onclick = () => {
    const overlay = document.getElementById('gameOverlay');
    const frame = document.getElementById('gameFrame');
    frame.src = ''; // Stop de game (bespaart geheugen)
    overlay.classList.add('hidden');
};

// 4. Zoekfunctie
document.getElementById('searchBar').oninput = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allGames.filter(g => g.title.toLowerCase().includes(term));
    displayGames(filtered);
};

// 5. Random Game
function loadRandomGame() {
    if (allGames.length === 0) return;
    const randomIdx = Math.floor(Math.random() * allGames.length);
    openGame(allGames[randomIdx].path);
}

// Start het proces
fetchGames();
