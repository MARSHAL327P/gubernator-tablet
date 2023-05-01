import { makeAutoObservable } from "mobx";

class SidebarStore {
    isOpen = true
    topOffset = 0
    searchQuery = ""

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default SidebarStore = new SidebarStore()