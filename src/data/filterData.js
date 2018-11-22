class FilterData {

    constructor(){
        this.runes = [];
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

    getPlainObject() {
        return {
            runes: this.runes.concat() // shallow copy
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

