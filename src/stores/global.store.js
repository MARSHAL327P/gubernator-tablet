import { makeAutoObservable } from "mobx";
// import SidebarStore from "../components/Sidebar/store/sidebar.store";
// import BeachLocalStore from "../components/BeachCard/store/beachLocal.store";
// import {createContext, useContext} from "react";

class GlobalStore {
    selectedTabClass = {}
    selectedAdditionalLayer = null
    generateNewHeatmap = true

    constructor() {
        makeAutoObservable(this);
        // this.sidebarStore = new SidebarStore(this)
        // this.beachLocalStore = new BeachLocalStore(this)
        //
        // this.selectedTabClass = this.sidebarStore.tabItems[0]?.data
    }
}

// const StoresContext = createContext(new GlobalStore());
//
// // this will be the function available for the app to connect to the stores
// export const useStores = () => useContext(StoresContext);
export default GlobalStore = new GlobalStore()