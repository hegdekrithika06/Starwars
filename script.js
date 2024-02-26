document.addEventListener('DOMContentLoaded', function () {
    const planetsListElement = document.getElementById('planets-list');
    const showPlanetsButton = document.getElementById('show-planets-button');

    function fetchPlanetsData() {
        fetch('https://swapi.dev/api/planets/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch planets');
                }
                return response.json();
            })
            .then(data => {
                const planets = data.results;
                planetsListElement.innerHTML = ''; // Clear previous planet buttons
                planets.forEach(planet => {
                    const planetButton = document.createElement('button');
                    planetButton.classList.add('planet-button');
                    planetButton.textContent = planet.name;
                    planetButton.addEventListener('click', function () {
                        fetchPlanetDetails(planet.url);
                    });
                    planetsListElement.appendChild(planetButton);
                });
                planetsListElement.classList.remove('hidden'); // Show the list of planets
            })
            .catch(error => {
                console.error('Error fetching planets:', error);
            });
    }

    function fetchPlanetDetails(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch planet details');
                }
                return response.json();
            })
            .then(planet => {
                displayPlanetDetails(planet);
            })
            .catch(error => {
                console.error('Error fetching planet details:', error);
            });
    }

    function displayPlanetDetails(planet) {
        const planetDetailsElement = document.getElementById('planet-details');
        planetDetailsElement.innerHTML = `
            <h2>${planet.name}</h2>
            <p>Climate: ${planet.climate}</p>
            <p>Terrain: ${planet.terrain}</p>
            <p>Population: ${planet.population}</p>
            <h3>Notable Residents:</h3>
            <ul id="residents-list"></ul>
        `;

        const residentsList = document.getElementById('residents-list');
        residentsList.innerHTML = ''; // Clear previous residents list
        planet.residents.forEach(residentUrl => {
            fetch(residentUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch resident');
                    }
                    return response.json();
                })
                .then(resident => {
                    const residentItem = document.createElement('li');
                    residentItem.textContent = resident.name;
                    residentsList.appendChild(residentItem);
                })
                .catch(error => {
                    console.error('Error fetching resident:', error);
                });
        });
    }

    showPlanetsButton.addEventListener('click', fetchPlanetsData);
});
