import React, {FunctionComponent, useState, useEffect} from 'react';
// @ts-ignore
import {RouteComponentProps, Link} from 'react-router-dom';
import formatType from '../helpers/format-type';
import usePokemon from "../hooks/pokemon.hook";
import '../theme.css';

type Params = { uuid: string };

const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {

    const {error, loading, pokemon} = usePokemon(match.params.uuid);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !pokemon) {
        return <div>ERROR</div>;
    }

    return (<div style={{overflowY: 'scroll', width: '100%'}}>
            {pokemon ? (<div className="row">
                    <div className="col s12 m8 offset-m2">
                        <h2 className="header center">{pokemon.name}</h2>
                        <div className="card hoverable">
                            <div className="card-image">
                                <img src={pokemon.picture} alt={pokemon.name}
                                     style={{width: '250px', margin: '0 auto'}}/>
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <table className="bordered striped">
                                        <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td><strong>{pokemon.name}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Heath points</td>
                                            <td><strong>{pokemon.hp}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Combat points</td>
                                            <td><strong>{pokemon.cp}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Types</td>
                                            <td>
                                                {pokemon.types.map(type => (
                                                    <span key={type} className={formatType(type)}>{type}</span>))}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-action">
                                    <Link to="/pokedex">Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : (<h4 className="center">No Pokemon to display!</h4>)}
        </div>);
}

export default PokemonsDetail;