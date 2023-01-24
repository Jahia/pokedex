export default class PokemonImage {
    uuid: string;
    name: string;
    path: string;

    constructor(
        uuid: string,
        name: string,
        path: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.path = path;
    }
}
