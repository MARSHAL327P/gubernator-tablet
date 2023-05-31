import {action, makeAutoObservable} from "mobx";
import { RealObjectCardStore } from "./realObjectCard.store";
import FilterStore from "../../Filter/store/filter.store";
import {ReactComponent as Meteo} from "../../../assets/icons/Meteo.svg";
import {ReactComponent as Buoy} from "../../../assets/icons/Buoy.svg";
import IndicationsStore from "../../Indications/store/indications.store";
import RealObjectMap from "../../Map/components/RealObjectMap";

class RealObjectStore {
    list = []
    isLoading = false
    meteoProps = {
        windSpeed: 0,
        windDirection: 0,
        temperature: 0,
        pressure: 0,
        rainfall: 0,
        uvIndex: 0,
        humidity: 0,
        solarRadiation: 0
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
    realObjectTypes = {
        BUOY: {
            name: "Буй",
            props: this.buoyProps,
            mapIndication: IndicationsStore.indicationTypes.WATER_TEMP,
            bgColor: "bg-warning",
            icon: Buoy,
        },
        METEO_STATION: {
            name: "Метеостанция",
            props: this.meteoProps,
            mapIndication: IndicationsStore.indicationTypes.AIR_TEMP,
            bgColor: "bg-primary",
            icon: Meteo,
        },
        WASTEWATER: {
            name: "Сточные воды",
            props: {}
        },
    }

    defaultFilterInputs = {
        pressure: {
            name: "Давление",
            ...FilterStore.filterTypes.selectFromTo
        },
        windSpeed: {
            name: "Скорость ветра",
            ...FilterStore.filterTypes.selectFromTo
        },
    }

    filterName = "Фильтр объектов"
    mapLayer = <RealObjectMap/>

    get filteredCards(){
        return FilterStore.filteredCards(this)
    }

    findCard(type, code){
        return this.list.length > 0 && this.list.find((card) => card.code === code && card.type === type)
    }

    constructor(data) {
        makeAutoObservable(this);

        this.isLoading = true
        RealObjectCardStore
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

export default RealObjectStore = new RealObjectStore()