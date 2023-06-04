import {action, makeAutoObservable, toJS} from "mobx";
import SidebarStore from "../../Sidebar/store/sidebar.store";
import axios from "axios";
import _ from "lodash";

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

    // filteredBeaches = null

    filteredCards() {
        if( !SidebarStore.selectedTabClass )
            return []

        if (SidebarStore.searchQuery.trim() !== "") {
            return SidebarStore.selectedTabClass.list.filter((card) => {
                return card
                    .name
                    .toLowerCase()
                    .indexOf(SidebarStore.searchQuery.toLowerCase()) >= 0
            })
        }

        // return this.fetchFilterInputs()

        return SidebarStore.selectedTabClass.list
    }

    fetchFilterInputs() {

        // let sendData = _.cloneDeep(this.filterInputs)
        //
        // for (let filterInputKey in sendData) {
        //     let inputDelete = false
        //
        //     switch (sendData[filterInputKey].type) {
        //         case this.filterTypes.selectFromTo.type:
        //             inputDelete = sendData[filterInputKey].selected.from === null && sendData[filterInputKey].selected.to === null
        //             break;
        //         default:
        //             inputDelete = sendData[filterInputKey].selected.length <= 0
        //     }
        //
        //     if (inputDelete) {
        //         delete sendData[filterInputKey]
        //     } else {
        //         delete sendData[filterInputKey].open
        //         delete sendData[filterInputKey].variants
        //     }
        // }

        console.log(toJS(this.sentFilterInputs))

        SidebarStore.selectedTabClass.isLoading = true

        axios.post(process.env.REACT_APP_BEACHES_FILTER, this.sentFilterInputs)
            .then(
                action(({data}) => {
                    SidebarStore.selectedTabClass.list = data
                })
            )
            .finally(action(() => {
                SidebarStore.selectedTabClass.isLoading = false
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
                    if (filterInput.selected.from !== null || filterInput.selected.to !== null)
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
        if( SidebarStore.selectedTabClass === null ) return null

        let excludedFilters = ["rating", "price", "workTime"]
        let tabClass = SidebarStore.selectedTabClass

        tabClass.list.forEach(action(card => {
            // debugger;
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

    setCheckedItems(item, inputName, inputParams) {
        let findItemIndex = this.findSelectedItem(inputName, item)

        if (findItemIndex === -1) {
            if (inputParams.type === this.filterTypes.radioBtn.type) {
                inputParams.selected = [item]
            } else {
                inputParams = {
                    ...inputParams,
                    selected: [...inputParams.selected, item]
                }
            }

            this.sentFilterInputs[inputName] = inputParams
        } else {
            inputParams.selected.splice(findItemIndex, 1)

            if( inputParams.selected.length <= 0 )
                delete this.sentFilterInputs[inputName]
        }

        this.filterInputs[inputName] = inputParams
        this.fetchFilterInputs()
    }

    setSelectFromToItem(e, inputName) {
        console.log(this.filterInputs[inputName])
        this.filterInputs[inputName].selected[e.target.name] = e.target.value
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