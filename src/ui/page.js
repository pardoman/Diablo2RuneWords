import { createList } from './runewordList'


export function createPage(div) {

    // Runelist
    var runeListDiv = document.createElement('div');
    createList(runeListDiv);
    div.appendChild(runeListDiv);
}