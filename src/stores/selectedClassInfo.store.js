import FilterStore from "../components/Filter/store/filter.store";
import {action, makeAutoObservable} from "mobx";

class SelectedClassInfoStore{
    allClasses = []
    isLoading = false
    currentClass = null

    get filteredCards(){
        return FilterStore.filteredCards()
    }

    initCurrentClass(currentClass){
        this.currentClass = currentClass
        this.allClasses.push(currentClass)
        this.fetchInfo()
    }

    // set currentClass(currentClass){
    //     this._currentClass = currentClass
    //
    //     if( !this.allClasses.includes(currentClass) )
    //         this.allClasses.push(currentClass)
    // }
    //
    // get currentClass(){
    //     return this._currentClass
    // }

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