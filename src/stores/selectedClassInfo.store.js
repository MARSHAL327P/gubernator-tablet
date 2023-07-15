import FilterStore from "../components/Filter/store/filter.store";
import {action, makeAutoObservable, runInAction} from "mobx";

class SelectedClassInfoStore{
    allClasses = []
    currentClass = null

    get filteredCards(){
        return this.currentClass && this.currentClass.isFetched && !this.currentClass.isLoading ? FilterStore.filteredCards() : []
    }

    get filterInputs() {
        return this.currentClass ? FilterStore.filterInputs(this.currentClass) : {}
    }

    initCurrentClass(currentClass){
        runInAction(() => {
            this.currentClass = currentClass

            if( !this.allClasses.includes(currentClass) ){
                this.currentClass.filteredList = null
                this.allClasses.push(currentClass)
                this.currentClass.fetchInfo()
            }
        })
    }

    fetchInfo(currentClass){
        currentClass.isLoading = true
        currentClass.cardStore
            .get()
            .then(
                action(data => {
                    currentClass.list = data ?? []
                    currentClass.isLoading = false
                    currentClass.isFetched = true
                })
            )
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default SelectedClassInfoStore = new SelectedClassInfoStore()