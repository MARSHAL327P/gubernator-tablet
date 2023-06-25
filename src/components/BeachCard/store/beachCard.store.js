import {makeAutoObservable} from "mobx";
import axios from "axios";
import AirQualityStore from "../../AirQuality/store/airQuality.store";

export default class BeachCardStore {
    id = 0
    updateTime = null
    code = ""
    name = ""
    rating = 0
    bathingComfort = ""
    beachProblems = ""
    // t_surf = 0
    // temperature = 0
    // windSpeed = 0
    coord = [0, 0]
    beachType = ""
    beachCoverage = ""
    price = 0
    workTime = ["0", "0"]
    isOpen = true
    polygon = []
    props = {}
    airQuality = {}
    img = []
    description = ""
    indications = {}

    static get() {
        return axios.get(process.env.REACT_APP_BEACHES)
            .then(({data}) => {
                return data.map(item => {
                    item.airQuality = new AirQualityStore(item.airQuality)
                    item.indications = {
                        temperature: item.temperature,
                        windSpeed: item.windSpeed,
                        pressure: item.pressure,
                        humidity: item.humidity,
                        t_surf: item.t_surf,
                        Honf: item.Honf,
                    }
                    item.bathingComfort = ["COLD_WATER", "HIGH_WAVE"]

                    return new BeachCardStore(item)
                });
            })
    }

    constructor(data) {
        makeAutoObservable(this);

        Object.keys(this).forEach(prop => {
            this[prop] = data[prop]
        })
    }
}