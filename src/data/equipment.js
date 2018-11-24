import RUNEWORDS from '../../db/RunewordList.json'

class EquipmentList {

    constructor() {

        this.types = [];

        // Iterate over data and construct a list of equipment types.
        for (let i=0; i<RUNEWORDS.length; ++i) {

            let runeword = RUNEWORDS[i];
            let items = runeword.items;
            for (var j=0; j<items.length; ++j) {
                 
                let item = items[j];
                if (this.types.indexOf(item) === -1) {
                    this.types.push(item);
                }
            }
        }
    }

    getTypes() {
        return this.types.concat(); // shallow copy
    }


}


export let equipmentList = new EquipmentList();

