import {makeAutoObservable} from "mobx";

class DashboardStore {
    isOpen = true

    isDashboard(){
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