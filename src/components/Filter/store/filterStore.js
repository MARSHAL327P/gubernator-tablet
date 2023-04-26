import { makeAutoObservable } from "mobx";

class FilterStore {
    isOpen = false

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default FilterStore = new FilterStore()