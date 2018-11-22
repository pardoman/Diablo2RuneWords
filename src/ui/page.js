import './page.css'
import { initRunes } from './runes'
import { initFilter } from './filter'
import { createList } from './runewordList'

export function createPage(div) {

    initRunes(div);
    initFilter(div);
    createList(div);
}