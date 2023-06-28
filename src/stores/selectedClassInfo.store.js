import FilterStore from "../components/Filter/store/filter.store";
import {action, computed, makeAutoObservable, observable, runInAction} from "mobx";

class SelectedClassInfoStore{
    allClasses = []
    isLoading = false
    currentClass = null

    get filteredCards(){
        return FilterStore.filteredCards()
    }

    get filterInputs() {
        return this.currentClass ? FilterStore.filterInputs(this.currentClass) : {}
    }

    initCurrentClass(currentClass){
        runInAction(() => {
            this.currentClass = currentClass

            if( !this.allClasses.includes(currentClass) ){
                this.allClasses.push(currentClass)
                this.fetchInfo()
            }
        })
    }

    fetchInfo(){
        this.isLoading = true
        this.currentClass.cardStore
            .get()
            .then(
                action(data => {
                    this.currentClass.list = data ?? []
                })
            )
            .finally(action(() => {
                this.isLoading = false
            }));
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default SelectedClassInfoStore = new SelectedClassInfoStore()