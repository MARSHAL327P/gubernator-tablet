import { makeAutoObservable } from "mobx";

class SidebarStore {
    searchQuery = ""
    selectedTabClass = null
    tabItems = []

    constructor() {
        makeAutoObservable(this);

        // this.tabItems = [
        //     {
        //         title: "Пляжи",
        //         loadingText: "Загрузка пляжей",
        //         data: BeachLocalStore,
        //         component: BeachCard,
        //     },
        //     {
        //         title: "Объекты",
        //         loadingText: "Загрузка объектов",
        //         data: BeachLocalStore,
        //         component: BeachCard,
        //     },
        //     {
        //         title: "Архитектура",
        //         loadingText: "Загрузка архитектуры",
        //         data: BeachLocalStore,
        //         component: BeachCard,
        //     },
        // ]
    }
}

export default SidebarStore = new SidebarStore()