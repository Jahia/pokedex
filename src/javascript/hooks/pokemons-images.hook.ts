import {useQuery} from "react-apollo";
import {GetPokemonImages} from "../graphql/queries";
import PokemonImage from "../models/pokemon-image";

const usePokemonImages = () => {
    const images: PokemonImage[] = [];

    const {loading, error, data} = useQuery(GetPokemonImages, {
        fetchPolicy: 'network-only', errorPolicy: 'all'
    });

    if (data) {
        data.jcr.queryResults[0].children.nodes.map((node: any) => {
            images.push(new PokemonImage(node.uuid, node.name, node.path));
        });
    }

    return {loading, error, images};
}

export default usePokemonImages;
