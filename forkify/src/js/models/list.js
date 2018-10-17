import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items = [];
    }

    addItem(count,unit,ingredient){
        const listObj = {
            count,
            ingredient,
            unit,
            id: uniqid()
        }
        this.items.push(listObj);
        return listObj;
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index,1);
    }

    updateItem(id,countUp){
        this.items.find(el => el.id === id).count = countUp;
    }
}