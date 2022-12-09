// @ts-ignore
import { registry } from '@jahia/ui-extender';
import register from './register';
import i18next from 'i18next';

export default function () {
    registry.add('callback', 'pokedex-init', {
       targets: ['jahiaApp-init:50'],
        callback: async () =>{
                await i18next.loadNamespaces('pokedex');
                register();
        }
    });
}
console.debug('%c Pokedex is activated', 'color: #3c8cba');
