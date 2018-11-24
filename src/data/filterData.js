import RUNEWORDS from '../../db/RunewordList.json'
import { equipmentList } from './equipment'


export const FilterStrategies = {
    ANY: 'any',
    INVENTORY: 'inventory',
}

const StrategyHints = {};
StrategyHints[ FilterStrategies.ANY ] = 'Displays runewords that contain at least 1 rune in the filter.';
StrategyHints[ FilterStrategies.INVENTORY ] = 'Displays runeswords where all runes match the filter.';

class FilterData {

    constructor(){
        this.runes = [];
        this.equipmentTypes = [];
        this.strategy = FilterStrategies.ANY;
    }

    addRune(name) {
        var index = this.runes.indexOf(name);
        if (index === -1) {
            this.runes.push(name);
            onFilterChange(this);
        }
    }

    removeRune(name) {
        var index = this.runes.indexOf(name);
        if (index >= 0) {
            this.runes.splice(index, 1);
            onFilterChange(this);
        }
    }

    toggleRune(name) {
        var index = this.runes.indexOf(name);
        if (index === -1) {
            this.runes.push(name);
        } else {
            this.runes.splice(index, 1);
        }
        onFilterChange(this);
    }

    toggleEquipmentType(item) {
        var index = this.equipmentTypes.indexOf(item);
        if (index === -1) {
            this.equipmentTypes.push(item);
        } else {
            this.equipmentTypes.splice(index, 1);
        }
        onFilterChange(this);
    }

    nextStrategy() {
        const currStrategy = this.strategy;
        switch (currStrategy) {
            case FilterStrategies.ANY:
                this.strategy = FilterStrategies.INVENTORY;
                break;

            case FilterStrategies.INVENTORY:
                this.strategy = FilterStrategies.ANY;
                break;

            default:
                throw new Error('Developer error: Unknown Strategy');
        }
        onFilterChange(this);
    }

    getEquipmentState() {
        const types = equipmentList.getTypes();
        return types.map( (itemType)=>{
            return {
                name: itemType,
                is_active: (this.equipmentTypes.indexOf(itemType) !== -1),
            }
        });
    }

    getPlainObject() {
        return {
            runes: this.runes.concat(), // shallow copy
            has_runes: this.runes.length > 0,
            strategy: this.strategy,
            strategy_hint: StrategyHints[this.strategy],
            equipment_toggle: this.getEquipmentState(),
        }
    }
}

let filterData = new FilterData();
updateFilteredRunewords(filterData);


/**
 * Returns a plain object for HTML template rendering.
 */
export function getFilterData() {
    return filterData;
}


let _filteredRunewordIds = [];
export function getFilteredRunewordIds() {
    return _filteredRunewordIds;
}

/**
 * 
 */
let _callbacks = [];
export function registerFilterChange(fn) {
    _callbacks.push(fn);
}

function onFilterChange(filterData) {

    // Update list of runword ids that fullfil the filter criteria
    updateFilteredRunewords(filterData);

    _callbacks.forEach( (callback)=>{
        callback();
    })
}


function updateFilteredRunewords(filterData) {

    _filteredRunewordIds = [];

    for (let i=0; i<RUNEWORDS.length; ++i) {

        let runeword = RUNEWORDS[i];
        if (satisfiesFilter(runeword, filterData)) {
            _filteredRunewordIds.push(runeword.id);
        }
    }
}

function satisfiesFilter(runeword, filterData) {

    if (!satisfiesStrategy(runeword, filterData)) {
        return false;
    }

    if (!satisfiesEquipmentType(runeword, filterData)) {
        return false;
    }

    return true;
}

function satisfiesStrategy(runeword, filterData) {

    if (filterData.runes.length === 0) {
        return true;
    }

    const runes = filterData.runes;
    const strategy = filterData.strategy;
    const runewordRunes = runeword.runes;
    
    if (strategy === FilterStrategies.ANY) {
        // returns TRUE if at least one of the filterData.runes
        // is present in the runeword.
        // This is the user case for  "I have these few runes,
        // which runeswords can I eventually make with them?"
        for (let i=0; i<runes.length; ++i) {
            if (runewordRunes.indexOf(runes[i]) !== -1) {
                return true;
            }
        }
        return false;
    }

    if (strategy === FilterStrategies.INVENTORY) {
        // returns TRUE when all the runeword-runes are present 
        // in filterData.runes
        // This is the user case for "these are all the runes I
        // have in my possesion (inventory), what can I make with them?"
        for (let i=0; i<runewordRunes.length; ++i) {
            if (runes.indexOf( runewordRunes[i] ) === -1) {
                return false;
            }
        }
        return true;
    }

    throw new Error('Developer error: Unknown strategy.');
}

function satisfiesEquipmentType(runeword, filterData) {

    if (filterData.equipmentTypes.length === 0) {
        return true;
    }

    const filteredTypes = filterData.equipmentTypes;
    const items = runeword.items;

    // Runeword item needs to match at least one of the
    // selected equipement types.
    for (var i=0; i<items.length; ++i) {

        var found = false;
        if (filteredTypes.indexOf(items[i]) !== -1) {
            return true;
        }
    }

    return false;
}