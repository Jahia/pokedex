// @ts-ignore
import { registry } from '@jahia/ui-extender';
import register from './register';

export default function () {
    registry.add('callback', 'pokedex-init', {
       targets: ['jahiaApp-init:50'],
        callback: register
    });
}
console.debug('%c Pokedex is activated', 'color: #3c8cba');
