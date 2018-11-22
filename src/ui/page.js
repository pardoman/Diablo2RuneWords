import './page.css'
import { initRunes } from './runes'
import { initFilter } from './filter'
import { initRunewords } from './runewordList'

export function createPage(div) {

    initRunes(div);
    initFilter(div);
    initRunewords(div);
}