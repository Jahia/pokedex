import React, {FunctionComponent, useState, useEffect} from 'react';
import POKEMONS from "./models/mock-pokemon";
import Pokemon from "./models/pokemon";


const App: FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    useEffect(() => {
        setPokemons(POKEMONS);
    }, []);

    return (<div
                 style={{overflowY: 'scroll'}}>
            <h1 className="center">Pokedex</h1>
            <div className="container">
                <div className="row">
                    {pokemons.map(pokemon => (<div className="col s6 m4" key={pokemon.id}>
                            <div className="card horizontal">
                                <div className="card-image">
                                    <img src={pokemon.picture} alt={pokemon.name}/>
                                </div>
                                <div className="card-stacked">
                                    <div className="card-content">
                                        <p>{pokemon.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                </div>
            </div>
        </div>)
}

export default App;