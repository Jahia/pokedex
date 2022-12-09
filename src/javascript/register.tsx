import React from 'react';
import {Cloud} from '@jahia/moonstone';
import App from './App';
// @ts-ignore
import { registry } from '@jahia/ui-extender';

export default function () {

    //window.jahia.i18n.loadNamespaces('pokedex');

    registry.add('adminRoute', 'pokedexAdmin', {
        targets: ['administration-sites:999', 'pokedex-accordion'],
        label: 'pokedex:title',
        icon: <Cloud/>,
        isSelectable: true,
        render: () => React.createElement(App)
    });
}
