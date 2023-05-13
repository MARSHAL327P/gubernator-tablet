import { action, makeAutoObservable } from "mobx";
import BeachLocalStore from "../../BeachCard/store/beachLocalStore";
import SidebarStore from "../../Sidebar/store/sidebarStore";
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
    filterInputs = {
        rating: {
            name: "Рейтинг пляжа",
            ...this.filterTypes.radioBtn,
            variants: [{
                key: "4",
                name: "Больше 4"
            }, {
                key: "4.5",
                name: "Больше 4.5"
            }],
        },
        beachType: {
            name: "Тип пляжа",
            ...this.filterTypes.checkbox
        },
        beachCoverage: {
            name: "Покрытие пляжа",
            ...this.filterTypes.checkbox
        },
        price: {
            name: "Стоимость",
            ...this.filterTypes.checkbox,
            variants: ["Бесплатный", "Платный"],
        },
        workTime: {
            name: "Режим работы",
            ...this.filterTypes.checkbox,
            variants: ["Круглосуточно", "Не круглосуточно"],

        },
        waterTemp: {
            name: "Температура воды",
            ...this.filterTypes.selectFromTo
        },
        props: {
            name: "Дополнительные параметры",
            ...this.filterTypes.checkbox
        },
        wind: {
            name: "Скорость ветра",
            ...this.filterTypes.selectFromTo
        },
    }
    // filteredBeaches = null

    get filteredBeaches() {
        if (SidebarStore.searchQuery.trim() !== "") {
            return BeachLocalStore.beachList.filter((beach) => {
                return beach
                    .name
                    .toLowerCase()
                    .indexOf(SidebarStore.searchQuery.toLowerCase()) >= 0
            })
        }

        // if( this.filterInputs ){
        //     this.fetchFilterBeaches()
        // }

        return BeachLocalStore.beachList
    }

    fetchFilterBeaches(){
        let sendData = _.cloneDeep(this.filterInputs)

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

        BeachLocalStore.isLoading = true
        axios.post(process.env.REACT_APP_BEACHES_FILTER, sendData)
            .then(
                action(({ data }) => {
                    console.log(data)
                    BeachLocalStore.beachList = data
                })
            )
            .finally(action(() => {
                BeachLocalStore.isLoading = false
            }))
    }

    clearFilter(){
        for (const filterInputKey in this.filterInputs) {
            let filterInput = this.filterInputs[filterInputKey]

            switch (filterInput.type){
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

    get filterIsChanged(){
        for (const filterInputKey in this.filterInputs) {
            let filterInput = this.filterInputs[filterInputKey]

            switch (filterInput.type){
                case this.filterTypes.selectFromTo.type:
                    if( filterInput.selected.from !== null || filterInput.selected.to !== null )
                        return true;
                    break;
                default:
                    if (filterInput.selected.length > 0)
                        return true;
            }
        }

        return false
    }

    fillFilterInputs() {
        let excludedFilters = ["rating", "price", "workTime"]

        BeachLocalStore.beachList.forEach(beach => {
            for (const filterInputKey in this.filterInputs) {
                if (excludedFilters.indexOf(filterInputKey) !== -1) continue;

                let beachInputInfo = beach[filterInputKey]
                let filterInput = this.filterInputs[filterInputKey]
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
                    delete this.filterInputs[filterInputKey]
                }
            }
        })
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
        this.fetchFilterBeaches()
    }

    setSelectFromToItem(e, inputName) {
        this.filterInputs[inputName].selected[e.target.name] = e.target.value
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