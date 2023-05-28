import {action, makeAutoObservable} from "mobx";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
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
            return objectClass.beachList.filter((beach) => {
                return beach
                    .name
                    .toLowerCase()
                    .indexOf(SidebarStore.searchQuery.toLowerCase()) >= 0
            })
        }

        // if( BeachLocalStore.filterInputs ){
        //     this.fetchFilterBeaches()
        // }

        return objectClass.beachList
    }

    fetchFilterBeaches() {
        let sendData = _.cloneDeep(BeachLocalStore.filterInputs)

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

        BeachLocalStore.filterInputs.isLoading = true
        axios.post(process.env.REACT_APP_BEACHES_FILTER, sendData)
            .then(
                action(({data}) => {
                    console.log(data)
                    BeachLocalStore.filterInputs.beachList = data
                })
            )
            .finally(action(() => {
                BeachLocalStore.filterInputs.isLoading = false
            }))
    }

    clearFilter() {
        for (const filterInputKey in BeachLocalStore.filterInputs) {
            let filterInput = BeachLocalStore.filterInputs[filterInputKey]

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
        this.fetchFilterBeaches()
    }

    get numChangedParams() {
        let numChangedParams = 0

        for (const filterInputKey in BeachLocalStore.filterInputs) {
            let filterInput = BeachLocalStore.filterInputs[filterInputKey]

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

    fillFilterInputs() {
        let excludedFilters = ["rating", "price", "workTime"]

        BeachLocalStore.beachList.forEach(beach => {
            for (const filterInputKey in BeachLocalStore.filterInputs) {
                if (excludedFilters.indexOf(filterInputKey) !== -1) continue;

                let beachInputInfo = beach[filterInputKey]
                let filterInput = BeachLocalStore.filterInputs[filterInputKey]
                if (beachInputInfo) {
                    switch (filterInput.type) {
                        case this.filterTypes.selectFromTo.type:

                            if (beachInputInfo > filterInput.to)
                                filterInput.to = beachInputInfo

                            if (beachInputInfo < filterInput.from)
                                filterInput.from = beachInputInfo
                            break;
                        default:
                            if (filterInput.variants.indexOf(beachInputInfo) !== -1)
                                continue;

                            if (typeof beachInputInfo === "object") {
                                for (const item in beachInputInfo) {
                                    if (filterInput.variants.find((variant) => variant.key === item) === undefined)
                                        filterInput.variants.push({
                                            name: beachInputInfo[item].name,
                                            key: item
                                        })
                                }
                            } else {
                                filterInput.variants.push(beachInputInfo)
                            }

                    }
                } else {
                    delete BeachLocalStore.filterInputs[filterInputKey]
                }
            }
        })
    }

    findSelectedItem(inputName, item) {
        return BeachLocalStore.filterInputs[inputName].selected.indexOf(item)
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

        BeachLocalStore.filterInputs[inputName] = inputParams
        this.fetchFilterBeaches()
    }

    setSelectFromToItem(e, inputName) {
        BeachLocalStore.filterInputs[inputName].selected[e.target.name] = e.target.value
        this.fetchFilterBeaches()
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