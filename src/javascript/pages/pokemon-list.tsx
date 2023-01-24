import React, {FunctionComponent} from 'react';
import Pokemon from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import usePokemons from "../hooks/pokemons.hook";
import { Link } from 'react-router-dom';

const PokemonList: FunctionComponent = () => {
    const {error, loading, pokemons} = usePokemons();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !pokemons) {
        return <div>ERROR</div>;
    }

    return (<div style={{overflowY: 'scroll', width: '100%'}}>
        <h1 className="center">Pokédex</h1>
        <div className="container">
            <div className="row">
                {pokemons.map((pokemon: Pokemon) => (<PokemonCard key={pokemon.id} pokemon={pokemon}/>))}
            </div>
        </div>
        <Link className="btn-floating btn-large waves-effect waves-light red z-depth-3"
              style={{position: 'fixed', bottom: '25px', right: '25px'}}
              to="/pokedex/pokemons/add">
            <i className="material-icons">add</i>
        </Link>
    </div>);
}

export default PokemonList;
