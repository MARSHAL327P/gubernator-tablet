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
import BeachCardSkeleton from "../components/BeachCardSkeleton";

class BeachLocalStore {
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
    skeleton= <BeachCardSkeleton/>
    // fastFilter = {
    //     fields: {
    //         // beachType: [],
    //         beachCoverage: [],
    //     },
    //     alias: {},
    //     selected: [],
    //     selectedFieldTypes: []
    // }

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