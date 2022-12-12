import React, {FunctionComponent, useEffect, useState} from 'react';
import Pokemon from '../models/pokemon';
import '../materialize.min.css';
import './pokemon-card.css';

type Props = {
    pokemon: Pokemon,
    borderColor?: string
};

const PokemonCard: FunctionComponent<Props> = ({pokemon, borderColor = '#008000'}) => {

    const [color, setColor] = useState<string>();
    const showBorder = () => {
        setColor('#FF0000')
    }
    const hideBorder = () => {
        setColor(borderColor);
    }
    useEffect(() => {
        setColor(borderColor);
    }, []);


    return (<div onMouseEnter={showBorder} onMouseLeave={hideBorder}>
        <div className="col s6 m4">
            <div className="card horizontal" style={{borderColor: color}}>
                <div className="card-image">
                    <img src={pokemon.picture} alt={pokemon.name}/>
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p>{pokemon.name}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default PokemonCard;