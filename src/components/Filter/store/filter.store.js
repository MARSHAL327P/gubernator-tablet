import {action, makeAutoObservable} from "mobx";
import SidebarStore from "../../Sidebar/store/sidebar.store";
import axios from "axios";
import _ from "lodash";
// import GlobalStore from "../../../stores/global.store";

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

    // filteredBeaches = null

    filteredCards(objectClass) {
        if (SidebarStore.searchQuery.trim() !== "") {
            return objectClass.list.filter((beach) => {
                return beach
                    .name
                    .toLowerCase()
                    .indexOf(SidebarStore.searchQuery.toLowerCase()) >= 0
            })
        }

        // if( SidebarStore.selectedTabClass.filterInputs ){
        //     this.fetchFilterBeaches()
        // }

        return objectClass.list
    }

    fetchFilterInputs() {
        let sendData = _.cloneDeep(SidebarStore.selectedTabClass.filterInputs)

        for (let filterInputKey in sendData) {
            let inputDelete = false

            switch (sendData[filterInputKey].type) {
                case this.filterTypes.selectFromTo.type:
                    inputDelete = sendData[filterInputKey].selected.from === null && sendData[filterInputKey].selected.to === null
                    break;
                default:
                    inputDelete = sendData[filterInputKey].selected.length <= 0
            }

            if (inputDelete) {
                delete sendData[filterInputKey]
            } else {
                delete sendData[filterInputKey].open
                delete sendData[filterInputKey].variants
            }
        }

        SidebarStore.selectedTabClass.isLoading = true
        axios.post(process.env.REACT_APP_BEACHES_FILTER, sendData)
            .then(
                action(({data}) => {
                    console.log(data)
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

        SidebarStore.selectedTabClass.list.forEach(beach => {
            for (const filterInputKey in SidebarStore.selectedTabClass.defaultFilterInputs) {
                if (excludedFilters.indexOf(filterInputKey) !== -1) continue;

                let inputInfo = beach[filterInputKey]
                let filterInput = SidebarStore.selectedTabClass.defaultFilterInputs[filterInputKey]
                if (inputInfo) {
                    switch (filterInput.type) {
                        case this.filterTypes.selectFromTo.type:

                            if (inputInfo > filterInput.to)
                                filterInput.to = inputInfo

                            if (inputInfo < filterInput.from)
                                filterInput.from = inputInfo
                            break;
                        default:
                            if (filterInput.variants.indexOf(inputInfo) !== -1)
                                continue;

                            if (typeof inputInfo === "object") {
                                for (const item in inputInfo) {
                                    if (filterInput.variants.find((variant) => variant.key === item) === undefined)
                                        filterInput.variants.push({
                                            name: inputInfo[item].name,
                                            key: item
                                        })
                                }
                            } else {
                                filterInput.variants.push(inputInfo)
                            }

                    }
                } else {
                    delete SidebarStore.selectedTabClass.defaultFilterInputs[filterInputKey]
                }
            }
        })

        return SidebarStore.selectedTabClass.defaultFilterInputs
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
                inputParams.selected.push(item)
            }
        } else {
            inputParams.selected.splice(findItemIndex, 1)
        }

        this.filterInputs[inputName] = inputParams
        this.fetchFilterInputs()
    }

    setSelectFromToItem(e, inputName) {
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