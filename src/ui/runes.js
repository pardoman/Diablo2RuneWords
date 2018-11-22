
const Mustache = require('mustache');
import RUNES from '../../db/Runes.json'
import TEMPLATE from './rune.template.html'
import './runes.css';
import { getFilterData } from '../data/filterData'

/**
 * Initializes the Runes UI component
 */
let _runesDiv;
export function initRunes(div) {
    
    _runesDiv = document.createElement('div');
    _runesDiv.addEventListener('click', onRuneClick);
    renderRunes();
    div.appendChild(_runesDiv);
}

/**
 * Renders the UI
 */
function renderRunes() {
    _runesDiv.innerHTML = Mustache.render(TEMPLATE, { runes: RUNES });
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