import React, {FunctionComponent, useState} from 'react';
import {AddPokemon, DeletePokemon, GetPokemonImages, GetPokemon, UpdatePokemon} from "../graphql/queries";
import {Link, useHistory} from "react-router-dom";
import {useMutation, useQuery} from "react-apollo";
import formatType from '../helpers/format-type';
import Pokemon from '../models/pokemon';
import Select from 'react-select';
import usePokemonImages from "../hooks/pokemons-images.hook";

type Props = {
    pokemon: Pokemon, isEditForm: boolean
};

type Field = {
    value?: any, error?: string, isValid?: boolean
}

type Form = {
    name: Field, hp: Field, cp: Field, picture: Field, types: Field
}

const PokemonForm: FunctionComponent<Props> = ({pokemon, isEditForm}) => {

    const [form, setForm] = useState<Form>({
        name: {value: pokemon.name, isValid: true},
        hp: {value: pokemon.hp, isValid: true},
        cp: {value: pokemon.cp, isValid: true},
        picture: {value: pokemon.picture, isValid: true},
        types: {value: pokemon.types, isValid: true}
    })
    const [updatePokemonMutation] = useMutation(UpdatePokemon);
    const [deletePokemonMutation] = useMutation(DeletePokemon);
    const [addPokemonMutation, {data}] = useMutation(AddPokemon);

    if (data) {
        const pokemonResult = data.jcr.queryResults;
        pokemon = new Pokemon(pokemonResult.uuid, pokemonResult.hp.value, pokemonResult.cp.value, pokemonResult.name.value, pokemonResult.picture ? '/files/default' + pokemonResult.picture.url.path : "", pokemonResult.types.values);
    }
    const history = useHistory();

    const types: string[] = ['plant', 'fire', 'water', 'insect', 'normal', 'electrical', 'poison', 'fairy', 'flight', 'fight', 'psy'];

    const hasType = (type: string): boolean => {
        return form.types.value.includes(type);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = {[fieldName]: {value: fieldValue}};
        setForm({...form, ...newField});
    }

    const [pokemonImage, setPokemonImage] = useState("");
    // @ts-ignore
    const handleImageChange = (newValue: SingleValue<{ uuid: string; name: string; path: string; }>) => {
        setPokemonImage(newValue.uuid);
    };


    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        const checked = e.target.checked;
        let newField: Field;

        if (checked) {
            const newType: string[] = form.types.value.concat([type]);
            newField = {value: newType};
        } else {
            const newType: string[] = form.types.value.filter((currentType: string) => currentType !== type);
            newField = {value: newType};
        }
        setForm({...form, ...{types: newField}});
    }
    const validateForm = () => {
        let newForm: Form = form;

        // Validator url
        if (isAddForm()) {

            const start = "/";
            const end = ".png";

            if (!pokemonImage.startsWith(start) || !pokemonImage.endsWith(end)) {
                const errorMsg: string = 'The URL is not valid.';
                const newField: Field = {value: pokemonImage, error: errorMsg, isValid: false};
                newForm = {...newForm, ...{picture: newField}};
            } else {
                const newField: Field = {value: pokemonImage, error: '', isValid: true};
                newForm = {...newForm, ...{picture: newField}};
            }
        }

        // Validator name
        if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
            const errorMsg: string = 'The Pokemon name is required (1-25).';
            const newField: Field = {value: form.name.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{name: newField}};
        } else {
            const newField: Field = {value: form.name.value, error: '', isValid: true};
            newForm = {...newForm, ...{name: newField}};
        }

        // Validator hp
        if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
            const errorMsg: string = 'Pokemon health points are between 0 and 999.';
            const newField: Field = {value: form.hp.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{hp: newField}};
        } else {
            const newField: Field = {value: form.hp.value, error: '', isValid: true};
            newForm = {...newForm, ...{hp: newField}};
        }

        // Validator cp
        if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
            const errorMsg: string = 'Pokemon damages are between 0 and 99';
            const newField: Field = {value: form.cp.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{cp: newField}};
        } else {
            const newField: Field = {value: form.cp.value, error: '', isValid: true};
            newForm = {...newForm, ...{cp: newField}};
        }

        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
    }

    const isAddForm = (): boolean => {
        return !isEditForm;
    }

    const isTypesValid = (type: string): boolean => {
        // Cas n°1: Le pokémon a un seul type, qui correspond au type passé en paramètre.
        // Dans ce cas on revoie false, car l'utilisateur ne doit pas pouvoir décoché ce type (sinon le pokémon aurait 0 type, ce qui est interdit)
        if (form.types.value.length === 1 && hasType(type)) {
            return false;
        }

        // Cas n°1: Le pokémon a au moins 3 types.
        // Dans ce cas il faut empêcher à l'utilisateur de cocher un nouveau type, mais pas de décocher les types existants.
        if (form.types.value.length >= 3 && !hasType(type)) {
            return false;
        }

        // Après avoir passé les deux tests ci-dessus, on renvoie 'true',
        // c'est-à-dire que l'on autorise l'utilisateur à cocher ou décocher un nouveau type.
        return true;
    }

    const deletePokemon = () => {
        deletePokemonMutation({
            variables: {
                uuid: pokemon.id
            }
        }).then(() => history.push(`/pokedex`));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            pokemon.picture = pokemonImage;
            pokemon.name = form.name.value;
            pokemon.hp = form.hp.value;
            pokemon.cp = form.cp.value;
            pokemon.types = form.types.value;
            isEditForm ? updatePokemon() : addPokemon();

        }
    }

    const updatePokemon = () => {
        //PokemonService.updatePokemon(pokemon).then(() => history.push(`/pokemons/${pokemon.id}`));
        updatePokemonMutation({
            variables: {
                uuid: pokemon.id, name: pokemon.name, hp: pokemon.hp, cp: pokemon.cp, types: pokemon.types
            }
        }).then(() => history.push(`/pokedex/pokemons/${pokemon.id}`));
    }

    const addPokemon = () => {
        addPokemonMutation({
            variables: {
                name: pokemon.name, hp: pokemon.hp, cp: pokemon.cp, types: pokemon.types, picture: pokemon.picture
            }
        }).then((result) => history.push(`/pokedex/pokemons/${result.data.jcr.addNode.uuid}`));
    }

    const {error, loading, images} = usePokemonImages();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !images) {
        return <div>ERROR</div>;
    }

    return (<form onSubmit={e => handleSubmit(e)}>
        <div className="row">
            <div className="col s12 m8 offset-m2">
                <div className="card hoverable">
                    {isEditForm && (<div className="card-image">
                        <img src={pokemon.picture} alt={pokemon.name}
                             style={{width: '250px', margin: '0 auto'}}/>
                        <span className="btn-floating halfway-fab waves-effect waves-light">
                <i onClick={deletePokemon} className="material-icons">delete</i>
              </span>
                    </div>)}
                    <div className="card-stacked">
                        <div className="card-content">
                            {/* Pokemon picture */}
                            {isAddForm() && (<div className="form-group">
                                <label htmlFor="picture">Image</label>
                                <div className="input-field">
                                    <Select
                                        options={images}
                                        onChange={handleImageChange}
                                        formatOptionLabel={(image: { uuid: string; name: string; path: string; }) => (
                                            <div id={image.uuid} className="country-option">
                                                <img src={"/files/default" + image.path} alt={image.name}/>
                                            </div>)}
                                    />
                                </div>

                                {/* error */}
                                {form.picture.error && <div className="card-panel red accent-1">
                                    {form.picture.error}
                                </div>}
                            </div>)}
                            {/* Pokemon name */}
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id="name" name="name" type="text" className="form-control"
                                       value={form.name.value} onChange={e => handleInputChange(e)}></input>
                                {/* error */}
                                {form.name.error && <div className="card-panel red accent-1">
                                    {form.name.error}
                                </div>}
                            </div>
                            {/* Pokemon hp */}
                            <div className="form-group">
                                <label htmlFor="hp">Health points</label>
                                <input id="hp" name="hp" type="number" className="form-control"
                                       value={form.hp.value} onChange={e => handleInputChange(e)}></input>
                                {/* error */}
                                {form.hp.error && <div className="card-panel red accent-1">
                                    {form.hp.error}
                                </div>}
                            </div>
                            {/* Pokemon cp */}
                            <div className="form-group">
                                <label htmlFor="cp">Damages</label>
                                <input id="cp" name="cp" type="number" className="form-control"
                                       value={form.cp.value} onChange={e => handleInputChange(e)}></input>
                                {/* error */}
                                {form.cp.error && <div className="card-panel red accent-1">
                                    {form.cp.error}
                                </div>}
                            </div>
                            {/* Pokemon types */}
                            <div className="form-group">
                                <label>Types</label>
                                {types.map(type => (<div key={type} style={{marginBottom: '10px'}}>
                                    <label>
                                        <input id={type} type="checkbox" className="filled-in"
                                               checked={hasType(type)} value={type}
                                               disabled={!isTypesValid(type)}
                                               onChange={e => selectType(type, e)}></input>
                                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                                    </label>
                                </div>))}
                            </div>
                        </div>
                        <div className="card-action center">
                            {/* Submit button */}
                            <button type="submit" className="btn">Validate</button>
                        </div>
                        <div className="card-action">
                            <Link to="/pokedex">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>);
};

export default PokemonForm;