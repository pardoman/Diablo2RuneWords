const Mustache = require('mustache');

// Generate this file by running `npm run create-json`
import RUNEWORDS from '../../db/RunewordList.json'
import TEMPLATE from './runewordEntry.template.html'
import { getFilterData, registerFilterChange, FilterStrategies } from '../data/filterData'

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
    let  tableRows = _runewordsDiv.querySelectorAll('tr[user-data-id]');
    const strategy = filterData.strategy;

    for (var i=0; i<tableRows.length; ++i) {

        let rowDiv = tableRows[i];
        let isVisible = getVisibility(filterData, rowDiv);
        rowDiv.style.display = isVisible ? '' : 'none';

        if (isVisible) {
            highlightMatchingRunes(rowDiv, filterData.runes);
        }
    }
}

function getVisibility(filterData, rowDiv) {

    // shortcircuit when there are no runes in the filter
    if (filterData.runes.length === 0) {
        return true;
    }

    let id = Number(rowDiv.getAttribute('user-data-id'));
    let runeword = RUNEWORDS[id];
    return satisfiesFilter(runeword.runes, filterData);
}

function satisfiesFilter(runewordRunes, filterData) {

    const runes = filterData.runes;
    const strategy = filterData.strategy;
    
    if (strategy === FilterStrategies.ANY) {
        // returns TRUE if at least one of the filterData.runes
        // is present in the runeword.
        // This is the user case for  "I have these few runes,
        // which runeswords can I eventually make with them?"
        for (let i=0; i<runes.length; ++i) {
            if (runewordRunes.indexOf(runes[i]) !== -1) {
                return true;
            }
        }
        return false;
    }

    if (strategy === FilterStrategies.INVENTORY) {
        // returns TRUE when all the runeword-runes are present 
        // in filterData.runes
        // This is the user case for "these are all the runes I
        // have in my possesion (inventory), what can I make with them?"
        for (let i=0; i<runewordRunes.length; ++i) {
            if (runes.indexOf( runewordRunes[i] ) === -1) {
                return false;
            }
        }
        return true;
    }

    throw new Error('Developer error: Unknown strategy.');
}

function highlightMatchingRunes(rowDiv, runes) {
    let divs = rowDiv.querySelectorAll('.rune');
    for (var i=0; i<divs.length; ++i) {
        let runeDiv = divs[i];
        let rune = runeDiv.innerText;
        if (runes.indexOf(rune) >= 0) {
            runeDiv.classList.add('rune-matches');
        } else {
            runeDiv.classList.remove('rune-matches');
        }
    }
}

function removeRuneHighlight(rowDiv) {
    let divs = rowDiv.querySelectorAll('.rune');
    for (var i=0; i<divs.length; ++i) {
        let runeDiv = divs[i];
        runeDiv.classList.remove('rune-matches');
    }
}

