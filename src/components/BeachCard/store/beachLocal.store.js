import {action, makeAutoObservable, observable, toJS} from "mobx";
import { ReactComponent as Warning } from "../../../assets/icons/Warning.svg";
import { ReactComponent as Danger } from "../../../assets/icons/Danger.svg";
import BeachCardStore from "./beachCard.store";
import FilterStore from "../../Filter/store/filter.store";
import BeachMap from "../../Map/components/BeachMap";
import BeachCard from "../components/BeachCard";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

class BeachLocalStore {
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
        temperature: {
            name: "Температура воздуха",
            ...FilterStore.filterTypes.selectFromTo
        },
        t_surf: {
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

    list = []
    filterName = "Фильтр пляжей"
    loadingText = "Загрузка пляжей"
    component = BeachCard
    mapLayer = <BeachMap/>

    findCard(code){
        return SelectedClassInfoStore.list && SelectedClassInfoStore.list.find((card) => card.code === code)
    }

    constructor() {
        // super(BeachCardStore)
        makeAutoObservable(this);

        this.cardStore = BeachCardStore
    }
}

export default BeachLocalStore = new BeachLocalStore()