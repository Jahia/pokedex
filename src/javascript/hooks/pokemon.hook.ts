import Pokemon from "../models/pokemon";
import {useQuery} from "react-apollo";
import {GetPokemon} from "../graphql/queries";

// @ts-ignore
const usePokemon = (uuid) => {
    let pokemon = null;

    const {loading, error, data} = useQuery(GetPokemon, {
        fetchPolicy: 'network-only', errorPolicy: 'all',
        variables:{
            uuid: uuid
        }
    });

    if (data) {
        const pokemonResult = data.jcr.queryResults;
        pokemon = new Pokemon(pokemonResult.uuid, pokemonResult.hp.value, pokemonResult.cp.value, pokemonResult.name.value, pokemonResult.picture ? '/files/default' + pokemonResult.picture.url.path: "", pokemonResult.types.values);
    }

    return {loading, error, pokemon};
}

export default usePokemon;
