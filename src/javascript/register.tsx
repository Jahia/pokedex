import React from 'react';
import {Cloud} from '@jahia/moonstone';
import PokemonDetail from "./pages/pokemon-detail";
import PokemonList from "./pages/pokemon-list";
// @ts-ignore
import {registry} from '@jahia/ui-extender';
import PokemonEdit from "./pages/pokemon-edit";
import PokemonAdd from "./pages/pokemon-add";

export default function () {

    // Addition to the site settings
    const adminRoute = 'adminRoute';
    const labelSettingsTitle = 'pokedex:label.settings.title';
    registry.add(adminRoute, 'pokedexSiteAdmin', {
        targets: ['administration-sites:999', 'pokedex-site-admin'],
        label: labelSettingsTitle,
        icon: <Cloud/>,
        isSelectable: true,
        render: () => React.createElement(PokemonList)
    });

    // Addition to the server settings
    registry.add(adminRoute, 'pokedexServerAdmin', {
        targets: ['administration-server:999', 'pokedex-server-admin'],
        label: labelSettingsTitle,
        icon: <Cloud/>,
        isSelectable: true,
        render: () => React.createElement(PokemonList)
    });

    // Addition in the user dashboard
    registry.add(adminRoute, 'pokedexDashboard', {
        targets: ['dashboard:999'],
        icon: <Cloud/>,
        label: labelSettingsTitle,
        isSelectable: true,
        render: () => React.createElement(PokemonList)
    });

    registry.add('route', 'route-pokedex-pokemon-add', {
        targets: ['main:999'],
        path: `/pokedex/pokemons/add`,
        render: () => React.createElement(PokemonAdd)
    });

    registry.add('route', 'route-pokedex-pokemon-edit', {
        targets: ['main:999'],
        path: `/pokedex/pokemons/edit/:uuid`,
        // @ts-ignore
        render: ({match}) => React.createElement(PokemonEdit, match={match})
    });

    registry.add('route', 'route-pokedex-pokemon', {
        targets: ['main:999'],
        path: `/pokedex/pokemons/:uuid`,
        // @ts-ignore
        render: ({match}) => React.createElement(PokemonDetail, match={match})
    });

    // Declaration of the global route
    registry.add('route', 'route-pokedex', {
        targets: ['main:999.1'],
        path: `/pokedex`,
        render: () => React.createElement(PokemonList)
    });

    // Addition as a global interface
    registry.add('primary-nav-item', 'pokedexPrimaryNav', {
        targets: ['nav-root-top:999'],
        path: '/pokedex',
        label: 'pokedex:label.settings.title',
        icon: <Cloud/>
    });
}
