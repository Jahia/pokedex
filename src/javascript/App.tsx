import React, {FunctionComponent, useState} from 'react';
import POKEMONS from "./models/mock-pokemon";
import Pokemon from "./models/pokemon";


const App: FunctionComponent = () => {
    const [pokemons] = useState<Pokemon[]>(POKEMONS);

    return (
        <div>
            <h1>Pokédex</h1>
            <p>There are {pokemons.length} pokemons.</p>
        </div>
    )
}

export default App;