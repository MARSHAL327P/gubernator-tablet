import FilterStore from "../components/Filter/store/filter.store";
import {action, makeAutoObservable, runInAction} from "mobx";

class SelectedClassInfoStore{
    allClasses = []
    currentClass = null

    get filteredCards(){
        return this.currentClass && !this.currentClass.isLoading ? FilterStore.filteredCards() : []
    }

    get filterInputs() {
        return this.currentClass && !this.currentClass.isLoading ? FilterStore.filterInputs(this.currentClass) : {}
    }

    initCurrentClass(currentClass){
        runInAction(() => {
            this.currentClass = currentClass

            if( !this.allClasses.includes(currentClass) ){
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
                })
            )
            .finally(action(() => {
                currentClass.isLoading = false
            }));
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default SelectedClassInfoStore = new SelectedClassInfoStore()