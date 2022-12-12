import React, {FunctionComponent} from 'react';
import Pokemon from '../models/pokemon';
import '../materialize.min.css';
import './pokemon-card.css';

type Props = {
    pokemon: Pokemon
};

const PokemonCard: FunctionComponent<Props> = ({pokemon}) => {

    return (<div>
        <div className="col s6 m4">
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
        </div>
    </div>);
}

export default PokemonCard;