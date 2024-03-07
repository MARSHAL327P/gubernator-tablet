import {makeAutoObservable} from "mobx";
import axios from "axios";

export default class BeachCardStore {
    id = 0
    updateTime = null
    code = ""
    name = ""
    rating = 0
    bathingComfort = ""
    beachProblems = ""
    coord = [0, 0]
    beachType = ""
    beachCoverage = ""
    price = 0
    workTime = ["0", "0"]
    isOpen = true
    polygon = []
    props = {}
    img = []
    description = ""
    indications = {}
    hasWaterQuality = false
    markerDescriptionIsOpen = false
    stationId = 0

    static get() {
        return axios.get(process.env.REACT_APP_BEACHES)
            .then(({data}) => {
                return data.map(item => {
                    return new BeachCardStore(item)
                });
            })
    }

    get bathingComfortMapColors() {
        let result = {
            polygon: "#FCC33F",
            marker: "fill-warning"
        }

        if (this.bathingComfort.includes("HIGH_WAVE") || !this.isOpen) {
            result = {
                polygon: "#FF4C28",
                marker: "fill-danger"
            }
        } else if (this.bathingComfort.includes("GOOD")) {
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
            if( data[prop] )
                this[prop] = data[prop]
        })
    }
}