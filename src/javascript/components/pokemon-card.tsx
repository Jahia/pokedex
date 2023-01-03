import React, {FunctionComponent, useEffect, useState} from 'react';
import Pokemon from '../models/pokemon';
import '../theme.css';
import './pokemon-card.css';
import formatType from "../helpers/format-type";
import {useHistory} from "react-router-dom";

type Props = {
    pokemon: Pokemon,
    borderColor?: string
};

const PokemonCard: FunctionComponent<Props> = ({pokemon, borderColor = '#008000'}) => {

    const [color, setColor] = useState<string>();
    const history = useHistory();
    const showBorder = () => {
        setColor('#FF0000')
    }
    const hideBorder = () => {
        setColor(borderColor);
    }
    useEffect(() => {
        setColor(borderColor);
    }, []);

    const goToPokemon = (id: number) => {
        history.push(`/pokedex/pokemons/${id}`);
    }


    return (<div onClick={() => goToPokemon(pokemon.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
        <div className="col s6 m4">
            <div className="card horizontal" style={{borderColor: color}}>
                <div className="card-image">
                    {pokemon.picture.length > 0 && (
                    <img src={pokemon.picture} alt={pokemon.name}/>)}
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p>{pokemon.name}</p>
                        {pokemon.types.map(type => (
                            <span key={type} className={formatType(type)}>{type}</span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default PokemonCard;