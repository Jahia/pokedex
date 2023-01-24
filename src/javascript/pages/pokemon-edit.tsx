import React, { FunctionComponent} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import usePokemon from "../hooks/pokemon.hook";
type Params = { uuid: string };

const PokemonEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const {error, loading, pokemon} = usePokemon(match.params.uuid);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !pokemon) {
        return <div>ERROR</div>;
    }

    return (
        <div style={{overflowY: 'scroll', width: '100%'}}>
            { pokemon ? (
                <div className="row">
                    <h2 className="header center">Edit { pokemon.name }</h2>
                    <PokemonForm pokemon={pokemon} isEditForm={true}></PokemonForm>
                </div>
            ) : (
                <h4 className="center">No Pokemon to display!</h4>
            )}
        </div>
    );
}

export default PokemonEdit;
