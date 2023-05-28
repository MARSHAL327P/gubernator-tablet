import { makeAutoObservable } from "mobx";
import { StationStore } from "./station.store";
import FilterStore from "../../Filter/store/filter.store";

class RealObjectStore {
    list = []
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
            props: this.buoyProps
        },
        METEO_STATION: {
            name: "Метеостанция",
            props: this.meteoProps
        },
        WASTEWATER: {
            name: "Сточные воды",
            props: {}
        },
    }

    get filteredCards(){
        return FilterStore.filteredCards(this)
    }

    constructor(data) {
        makeAutoObservable(this);

        this.list = StationStore.get()
    }
}

export default RealObjectStore = new RealObjectStore()