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

                    return new BeachCardStore(item)
                });
            })
    }

    get bathingComfortMapColors(){
        let result = {
            polygon: "#FCC33F",
            marker: "fill-warning"
        }

        if( this.bathingComfort.includes("HIGH_WAVE") || !this.isOpen ){
            result = {
                polygon: "#FF4C28",
                marker: "fill-danger"
            }
        } else if( this.bathingComfort.includes("GOOD") ){
            result = {
                polygon: "#87E827",
                marker: "fill-success"
            }
        }

        return result
    }

    constructor(data) {
        makeAutoObservable(this);

        Object.keys(this).forEach(prop => {
            this[prop] = data[prop]
        })
    }
}