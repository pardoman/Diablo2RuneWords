
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

    getPlainObject() {
        return {
            runes: this.runes.concat(), // shallow copy
            hasRunes: this.runes.length > 0,
            strategy: this.strategy,
            strategy_hint: StrategyHints[this.strategy],
        }
    }
}

let filterData = new FilterData();

/**
 * Returns a plain object for HTML template rendering.
 */
export function getFilterData() {
    return filterData;
}

/**
 * 
 */
let _listeners = [];
export function registerFilterChange(fn) {
    _listeners.push(fn);
}

function onFilterChange() {
    _listeners.forEach( (listener)=>{
        listener();
    })
}

