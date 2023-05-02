import { makeAutoObservable, toJS } from "mobx";
import BeachLocalStore from "../../BeachCard/store/beachLocalStore";
import { ReactComponent as Star } from "../../../assets/icons/Star.svg";
import sidebarStore from "../../Sidebar/store/sidebarStore";

class FilterStore {
    isOpen = true
    width = 0
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
            to: 0,
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
        rating: {
            name: "Рейтинг пляжа",
            icon: <Star/>,
            ...this.filterTypes.radioBtn,
            variants: ["Больше 4", "Больше 4.5"],
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
    filterInputsKeys = Object.keys(this.filterInputs)

    get filteredBeaches() {
        if (sidebarStore.searchQuery.trim() !== "") {
            return BeachLocalStore.beachList.filter((beach) => {
                // this.filterInputsKeys.forEach(filterInputKey => {
                //     let beachInputInfo = beach[filterInputKey]
                //     let filterInput = this.filterInputs[filterInputKey]
                //
                //     switch (filterInput.type){
                //         case this.filterTypes.selectFromTo.type:
                //             return false
                //         default:
                //             if( filterInput.selected.indexOf(beachInputInfo) === -1 )
                //                 return false
                //
                //
                //             return false
                //     }
                //
                // })
                return beach
                    .name
                    .toLowerCase()
                    .indexOf(sidebarStore.searchQuery.toLowerCase()) >= 0
            })
        }

        return BeachLocalStore.beachList
    }

    clearFilter(){
        Object.keys(this.filterInputs).forEach(filterInputKey => {
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
        })
    }

    fillFilterInputs(){
        let excludedFilters = ["rating", "price", "workTime"]

        BeachLocalStore.beachList.forEach(beach => {
            this.filterInputsKeys.forEach(filterInputKey => {
                let beachInputInfo = beach[filterInputKey]
                let filterInput = this.filterInputs[filterInputKey]

                if (beachInputInfo && excludedFilters.indexOf(filterInputKey) === -1) {
                    switch (filterInput.type) {
                        case this.filterTypes.selectFromTo.type:
                            if (beachInputInfo > filterInput.to)
                                filterInput.to = beachInputInfo

                            if (beachInputInfo < filterInput.from)
                                filterInput.from = beachInputInfo
                            break;
                        default:
                            if( filterInput.variants.indexOf(beachInputInfo) !== -1 )
                                return false

                            if( typeof beachInputInfo === "object" ){
                                Object.values(beachInputInfo).forEach(item => {
                                    if( filterInput.variants.indexOf(item.name) === -1 )
                                        filterInput.variants.push(item.name)
                                })
                            } else {
                                filterInput.variants.push(beachInputInfo)
                            }

                    }
                }
            })
        })
    }

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default FilterStore = new FilterStore()