const Mustache = require('mustache');

// Generate this file by running `npm run create-json`
import RUNEWORDS from '../../db/RunewordList.json'
import TEMPLATE from './runewordEntry.template.html'
import { getFilterData, registerFilterChange } from '../data/filterData'

let _runewordsDiv;
export function createList(div) {
    
    _runewordsDiv = document.createElement('div');
    _runewordsDiv.innerHTML = Mustache.render(TEMPLATE, { runewords: RUNEWORDS });
    div.appendChild(_runewordsDiv);

    registerFilterChange(filterList);
}

/**
 * Apply filters to the list without rebuilding it.
 */
function filterList() {
    
    const filterData = getFilterData();
    const runes = filterData.runes;
    
}