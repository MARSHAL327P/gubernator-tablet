import {makeAutoObservable} from "mobx";
import axios from "axios";
import AirQualityStore from "../../AirQuality/store/airQuality.store";
import WaterQualityStore from "../../WaterQuality/store/waterQuality.store";

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
    airQuality = {}
    waterQuality = {}
    img = []
    description = ""
    indications = {}

    static get() {
        return axios.get(process.env.REACT_APP_BEACHES)
            .then(({data}) => {
                return data.map(item => {
                    item.waterQuality = {
                        "indications": {
                            "petroleumHydrocarbons": {
                                "value": 0.01,
                                "rating": "CLEAR"
                            },
                            "phenols": {
                                "value": 0.001,
                                "rating": "CLEAR"
                            },
                            "SPAW": {
                                "value": 0.9,
                                "rating": "MUDDY"
                            },
                            "metals": {
                                "value": 0.0001,
                                "rating": "CLEAR"
                            },
                        },
                        "totalRating": "MUDDY",
                        "updateTime": "2023-05-22T09:47:06"
                    }
                    item.waterQuality = new WaterQualityStore(item.waterQuality)
                    item.airQuality = new AirQualityStore(item.airQuality)

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
            this[prop] = data[prop]
        })
    }
}