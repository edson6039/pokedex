const urlParams = new URLSearchParams(window.location.search);
const pokeId = urlParams.get('pokeId');

const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;

function convertPokemonDetailsToHtml(pokemonDetails) {
    const typesHtml = pokemonDetails.types.map((typeSlot) => {
        return `<li class="pokeType ${typeSlot.type.name}">${typeSlot.type.name}</li>`;
    }).join('');

    return `<section id="pokeDetailsUp" class="pokeDetailsUp ${pokemonDetails.types[0].type.name}">
            <div class="pokeDetails ">
                <div class="pokeInfo">
                    <span class="pokeName">${pokemonDetails.name}</span>
                    <ol class="pokeTypes">
                        ${typesHtml}
                    </ol>
                    <span class="pokeNumber">#${pokemonDetails.id}</span>
                </div>
                <img src="${pokemonDetails.sprites.other['official-artwork'].front_default}" alt="${pokemonDetails.name}">
            </div>
        </section>
        <section id="pokeDetailsDown" class="pokeDetailsDown ${pokemonDetails.types[0].type.name}">
            <div class="pokeStats">
                ${pokemonDetails.stats.map(stat => `
                    <div class="pokeStatsValue">
                        <span class="statsTitulo">${stat.stat.name.toUpperCase()}</span>
                        <div class="pokeBarLimit">
                            <span class="pokeBar" style="width: ${stat.base_stat}%"></span>
                        </div>
                        <span class="pokeStats">${stat.base_stat}</span>
                    </div>
                `).join('')}
                <div class="pokeStatsValue">
                    <span class="statsTitulo">TOTAL</span>
                    <span class="pokeStats">
                        ${pokemonDetails.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                    </span>   
                </div>
            </div>    
        </section>
        <div id="buttonHolder" class="${pokemonDetails.types[0].type.name}">
        <button id="returnButton">
                Voltar
        </button>
        </div>`;
}

const pokemonDetailsDown = document.getElementById('pokeDetail')


fetch(url)
.then((response) => response.json())
.then((jsonBody) => (jsonBody))
.then((pokemonDetails) => {
    pokeDetail.innerHTML += convertPokemonDetailsToHtml(pokemonDetails)
    document.getElementById('returnButton').addEventListener("click", function() {
        window.location.href = "index.html"
    })
})
.catch((error) => console.log(error))



/* ${typesHtml} */