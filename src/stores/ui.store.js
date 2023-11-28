import {makeAutoObservable} from "mobx";

class UiStore {
    animationDelay = 75
    transitionOpacity = {
        enter: "transition-opacity duration-75",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "transition-opacity duration-150",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
    }
    transitionTransformY = {
        enter: "transition duration-75",
        enterFrom: "opacity-0 translate-y-0",
        enterTo: "opacity-100 -translate-y-10",
        leave: "transition duration-150",
        leaveFrom: "opacity-100 -translate-y-10",
        leaveTo: "opacity-0 translate-y-0",
    }
    cardWrapperClasses = "grid grid-cols-card gap-10 lg:gap-5"
    cardItemClasses = "bg-white rounded-xl sm:rounded-none shadow-lg border-solid border sm:border-y sm:border-x-0 border-gray-200"

    constructor() {
        makeAutoObservable(this)
    }
}

export default UiStore = new UiStore()