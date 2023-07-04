import {makeAutoObservable} from "mobx";

class DashboardStore {
    isOpen = true

    isDashboard(){
        console.log(window.location.pathname)
        console.log(window.location.pathname !== "/" && window.location.pathname !== "/object")
        return window.location.pathname !== "/" && window.location.pathname !== "/object"
    }

    toggleOpen(){
        this.isOpen = !this.isOpen
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default DashboardStore = new DashboardStore()