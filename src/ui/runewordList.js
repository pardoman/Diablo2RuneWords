const Mustache = require('mustache');

// Generate this file by running `npm run create-json`
import RUNEWORDS from '../../db/RunewordList.json'

import TEMPLATE from './runewordEntry.template.html'

export function createList(div) {
    
    var runewordsDiv = document.createElement('div');
    runewordsDiv.innerHTML = Mustache.render(TEMPLATE, { runewords: RUNEWORDS });
    div.appendChild(runewordsDiv);
}