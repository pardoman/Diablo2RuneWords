import './page.css'
import { renderRuneList } from './runes'
import { renderFilter } from './filter'
import { createList } from './runewordList'

export function createPage(div) {

    renderRuneList(div);
    renderFilter(div);
    createList(div);
}