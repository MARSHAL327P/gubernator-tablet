import { makeAutoObservable } from "mobx";

class FilterStore {
    isOpen = false
    width = 0

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default FilterStore = new FilterStore()