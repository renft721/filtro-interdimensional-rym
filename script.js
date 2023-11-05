// Obtener elementos del DOM
const charactersEl = document.getElementById('characters');
const nameFilterEl = document.getElementById('name-filter');
const statusFilterEl = document.getElementById('status-filter');

// Función para obtener y mostrar personajes
async function getCharacters(name, status) {
    let url = 'https://rickandmortyapi.com/api/character/';

    if (name || status) {
        url += '?';
        if (name) {
            url += `name=${name}&`;
        }

        if (status) {
            url += `status=${status}`;
        }
    }

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}

// Función para mostrar personajes en la página
async function displayCharacters(name, status) {
    // Obtener los personajes filtrados
    const characters = await getCharacters(name, status);
    charactersEl.innerHTML = '';

    // Renderizar los personajes
    for (let character of characters) {
        const card = document.createElement('div');
        card.classList.add('character-card');

        card.innerHTML = `
            <img src="${character.image}" />
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Especie: ${character.species}</p>
        `;

        charactersEl.appendChild(card);
    }
}

// Cargar personajes al cargar la página
displayCharacters();

// Escuchar cambios en los filtros
nameFilterEl.addEventListener('input', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value);
});

statusFilterEl.addEventListener('change', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value);
});
