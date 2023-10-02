import {action, makeAutoObservable, runInAction} from "mobx";
import SidebarStore from "../../Sidebar/store/sidebar.store";
import axios from "axios";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import toast from "react-hot-toast";

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

    filteredCards() {
        let fastFilter = SelectedClassInfoStore.currentClass.fastFilter
        let filteredList = SelectedClassInfoStore.currentClass.filteredList || SelectedClassInfoStore.currentClass.list

        if (SidebarStore.searchQuery.trim() !== "") {
            filteredList = filteredList.filter((card) => {
                return card
                    .name
                    .toLowerCase()
                    .indexOf(SidebarStore.searchQuery.trim().toLowerCase()) >= 0
            })
        }

        if (fastFilter?.selected.length > 0) {
            // let resultFilteredList = []

            for (let fieldName in fastFilter.fields) {
                let fastFilterFilteredList = filteredList.filter((card) => {
                    return fastFilter.selected.includes(card[fieldName])
                })

                if (fastFilterFilteredList.length > 0)
                    filteredList = fastFilterFilteredList

                // resultFilteredList = [...resultFilteredList, ...fastFilterFilteredList]
            }

            // filteredList = resultFilteredList
        }

        return filteredList
    }

    fetchFilterInputs() {
        this.activeRequest && this.activeRequest.abort();
        let request = this.activeRequest = new AbortController();

        SelectedClassInfoStore.currentClass.isLoading = true

        return axios({
            method: 'post',
            url: SelectedClassInfoStore.currentClass.filterUrl,
            data: this.sentFilterInputs,
            signal: request.signal
        })
            .then(
                action(({data}) => {
                    SelectedClassInfoStore.currentClass.filteredList = SelectedClassInfoStore.currentClass.list.filter(card => {
                        return data.includes(card.id)
                    })
                    SelectedClassInfoStore.currentClass.isLoading = false
                })
            )
            .catch((data) => {
                if( data.message !== "canceled" ){
                    toast.error('При отправке произошла ошибка');
                    SelectedClassInfoStore.currentClass.isLoading = false
                }
            })
    }

    clearFilterInputs(filterInputs) {
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

        if (filterGroup) {
            for (let filterGroupName in filterGroup) {
                this.clearFilterInputs(filterGroup[filterGroupName].defaultFilterInputs)
            }
        } else {
            this.clearFilterInputs(SelectedClassInfoStore.filterInputs)
        }

        SelectedClassInfoStore.currentClass.filteredList = null
        // this.sentFilterInputs = {}
        // this.fetchFilterInputs()
    }

    calculateChangedParams(filterInputs) {
        let numChangedParams = 0

        for (const filterInputKey in filterInputs) {
            let filterInput = filterInputs[filterInputKey]

            switch (filterInput.type) {
                case this.filterTypes.selectFromTo.type:
                    if (filterInput.selected.from || filterInput.selected.to)
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

        if (filterGroup) {
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

                cardValue = cardValue?.value ? cardValue.value : cardValue

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
        switch (inputParams.type) {
            case this.filterTypes.radioBtn.type:
                inputParams.selected = checkedItems.isChecked ? [] : [checkedItems.value]
                break;
            default:
                inputParams.selected = checkedItems.isChecked ?
                    inputParams.selected.filter(item => item !== checkedItems.value) :
                    [...inputParams.selected, checkedItems.value]
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

        if (window.outerWidth > 1024) {
            this.fetchFilterInputs()
        } else {
            toast.promise(this.fetchFilterInputs(), {
                loading: "Отправка...",
                success: action(() => {
                    return `Найдено ${SelectedClassInfoStore.filteredCards.length} из ${SelectedClassInfoStore.currentClass.list.length}`
                })
            })
        }
    }

    getInputAttr(inputName, item) {
        let id = inputName
        let label = item
        let inputValue = label

        if (typeof item === "object") {
            id = item.key
            label = item.name
            inputValue = id
        }

        return {
            id, label, inputValue
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

    constructor() {
        makeAutoObservable(this);
    }
}

export default FilterStore = new FilterStore()