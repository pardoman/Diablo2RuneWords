import './page.css'
import { initRunes } from './runes'
import { initFilter } from './filter'
import { initRunewords } from './runewordList'
import { initFooter } from './footer'

export function createPage(div) {

    initRunes(div);
    initFilter(div);
    initRunewords(div);
    initFooter(div);
}