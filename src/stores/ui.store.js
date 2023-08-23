import {makeAutoObservable} from "mobx";

class UiStore{
    animationDelay = 75
    transitionOpacity = {
        enter: "transition-opacity duration-75",
        enterFrom:"opacity-0",
        enterTo:"opacity-100",
        leave:"transition-opacity duration-150",
        leaveFrom:"opacity-100",
        leaveTo:"opacity-0",
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default UiStore = new UiStore()