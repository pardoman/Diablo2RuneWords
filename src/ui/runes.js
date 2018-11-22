
const Mustache = require('mustache');
import RUNES from '../../db/Runes.json'
import TEMPLATE from './runes.template.html'
import './runes.css';
import { getFilterData, registerFilterChange } from '../data/filterData'

let MY_RUNES_LIST = RUNES.map( rune => {
    return { 
        name: rune,
        inFilter: false
    }
});

/**
 * Initializes the Runes UI component
 */
let _runesDiv;
export function initRunes(div) {
    
    _runesDiv = document.createElement('div');
    _runesDiv.addEventListener('click', onRuneClick);
    renderRunes();
    div.appendChild(_runesDiv);

    registerFilterChange( renderRunes );
}

/**
 * Renders the UI
 */
function renderRunes() {
    
    let filterData = getFilterData();
    const runesInFilter = filterData.runes;

    MY_RUNES_LIST.forEach( entry => {
        entry.inFilter = runesInFilter.indexOf(entry.name) >= 0;
    });

    _runesDiv.innerHTML = Mustache.render(TEMPLATE, { runes: MY_RUNES_LIST });
}

/**
 * Click handler
 */
function onRuneClick(event) {
    if (!event.target.classList.contains('rune')) {
        return;
    }

    var runeName = event.target.textContent;
    let filterData = getFilterData();
    filterData.toggleRune(runeName);
}
