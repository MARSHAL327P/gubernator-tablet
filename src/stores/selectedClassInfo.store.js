import FilterStore from "../components/Filter/store/filter.store";
import {action, makeAutoObservable, toJS} from "mobx";

class SelectedClassInfoStore{
    list = []
    allClasses = []
    isLoading = false
    currentClass = null

    get filteredCards(){
        return FilterStore.filteredCards()
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
                    this.list = data ?? []
                    this.currentClass.list = this.list
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