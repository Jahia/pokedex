import React from 'react';
import {Cloud} from '@jahia/moonstone';
import App from './App';
// @ts-ignore
import { registry } from '@jahia/ui-extender';

export default function () {

    registry.add('adminRoute', 'pokedexAdmin', {
        targets: ['administration-sites:999', 'pokedex-accordion'],
        label: 'pokedex:label.settings.title',
        icon: <Cloud/>,
        isSelectable: true,
        render: () => React.createElement(App)
    });
}
