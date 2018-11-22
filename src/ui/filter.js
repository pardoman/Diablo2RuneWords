import './filter.css'
import TEMPLATE from './filter.template.html'
import { getFilterData, registerFilterChange } from '../data/filterData'
const Mustache = require('mustache')

var _filterDiv;
export function initFilter(div) {

    _filterDiv = document.createElement('div');
    _filterDiv.addEventListener('click', onClick);
    renderFilter();
    div.appendChild(_filterDiv);

    registerFilterChange(renderFilter);
}

function renderFilter() {
    const filterData = getFilterData();
    const plainObject = filterData.getPlainObject();
    _filterDiv.innerHTML = Mustache.render(TEMPLATE, plainObject);
    _filterDiv.className = 'filter';
}

function onClick() {

    // Remove Rune
    if (event.target.classList.contains('rune')) {
        var runeName = event.target.textContent;
        let filterData = getFilterData();
        filterData.removeRune(runeName);
    }

    // Next filtering strategy
    if (event.target.classList.contains('next-strategy')) {
        let filterData = getFilterData();
        filterData.nextStrategy();
    }

    
}