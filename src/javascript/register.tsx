import React from 'react';
import {Cloud} from '@jahia/moonstone';
import App from './App';
// @ts-ignore
import {registry} from '@jahia/ui-extender';

export default function () {

    // Addition to the site settings
    registry.add('adminRoute', 'pokedexSiteAdmin', {
        targets: ['administration-sites:999', 'pokedex-site-admin'],
        label: 'pokedex:label.settings.title',
        icon: <Cloud/>,
        isSelectable: true,
        render: () => React.createElement(App)
    });

    // Addition to the server settings
    registry.add('adminRoute', 'pokedexServerAdmin', {
        targets: ['administration-server:999', 'pokedex-server-admin'],
        label: 'pokedex:label.settings.title',
        icon: <Cloud/>,
        isSelectable: true,
        render: () => React.createElement(App)
    });

    // Declaration of the global route
    registry.add('route', 'route-pokedex', {
        targets: ['main:999'],
        path: `/pokedex`,
        render: () => React.createElement(App)
    });

    // Addition as a global interface
    registry.add('primary-nav-item', 'pokedexPrimaryNav', {
        targets: ['nav-root-top:999'],
        path: '/pokedex',
        label: 'pokedex:label.settings.title',
        icon: <Cloud/>
    });

    // Addition in the user dashboard
    registry.add('adminRoute', 'pokedexDashboard', {
        targets: ['dashboard:999'],
        icon: <Cloud/>,
        label: 'pokedex:label.settings.title',
        isSelectable: true,
        render: () => React.createElement(App)
    });

}
