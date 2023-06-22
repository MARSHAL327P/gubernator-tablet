import {action, makeAutoObservable, toJS} from "mobx";
import SidebarStore from "../../Sidebar/store/sidebar.store";
import axios from "axios";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

class FilterStore {
    isOpen = false
    filterTypes = {
        select: {
            variants: [],
            type: "select",
            open: true,
            selected: [],
        },
        checkbox: {
            variants: [],
            type: "checkbox",
            open: true,
            selected: [],
        },
        selectFromTo: {
            from: Infinity,
            to: -Infinity,
            type: "selectFromTo",
            open: true,
            selected: {
                from: null,
                to: null,
            },
        },
        radioBtn: {
            variants: [],
            type: "radioBtn",
            open: true,
            selected: [],
        },
    }
    sentFilterInputs = {}
    filteredList = null

    filteredCards() {
        if (SidebarStore.searchQuery.trim() !== "") {
            return SelectedClassInfoStore.list.filter((card) => {
                return card
                    .name
                    .toLowerCase()
                    .indexOf(SidebarStore.searchQuery.toLowerCase()) >= 0
            })
        }

        return this.filteredList ?? SelectedClassInfoStore.list
    }

    fetchFilterInputs() {
        SelectedClassInfoStore.isLoading = true

        axios.post(process.env.REACT_APP_BEACHES_FILTER, this.sentFilterInputs)
            .then(
                action(({data}) => {
                    this.filteredList = SelectedClassInfoStore.list.filter(card => {
                        return data.includes(card.id)
                    })
                })
            )
            .finally(action(() => {
                SelectedClassInfoStore.isLoading = false
            }))
    }

    clearFilter() {
        for (const filterInputKey in this.filterInputs) {
            let filterInput = this.filterInputs[filterInputKey]

            switch (filterInput.type) {
                case this.filterTypes.selectFromTo.type:
                    filterInput.selected = {
                        from: null,
                        to: null,
                    }
                    break;
                default:
                    filterInput.selected = []
            }
        }

        this.sentFilterInputs = {}
        this.fetchFilterInputs()
    }

    get numChangedParams() {
        let numChangedParams = 0

        for (const filterInputKey in this.filterInputs) {
            let filterInput = this.filterInputs[filterInputKey]

            switch (filterInput.type) {
                case this.filterTypes.selectFromTo.type:
                    if (filterInput.selected.from  || filterInput.selected.to )
                        numChangedParams++
                    break;
                default:
                    if (filterInput.selected.length > 0)
                        numChangedParams++
            }
        }

        return numChangedParams
    }

    get filterInputs() {
        if( SelectedClassInfoStore.currentClass === null ) return null

        let excludedFilters = ["rating", "price", "workTime"]
        let tabClass = SelectedClassInfoStore.currentClass

        SelectedClassInfoStore.list.forEach(action(card => {
            for (const filterInputKey in tabClass.defaultFilterInputs) {
                if (excludedFilters.indexOf(filterInputKey) !== -1) continue;

                let cardValue = card[filterInputKey]
                let filterInput = tabClass.defaultFilterInputs[filterInputKey]

                if (cardValue) {
                    switch (filterInput.type) {
                        case this.filterTypes.selectFromTo.type:
                            if (cardValue > filterInput.to)
                                filterInput.to = cardValue

                            if (cardValue < filterInput.from)
                                filterInput.from = cardValue
                            break;
                        default:
                            if (filterInput.variants.indexOf(cardValue) !== -1)
                                continue;

                            if (typeof cardValue === "object") {
                                for (const item in cardValue) {
                                    if (!filterInput.variants.find((variant) => variant.key === item))
                                        filterInput.variants.push({
                                            name: cardValue[item].name,
                                            key: item
                                        })
                                }
                            } else {
                                tabClass.defaultFilterInputs = {
                                    ...tabClass.defaultFilterInputs,
                                    [filterInputKey]: {
                                        ...filterInput,
                                        variants: [...filterInput.variants, cardValue]
                                    }
                                }
                            }

                    }
                } else {
                    delete tabClass.defaultFilterInputs[filterInputKey]
                }
            }

        }))

        return tabClass.defaultFilterInputs
    }

    findSelectedItem(inputName, item) {
        return this.filterInputs[inputName].selected.indexOf(item)
    }

    setCheckedItems(checkedItems, inputName, inputParams) {
        if (inputParams.type === this.filterTypes.radioBtn.type) {
            inputParams.selected = [checkedItems]
        } else {
            inputParams = {
                ...inputParams,
                selected: checkedItems
            }
        }

        this.sentFilterInputs[inputName] = inputParams

        if( inputParams.selected.length <= 0 )
            delete this.sentFilterInputs[inputName]

        this.filterInputs[inputName] = inputParams
        this.fetchFilterInputs()
    }

    setSelectFromToItem(e, inputName, inputParams) {
        inputParams = {
            ...inputParams,
            selected: {
                ...inputParams.selected,
                [e.target.name]: e.target.value,
            }
        }

        this.sentFilterInputs[inputName] = inputParams
        this.filterInputs[inputName] = inputParams
        // console.log(toJS(this.filterInputs))
        this.fetchFilterInputs()
    }

    getInputAttr(inputName, item) {
        let id = inputName
        let label = item
        let sendData = label

        if (typeof item === "object") {
            id = item.key
            label = item.name
            sendData = id
        }

        return {
            id, label, sendData
        }
    }

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default FilterStore = new FilterStore()