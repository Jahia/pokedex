import React, {FunctionComponent, useState, useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';

const PokemonAdd: FunctionComponent<RouteComponentProps> = ({match}) => {
    const [id] = useState<number>(new Date().getTime());
    const [pokemon, setPokemon] = useState<Pokemon>(new Pokemon(id));

    return (
        <div style={{overflowY: 'scroll', width: '100%'}}>
            <div className="row">
                <h2 className="header center">Add a pokemon</h2>
                <PokemonForm pokemon={pokemon} isEditForm={false}></PokemonForm>
            </div>
        </div>
    );
}

export default PokemonAdd;