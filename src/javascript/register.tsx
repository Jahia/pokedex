import React from 'react';
import {registry} from '@jahia/ui-extender';
import App from './App';

export default function () {

    window.jahia.i18n.loadNamespaces('pokedex');

    registry.add('adminRoute', 'pokedexAdmin', {
        targets: ['administration-sites:999', 'pokedex-accordion'],
        label: 'pokedex:label.settings.title',
        icon: window.jahia.moonstone.toIconComponent('<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6V5A2 2 0 0 0 17 3H15A2 2 0 0 0 13 5V6H11V5A2 2 0 0 0 9 3H7A2 2 0 0 0 5 5V6H3V20H21V6M19 18H5V8H19Z" /></svg>'),
        isSelectable: true,
        render: <App/>
    });

}
