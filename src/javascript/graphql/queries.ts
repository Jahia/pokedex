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
          name: property(name: "name") {
            value
          }
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
      name: property(name: "name") {
        value
      }
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
const UpdatePokemon = gql`
  mutation($uuid: String!, $name: String!, $hp: String!, $cp: String!, $types: [String]!) {
    jcr(workspace: EDIT) {
      mutateNode(pathOrId: $uuid) {
        name: mutateProperty(name: "name") {
          setValue(type: STRING, value: $name)
        }
        hp: mutateProperty(name: "hp") {
          setValue(type: STRING, value: $hp)
        }
        cp: mutateProperty(name: "cp") {
          setValue(type: STRING, value: $cp)
        }
        types: mutateProperty(name: "types") {
          setValues(type: STRING, values: $types)
        }
      }
    }
  }
`;

const DeletePokemon = gql`
  mutation($uuid: String!) {
    jcr(workspace: EDIT) {
      deleteNode(pathOrId: $uuid)
    }
  }
`;

const AddPokemon = gql`
  mutation($name: String!, $hp: String!, $cp: String!, $types: [String]!) {
    jcr(workspace: EDIT) {
    addNode(
      parentPathOrId: "/sites/pokedex/contents/pokemons",
      name: $name,
      primaryNodeType: "pokemonnt:pokemon",
      properties: [
        {name: "name", value: $name},
        {name: "hp", value: $hp},
        {name: "cp", value: $cp},
        {name: "types", values: $types},
      ]
    ){
      uuid
    }
  }
}
`;
export {AddPokemon, DeletePokemon, GetPokemon, GetPokemons, UpdatePokemon};
