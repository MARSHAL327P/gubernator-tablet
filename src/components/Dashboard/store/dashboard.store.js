import {makeAutoObservable} from "mobx";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import MapStore from "../../Map/store/map.store";

class DashboardStore {
    isOpen = true
    drawerIsOpen = false

    isDashboard(){
        return window.location.pathname !== "/" && window.location.pathname !== "/object"
    }

    toggleOpen(){
        this.isOpen = !this.isOpen
    }

    initDashboardObject(className){
        let currentClass = SelectedClassInfoStore.currentClass

        if( currentClass === null )
            SelectedClassInfoStore.initCurrentClass(className)

        if(
            currentClass !== null &&
            currentClass.list.length > 0 &&
            currentClass.isFetched &&
            currentClass.card
        )
            MapStore.zoomToItem(currentClass.card.coord)
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default DashboardStore = new DashboardStore()