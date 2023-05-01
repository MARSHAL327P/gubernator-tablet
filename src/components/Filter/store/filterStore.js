import { makeAutoObservable } from "mobx";
import BeachLocalStore from "../../BeachCard/store/beachLocalStore";
import { ReactComponent as Star } from "../../../assets/icons/Star.svg";

class FilterStore {
    isOpen = false
    width = 0
    filterTypes = {
        select: {
            variants: [],
            type: "select",
            open: true
        },
        checkbox: {
            variants: [],
            type: "checkbox",
            open: true
        },
        selectFromTo: {
            from: Infinity,
            to: 0,
            type: "selectFromTo",
            open: true
        },
        radioBtn: {
            variants: [],
            type: "radioBtn",
            open: true
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

    constructor(data) {
        makeAutoObservable(this);

        let filterInputsKeys = Object.keys(this.filterInputs)
        let excludedFilters = ["rating", "price", "workTime"]

        BeachLocalStore.beachList.forEach(beach => {
            filterInputsKeys.forEach(filterInputKey => {
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
}

export default FilterStore = new FilterStore()