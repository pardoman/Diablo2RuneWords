import './footer.css'
import TEMPLATE from './footer.template.html'
const Mustache = require('mustache')

export function initFooter(div) {

    let footerDiv = document.createElement('div');
    footerDiv.className = 'footer';
    footerDiv.innerHTML = Mustache.render(TEMPLATE, {});
    div.appendChild(footerDiv);
}
