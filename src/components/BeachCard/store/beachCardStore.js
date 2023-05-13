import { makeAutoObservable } from "mobx";
import { capitalizeFirstLetter } from "../../../Utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";

export default class BeachCardStore {
    id = 0
    updateTime = null
    code = ""
    name = ""
    rating = 0
    bathingComfort = ""
    beachProblems = ""
    waterTemp = 0
    airTemp = 0
    wind = 0
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
                    return new BeachCardStore(item)
                });
            })
    }

    get updateTimeText(){
        dayjs.extend(relativeTime)
        return capitalizeFirstLetter(dayjs(this.updateTime).locale("ru").fromNow())
    }

    constructor(data) {
        makeAutoObservable(this);

        Object.keys(this).forEach(prop => {
            this[prop] = data[prop]
        })
    }
}