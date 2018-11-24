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
        let runeName = event.target.textContent;
        let filterData = getFilterData();
        filterData.removeRune(runeName);
        return;
    }

    // Next filtering strategy (only one)
    if (event.target.classList.contains('next-strategy')) {
        let filterData = getFilterData();
        filterData.nextStrategy();
        return;
    }

    // Toggle which equipment types to display (multiple selection)
    if (event.target.classList.contains('item-toggle')) {
        let itemType = event.target.textContent;
        let filterData = getFilterData();
        filterData.toggleEquipmentType(itemType);
        return;
    }

    // Select socket count (only one)
    if (event.target.classList.contains('socket-count')) {
        let count = Number(event.target.textContent);
        let filterData = getFilterData();
        filterData.setSocketCount(count);
        return;
    }
    
}