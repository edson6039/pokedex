const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5;
const maxRecords = 151;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => 
        `<li id="poke${pokemon.number}" class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types p0 m0 ls">
                            ${pokemon.types.map((type) => (`<li class="type ${type}">${type}</li>`)).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
        </li>`).join('');

        pokemons.forEach((pokemon) => {
            const li = document.getElementById(`poke${pokemon.number}`);
            li.addEventListener('click', () => {
                window.location.href = `details.html?pokeId=${pokemon.number}`;
            });
        })
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsNextPage = offset + limit;
    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    else {
        loadPokemonItens(offset, limit);
    }
})
