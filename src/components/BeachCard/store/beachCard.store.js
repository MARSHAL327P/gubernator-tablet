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
    t_surf = 0
    temperature = 0
    windSpeed = 0
    coord = [0, 0]
    beachType = ""
    beachCoverage = ""
    price = 0
    workTime = ["0", "0"]
    isOpen = true
    polygon = []
    props = {}
    airQuality = {}

    static get() {
        return axios.get(process.env.REACT_APP_BEACHES)
            .then(({data}) => {
                return data.map(item => {
                    item.airQuality = {
                        "indications": {
                            "no2": {
                                "value": 0,
                                "level": 0
                            },
                            "o3": {
                                "value": 62,
                                "level": 31.5
                            },
                            "pm10": {
                                "value": 7,
                                "level": 7
                            },
                            "pm2_5": {
                                "value": 5,
                                "level": 2.5
                            },
                            "so2": {
                                "value": 0,
                                "level": 0
                            },
                            "co": {
                                "value": 99,
                                "level": 39
                            },
                        },
                        "totalRating": 39,
                        "updateTime": "2023-05-22T09:47:06"
                    }

                    item.airQuality = new AirQualityStore(item.airQuality)

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