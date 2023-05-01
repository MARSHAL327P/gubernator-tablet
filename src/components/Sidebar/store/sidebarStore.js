import { makeAutoObservable } from "mobx";

class SidebarStore {
    searchQuery = ""

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default SidebarStore = new SidebarStore()