import gql from "graphql-tag";

const GetPokemons = gql`
query {
  jcr(workspace: EDIT) {
    queryResults: nodesByPath(paths:["/sites/pokedex/contents/pokemons"]) {
      uuid
      workspace
      children{
        nodes{
          uuid
          workspace
          name
          hp: property(name: "hp") {
            value
          }
          cp: property(name: "cp") {
            value
          }
          picture: property(name: "picture") {
            url: refNode{
              uuid
              workspace
              path
            }
          }
          types:property(name: "types") {
            values
          } 
        }
      }
    }
  }
}
`;

const GetPokemon = gql`
query($uuid: String!) {
  jcr(workspace: EDIT) {
    queryResults: nodeById(uuid: $uuid) {
      uuid
      workspace

      uuid
      workspace
      name
      hp: property(name: "hp") {
        value
      }
      cp: property(name: "cp") {
        value
      }
      picture: property(name: "picture") {
        url: refNode {
          uuid
          workspace
          path
        }
      }
      types: property(name: "types") {
        values
      }
    }
  }
}
`;

export {GetPokemons, GetPokemon};
