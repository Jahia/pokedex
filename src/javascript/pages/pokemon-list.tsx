import React, {FunctionComponent, useState, useEffect} from 'react';
import Pokemon from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import usePokemons from "../hooks/pokemon.hook";

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
    </div>);
}

export default PokemonList;