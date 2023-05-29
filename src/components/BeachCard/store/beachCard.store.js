import { makeAutoObservable } from "mobx";
import axios from "axios";

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
    props = {}

    static get(){
        return axios.get(process.env.REACT_APP_BEACHES)
            .then(({data}) => {
                return data.map(item => {
                    item.windSpeed = item.wind
                    item.temperature = item.airTemp
                    item.t_surf = item.waterTemp
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