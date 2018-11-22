import './filter.css'
import TEMPLATE from './filter.template.html'
import { getFilterData, registerFilterChange } from '../data/filterData'
const Mustache = require('mustache')

var _filterDiv;
export function initFilter(div) {

    _filterDiv = document.createElement('div');
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
