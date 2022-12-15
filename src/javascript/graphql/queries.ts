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

export {GetPokemons};
