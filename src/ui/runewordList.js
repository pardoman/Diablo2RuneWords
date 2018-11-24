const Mustache = require('mustache');

// Generate this file by running `npm run create-json`
import RUNEWORDS from '../../db/RunewordList.json'
import TEMPLATE from './runewordList.template.html'
import { getFilterData, getFilteredRunewordIds, registerFilterChange } from '../data/filterData'
import './runewordList.css'

let _runewordsDiv;
let _noRunewordsDiv;
export function initRunewords(div) {
    
    _runewordsDiv = document.createElement('div');
    _runewordsDiv.innerHTML = Mustache.render(TEMPLATE, { runewords: getSortedRunewords() });
    _noRunewordsDiv = _runewordsDiv.querySelector('.no-matches')
    _noRunewordsDiv.style.display = 'none';
    _noRunewordsDiv.querySelector('a').addEventListener('click', toggleStrategy);
    div.appendChild(_runewordsDiv);

    registerFilterChange(filterList);
}

function getSortedRunewords() {
    let sortedList = RUNEWORDS.concat(); // shallow copy
    sortedList.sort(function(aa, bb) {
        return aa.name.localeCompare(bb.name);
    })
    return sortedList;
}

/**
 * Apply filters to the list without rebuilding it.
 */
function filterList() {
    
    const filterData = getFilterData();
    const visibleIds = getFilteredRunewordIds();
    let tableRows = _runewordsDiv.querySelectorAll('tr[user-data-id]');
    let anyVisible = false;

    for (var i=0; i<tableRows.length; ++i) {

        let rowDiv = tableRows[i];
        let id = Number(rowDiv.getAttribute('user-data-id'));
        
        let isVisible = (visibleIds.indexOf(id) !== -1);
        rowDiv.style.display = isVisible ? '' : 'none';

        if (isVisible) {
            anyVisible = true;
            highlightMatchingRunes(rowDiv, filterData.runes);
        }
    }

    // Message for when there are no runewords that match
    // the filter criteria
    _noRunewordsDiv.style.display = anyVisible ? 'none' : '';
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

function toggleStrategy(event) {
    event.preventDefault();
    let filterData = getFilterData();
    filterData.nextStrategy();
}