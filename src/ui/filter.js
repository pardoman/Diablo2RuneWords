import './filter.css'
import TEMPLATE from './filter.template.html'
import { getFilterData } from '../data/filterData'
const Mustache = require('mustache')

export function renderFilter(div) {

    const filterData = getFilterData();
    const plainObject = filterData.getPlainObject();

    var filterDiv = document.createElement('div');
    filterDiv.innerHTML = Mustache.render(TEMPLATE, plainObject );
    filterDiv.className = 'filter';
    div.appendChild(filterDiv);
}