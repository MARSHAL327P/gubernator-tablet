import { makeAutoObservable } from "mobx";

class MapStore {
    ymaps = null

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default MapStore = new MapStore()