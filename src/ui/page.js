import { renderRuneList } from './runes'
import { createList } from './runewordList'


export function createPage(div) {

    // Runes available ingame
    var runestDiv = document.createElement('div');
    renderRuneList(runestDiv);
    div.appendChild(runestDiv);
    

    // Runeword list
    var runewordListDiv = document.createElement('div');
    createList(runewordListDiv);
    div.appendChild(runewordListDiv);
}