import {action, makeAutoObservable, observable, toJS} from "mobx";
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
        if (SelectedClassInfoStore.currentClass === null)
            return []

        if (SidebarStore.searchQuery.trim() !== "") {
            return SelectedClassInfoStore.currentClass.list.filter((card) => {
                return card
                    .name
                    .toLowerCase()
                    .indexOf(SidebarStore.searchQuery.toLowerCase()) >= 0
            })
        }

        return this.filteredList ?? SelectedClassInfoStore.currentClass.list
    }

    fetchFilterInputs() {
        SelectedClassInfoStore.isLoading = true

        axios.post(process.env.REACT_APP_BEACHES_FILTER, this.sentFilterInputs)
            .then(
                action(({data}) => {
                    this.filteredList = SelectedClassInfoStore.currentClass.list.filter(card => {
                        return data.includes(card.id)
                    })
                })
            )
            .finally(action(() => {
                SelectedClassInfoStore.isLoading = false
            }))
    }

    clearFilter() {
        for (const filterInputKey in SelectedClassInfoStore.filterInputs) {
            let filterInput = SelectedClassInfoStore.filterInputs[filterInputKey]

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

        // for (const filterInputKey in SelectedClassInfoStore.filterInputs) {
        //     let filterInput = SelectedClassInfoStore.filterInputs[filterInputKey]
        //
        //     switch (filterInput.type) {
        //         case this.filterTypes.selectFromTo.type:
        //             if (filterInput.selected.from  || filterInput.selected.to )
        //                 numChangedParams++
        //             break;
        //         default:
        //             if (filterInput.selected.length > 0)
        //                 numChangedParams++
        //     }
        // }

        return numChangedParams
    }

    getDefaultFilterInputs(currentClass, defaultFilterInputs = currentClass.defaultFilterInputs) {
        currentClass.list.forEach(action(card => {
            for (const filterInputKey in defaultFilterInputs) {
                if (currentClass.excludedFilters.includes(filterInputKey)) continue;

                let cardValue = card[filterInputKey]
                    || (card.indications && card.indications[filterInputKey])
                    || (card.props && card.props[filterInputKey])
                let filterInput = defaultFilterInputs[filterInputKey]

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
                                defaultFilterInputs = {
                                    ...defaultFilterInputs,
                                    [filterInputKey]: {
                                        ...filterInput,
                                        variants: [...filterInput.variants, cardValue]
                                    }
                                }
                            }

                    }
                }

                if (!cardValue && !currentClass.filterGroup) {
                    delete currentClass.defaultFilterInputs[filterInputKey]
                }
            }

        }))

        return defaultFilterInputs
    }

    filterInputs(currentClass) {
        if (currentClass.filterGroup) {
            let filterGroupArray = {}

            Object.entries(currentClass.filterGroup).forEach(([filterSectionName, filterSection]) => {
                filterGroupArray[filterSectionName] = {
                    ...filterSection,
                    defaultFilterInputs: this.getDefaultFilterInputs(currentClass, filterSection.defaultFilterInputs)
                }
            })

            return filterGroupArray
        } else {
            return this.getDefaultFilterInputs(currentClass)
        }
    }

    findSelectedItem(inputName, item) {
        return SelectedClassInfoStore.filterInputs[inputName].selected.indexOf(item)
    }

    setCheckedItems(inputName, inputParams, checkedItems) {
        if (inputParams.type === this.filterTypes.radioBtn.type) {
            inputParams.selected = [checkedItems]
        } else {
            inputParams = {
                ...inputParams,
                selected: checkedItems
            }
        }

        return inputParams
    }

    setSelectFromToItem(inputName, inputParams, e) {
        return {
            ...inputParams,
            selected: {
                ...inputParams.selected,
                [e.target.name]: e.target.value,
            }
        }
    }

    setFilterInputs(inputName, inputParams, inputData){
        let sentInputParams

        switch (inputParams.type){
            case this.filterTypes.selectFromTo.type:
                sentInputParams = this.setSelectFromToItem(inputName, inputParams, inputData)
                break;
            default:
                sentInputParams = this.setCheckedItems(inputName, inputParams, inputData)

                if (sentInputParams.selected.length <= 0)
                    delete this.sentFilterInputs[inputName]
        }

        this.sentFilterInputs[inputName] = sentInputParams
        // SelectedClassInfoStore.filterInputs["BUOY"].defaultFilterInputs[inputName] = inputParams
        console.log(sentInputParams)
        SelectedClassInfoStore.filterInputs[inputName] = sentInputParams
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

    inputHasVariants(filterInput) {
        switch (filterInput.type) {
            case this.filterTypes.selectFromTo.type:
                if (filterInput.from === Infinity || filterInput.to === -Infinity)
                    return false;
                break;
            default:
                if (filterInput.variants.length <= 0)
                    return false;
        }

        return true
    }

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default FilterStore = new FilterStore()