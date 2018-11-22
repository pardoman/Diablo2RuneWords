const Mustache = require('mustache');

// Generate this file by running `npm run create-json`
import RUNEWORDS from '../../db/RunewordList.json'

import TEMPLATE from './runewordEntry.template.html'

export function createList(div) {
    console.log(RUNEWORDS);

    let views = [];
    for (var i=0; i<RUNEWORDS.length; ++i) {

        let runeword = RUNEWORDS[i];
        let renderedView = Mustache.render(TEMPLATE, runeword);
        views.push(renderedView);
    }

    var listDiv = document.createElement('ul');
    listDiv.innerHTML = views.join('\n');

    div.appendChild(listDiv);
}