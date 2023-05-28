import { action, makeAutoObservable } from "mobx";
import { ReactComponent as Warning } from "../../../assets/icons/Warning.svg";
import { ReactComponent as Danger } from "../../../assets/icons/Danger.svg";
import BeachCardStore from "./beachCard.store";
import FilterStore from "../../Filter/store/filter.store";

class BeachLocalStore {
    list = []
    isLoading = false
    bathingComfortType = {
        GOOD: {
            text: "Комфортно",
            classes: " bg-success",
        },
        NO_BATHING: {
            text: "Купание запрещено",
            classes: " bg-danger",
        },
        BEACH_CLOSE: {
            text: "ПЛЯЖ ЗАКРЫТ",
            classes: " bg-white border-y border-gray-200",
            showIcon: false,
            textClasses: "text-danger font-bold"
        }
    }

    beachType = {
        CITY: "Городской",
        WILD: "Дикий",
    }

    beachProblemsType = {
        DANGER: {
            name: "Серъёзные проблемы",
            icon: <Danger className={"stroke-danger w-6 h-6"} />,
        },
        WARNING: {
            name: "Незначительные проблемы",
            icon: <Warning className={"fill-warning w-6 h-6"}/>,
        },
    }

    defaultFilterInputs = {
        rating: {
            name: "Рейтинг пляжа",
            ...FilterStore.filterTypes.radioBtn,
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
            ...FilterStore.filterTypes.checkbox
        },
        beachCoverage: {
            name: "Покрытие пляжа",
            ...FilterStore.filterTypes.checkbox
        },
        workTime: {
            name: "Режим работы",
            ...FilterStore.filterTypes.checkbox,
            variants: ["Круглосуточно", "Не круглосуточно"],
        },
        waterTemp: {
            name: "Температура воды",
            ...FilterStore.filterTypes.selectFromTo
        },
        props: {
            name: "Дополнительные параметры",
            ...FilterStore.filterTypes.checkbox
        },
        wind: {
            name: "Скорость ветра",
            ...FilterStore.filterTypes.selectFromTo
        },
    }

    filterName = "Фильтр пляжей"

    findBeach(beachCode){
        return this.list && this.list.find((beach) => beach.code === beachCode)
    }

    get filteredCards(){
        return FilterStore.filteredCards(this)
    }

    constructor() {
        makeAutoObservable(this);

        this.isLoading = true
        BeachCardStore
            .get()
            .then(
                action(data => {
                    this.list = data ?? []
                })
            )
            .finally(action(() => {
                this.isLoading = false
            }));
    }
}

export default BeachLocalStore = new BeachLocalStore()