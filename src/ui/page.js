import { renderRuneList } from './runes'
import { createList } from './runewordList'


export function createPage(div) {

    renderRuneList(div); // Runes available ingame
    createList(div); // Runeword list
}