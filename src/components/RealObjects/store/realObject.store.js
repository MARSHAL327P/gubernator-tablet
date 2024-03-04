import {makeAutoObservable} from "mobx";
import { RealObjectCardStore } from "./realObjectCard.store";
import FilterStore from "../../Filter/store/filter.store";
import {ReactComponent as Meteo} from "../../../assets/icons/Meteo.svg";
import {ReactComponent as Buoy} from "../../../assets/icons/Buoy.svg";
import {ReactComponent as Wastewater} from "../../../assets/icons/Wastewater.svg";
import IndicationsStore from "../../Indications/store/indications.store";
import RealObjectMap from "../../Map/components/Placemarkers/RealObjectMap";
import RealObjectCard from "../components/RealObjectCard";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import RealObjectCardSkeleton from "../components/RealObjectCardSkeleton";

class RealObjectStore {
    meteoProps = {
        windSpeed: 0,
        windDirection: 0,
        temperature: 0,
        pressure: 0,
        rainfall: 0,
        uvIndex: 0,
        humidity: 0,
        solarRadiation: 0,
        no2: 0,
        so2: 0,
        o3: 0
    }
    buoyProps = {
        t_surf: 0,
        t_sub_surf: 0,
        turbidity: 0,
        turbidity_mg: 0,
        hp: 0,
        Hsignf: 0,
        Hmean: 0,
        Honf: 0,
        Hmax: 0,
        Tmean: 0,
        Tsignf: 0,
    }
    wasteWater = {
        petroleumHydrocarbons: 0,
        phenols: 0,
        SPAW: 0,
        cu: 0,
        mn: 0,
        hg: 0,
        fe: 0,
        zn: 0
    }
    realObjectTypes = {
        BUOY: {
            name: "Буй",
            props: this.buoyProps,
            mapIndication: IndicationsStore.indications.t_surf.indicationName,
            bgColor: "bg-warning",
            icon: Buoy,
            filterOpen: true,
            defaultFilterInputs: {
                Honf: {
                    name: "Средняя высота 10% наибольших волн (м)",
                    ...FilterStore.filterTypes.selectFromTo
                },
                t_surf: {
                    name: "Температура поверхности моря",
                    ...FilterStore.filterTypes.selectFromTo
                },
                t_sub_surf: {
                    name: "Температура моря на глубине 3 м",
                    ...FilterStore.filterTypes.selectFromTo
                },
                turbidity_mg: {
                    name: "Мутность, мг/л",
                    ...FilterStore.filterTypes.selectFromTo
                },
            }
        },
        METEO_STATION: {
            name: "Метеостанция",
            props: this.meteoProps,
            mapIndication: IndicationsStore.indications.temperature.indicationName,
            bgColor: "bg-primary",
            icon: Meteo,
            filterOpen: true,
            defaultFilterInputs: {
                pressure: {
                    name: "Давление",
                    ...FilterStore.filterTypes.selectFromTo
                },
                windSpeed: {
                    name: "Скорость ветра",
                    ...FilterStore.filterTypes.selectFromTo
                },
                temperature: {
                    name: "Температура воздуха",
                    ...FilterStore.filterTypes.selectFromTo
                },
                rainfall: {
                    name: "Уровень осадков",
                    ...FilterStore.filterTypes.selectFromTo
                },
                uvIndex: {
                    name: "УФ излучение",
                    ...FilterStore.filterTypes.selectFromTo
                },
                humidity: {
                    name: "Скорость ветра",
                    ...FilterStore.filterTypes.selectFromTo
                },
                solarRadiation: {
                    name: "Солнечная радиация",
                    ...FilterStore.filterTypes.selectFromTo
                },
            }
        },
        WASTEWATER: {
            name: "Сточные воды",
            props: this.wasteWater,
            mapIndication: IndicationsStore.indications.temperature.indicationName,
            bgColor: "bg-info",
            icon: Wastewater,
            filterOpen: true,
            defaultFilterInputs: {
                fe: {
                    name: "Железо",
                    ...FilterStore.filterTypes.selectFromTo
                },
                hg: {
                    name: "Ртуть",
                    ...FilterStore.filterTypes.selectFromTo
                },
                petroleumHydrocarbons: {
                    name: "Нефтяные углеводороды",
                    ...FilterStore.filterTypes.selectFromTo
                },
                phenols: {
                    name: "Фенолы",
                    ...FilterStore.filterTypes.selectFromTo
                },
            }
        },
    }

    isLoading = false
    isFetched = false
    list = []
    id = 0
    type = ""
    title = "Объект"
    filterName = "Фильтр объектов"
    mapLayer = <RealObjectMap/>
    skeleton = <RealObjectCardSkeleton/>
    component = RealObjectCard
    loadingText = "Загрузка объектов"
    filterGroup = this.realObjectTypes
    excludedFilters = []
    filterInputs = {}
    filteredList = null
    filterUrl = process.env.REACT_APP_REAL_OBJECTS_FILTER
    fastFilter = {
        fields: {
            type: []
        },
        alias: {
            METEO_STATION: this.realObjectTypes.METEO_STATION.name,
            BUOY: this.realObjectTypes.BUOY.name,
            WASTEWATER: this.realObjectTypes.WASTEWATER.name
        },
        selected: [],
    }

    get card(){
        return this.list.length > 0 && this.list.find((card) => card.id === parseInt(this.id) && card.type === this.type)
    }

    fetchInfo(){
        return SelectedClassInfoStore.fetchInfo(this)
    }

    constructor() {
        makeAutoObservable(this);

        this.cardStore = RealObjectCardStore
    }
}

export default RealObjectStore = new RealObjectStore()