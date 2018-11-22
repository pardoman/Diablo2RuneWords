
const Mustache = require('mustache');
import RUNES from '../../db/Runes.json'
import TEMPLATE from './rune.template.html'
import './runes.css';

export function renderRuneList(div) {
    
    var runesDiv = document.createElement('div');
    runesDiv.innerHTML = Mustache.render(TEMPLATE, { runes: RUNES });
    div.appendChild(runesDiv);
}
