import {makeAutoObservable} from "mobx";

class UiStore{
    animationDelay = 75

    constructor() {
        makeAutoObservable(this)
    }
}

export default UiStore = new UiStore()