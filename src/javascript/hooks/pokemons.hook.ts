import Pokemon from "../models/pokemon";
import {useQuery} from "react-apollo";
import {GetPokemons} from "../graphql/queries";



const usePokemons = () => {
    const pokemons: Pokemon[] = [];

    const {loading, error, data} = useQuery(GetPokemons, {
        fetchPolicy: 'network-only', errorPolicy: 'all'
    });

    if (data) {
        data.jcr.queryResults[0].children.nodes.map((node: any) => {
            pokemons.push(new Pokemon(node.uuid, node.hp.value, node.cp.value, node.name.value, node.picture ? '/files/default' + node.picture.url.path: "", node.types.values));
        });
    }

    return {loading, error, pokemons};
}

export default usePokemons;
