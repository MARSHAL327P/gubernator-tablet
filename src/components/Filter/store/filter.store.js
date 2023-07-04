import {action, makeAutoObservable, runInAction} from "mobx";
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
        let fastFilter = SelectedClassInfoStore.currentClass.fastFilter
        let filteredList = this.filteredList || SelectedClassInfoStore.currentClass.list

        if (SidebarStore.searchQuery.trim() !== "") {
            filteredList = filteredList.filter((card) => {
                return card
                    .name
                    .toLowerCase()
                    .indexOf(SidebarStore.searchQuery.toLowerCase()) >= 0
            })
        }

        if (fastFilter?.selected.length > 0) {
            for (let fieldName in fastFilter.fields) {
                filteredList = filteredList.filter((card) => {
                    return fastFilter.selected.includes(card[fieldName])
                })
            }
        }

        return filteredList
    }

    fetchFilterInputs() {
        SelectedClassInfoStore.currentClass.isLoading = true

        axios.post(SelectedClassInfoStore.currentClass.filterUrl, this.sentFilterInputs)
            .then(
                action(({data}) => {
                    this.filteredList = SelectedClassInfoStore.currentClass.list.filter(card => {
                        return data.includes(card.id)
                    })
                })
            )
            .finally(action(() => {
                SelectedClassInfoStore.currentClass.isLoading = false
            }))
    }

    clearFilterInputs(filterInputs){
        for (const filterInputKey in filterInputs) {
            let filterInput = filterInputs[filterInputKey]

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
    }

    clearAllFilter() {
        let filterGroup = SelectedClassInfoStore.currentClass?.filterGroup

        if( filterGroup ){
            for (let filterGroupName in filterGroup) {
                this.clearFilterInputs(filterGroup[filterGroupName].defaultFilterInputs)
            }
        } else {
            this.clearFilterInputs(SelectedClassInfoStore.filterInputs)
        }


        this.sentFilterInputs = {}
        this.fetchFilterInputs()
    }

    calculateChangedParams(filterInputs) {
        let numChangedParams = 0

        for (const filterInputKey in filterInputs) {
            let filterInput = filterInputs[filterInputKey]

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

    get numChangedParams() {
        let numChangedParams = 0
        let filterGroup = SelectedClassInfoStore.currentClass?.filterGroup

        if( filterGroup ){
            for (let filterGroupName in filterGroup) {
                numChangedParams += this.calculateChangedParams(filterGroup[filterGroupName].defaultFilterInputs)
            }
        } else {
            numChangedParams = this.calculateChangedParams(SelectedClassInfoStore.filterInputs)
        }

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
                                filterInput.variants = [...filterInput.variants, cardValue]
                            }
                    }
                }

                // if (!cardValue && !currentClass.filterGroup) {
                //     delete currentClass.defaultFilterInputs[filterInputKey]
                // }
            }
        }))

        // currentClass.filterInputs = {...defaultFilterInputs}
        return defaultFilterInputs
    }

    filterInputs(currentClass) {
        if (currentClass.filterGroup) {
            let filterGroup = currentClass.filterGroup

            Object.entries(filterGroup).forEach(([filterSectionName, filterSection]) => {
                runInAction(() => {
                    filterGroup[filterSectionName] = {
                        ...filterSection,
                        defaultFilterInputs: this.getDefaultFilterInputs(currentClass, filterSection.defaultFilterInputs)
                    }
                })
            })

            return filterGroup
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
        if (e.target.value === "")
            e.target.value = null

        return {
            ...inputParams,
            selected: {
                ...inputParams.selected,
                [e.target.name]: e.target.value,
            }
        }
    }

    setFilterInputs(inputName, inputParams, inputData, filterGroupName) {
        let sentInputParams

        switch (inputParams.type) {
            case this.filterTypes.selectFromTo.type:
                sentInputParams = this.setSelectFromToItem(inputName, inputParams, inputData)

                if (!sentInputParams.selected.from && !sentInputParams.selected.to)
                    delete this.sentFilterInputs[inputName]
                break;
            default:
                sentInputParams = this.setCheckedItems(inputName, inputParams, inputData)

                if (sentInputParams.selected.length <= 0)
                    delete this.sentFilterInputs[inputName]
        }

        if (SelectedClassInfoStore.currentClass.filterGroup) {
            SelectedClassInfoStore.filterInputs[filterGroupName].defaultFilterInputs[inputName] = sentInputParams
            this.sentFilterInputs[filterGroupName] = {
                [inputName]: {...sentInputParams}
            }
        } else {
            SelectedClassInfoStore.filterInputs[inputName] = sentInputParams
            this.sentFilterInputs[inputName] = sentInputParams
        }

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

    get fastFilter() {
        let fastFilter = SelectedClassInfoStore.currentClass.fastFilter

        if (fastFilter && SelectedClassInfoStore.currentClass.list.length > 0) {
            for (let fieldName in fastFilter.fields) {
                SelectedClassInfoStore.currentClass.list.forEach((card) => {
                    if (!fastFilter.fields[fieldName].includes(card[fieldName]))
                        fastFilter.fields[fieldName].push(card[fieldName])
                })
            }
        }

        return fastFilter
    }

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default FilterStore = new FilterStore()