class FilterData {

    constructor(){
        this.runes = [];
    }

    addRune(name) {
        this.runes.push(name);
        return true;
    }

    removeRune(name) {
        var index = this.runes.indexOf(name);
        if (index >= 0) {
            this.runes.splice(index, 1);
            return true;
        }
        return false;
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