import {makeAutoObservable} from "mobx";
import { ReactComponent as Warning } from "../../../assets/icons/Warning.svg";
import { ReactComponent as Danger } from "../../../assets/icons/Danger.svg";
import { ReactComponent as Wave } from "../../../assets/icons/Wave.svg";
import { ReactComponent as Water } from "../../../assets/icons/Water.svg";
import BeachCardStore from "./beachCard.store";
import FilterStore from "../../Filter/store/filter.store";
import BeachMap from "../../Map/components/Placemarkers/BeachMap";
import BeachCard from "../components/BeachCard";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

class BeachLocalStore {
    bathingComfortType = {
        GOOD: {
            text: "Комфортно",
            classes: "bg-success",
        },
        NO_BATHING: {
            text: "Купание запрещено",
            classes: "bg-danger",
        },
        COLD_WATER: {
            text: "Холодная вода",
            classes: "bg-primary",
            gradient: "from-primary",
            icon: Water
        },
        COOL_WATER: {
            text: "Прохладная вода",
            classes: "bg-info",
            gradient: "from-info",
            icon: Water
        },
        MEDIUM_WAVE: {
            text: "Средние волны",
            classes: "bg-[#007FA1]",
            gradient: "to-[#007FA1]",
            icon: Wave
        },
        HIGH_WAVE: {
            text: "Высокие волны",
            classes: "bg-[#001658]",
            gradient: "to-[#001658]",
            icon: Wave
        },
        BEACH_CLOSE: {
            text: "ПЛЯЖ ЗАКРЫТ",
            classes: "bg-white border-y border-gray-200",
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
        // workTime: {
        //     name: "Режим работы",
        //     ...FilterStore.filterTypes.checkbox,
        //     variants: ["Круглосуточно", "Не круглосуточно"],
        // },
        temperature: {
            name: "Температура воздуха",
            ...FilterStore.filterTypes.selectFromTo
        },
        t_surf: {
            name: "Температура воды",
            ...FilterStore.filterTypes.selectFromTo
        },
        wind: {
            name: "Скорость ветра",
            ...FilterStore.filterTypes.selectFromTo
        },
        props: {
            name: "Удобства",
            ...FilterStore.filterTypes.checkbox
        },
    }

    isLoading = false
    isFetched = false
    list = []
    code = ""
    title = "Пляж"
    filterName = "Фильтр пляжей"
    loadingText = "Загрузка пляжей"
    component = BeachCard
    mapLayer = <BeachMap/>
    excludedFilters = ["rating", "price", "workTime"]
    filterInputs = {}
    filteredList = null
    filterUrl = process.env.REACT_APP_BEACHES_FILTER

    get card(){
        return this.list && this.list.find((card) => card.code === this.code)
    }

    fetchInfo(){
        return SelectedClassInfoStore.fetchInfo(this)
    }

    constructor() {
        makeAutoObservable(this);

        this.cardStore = BeachCardStore
    }
}

export default BeachLocalStore = new BeachLocalStore()