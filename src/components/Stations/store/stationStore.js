import { makeAutoObservable } from "mobx";

export class StationStore {
    id = 0
    station_type_id = 0
    name = ""
    coord = []

    static get() {
        let stationList = [
            {
                id: 1,
                station_type_id: 1,
                name: "Буй 1",
                coord: [
                    44.615223, 33.487778
                ]
            },
            {
                id: 2,
                station_type_id: 0,
                name: "Станция на северной",
                coord: [
                    44.635382, 33.536670
                ]
            },
            {
                id: 3,
                station_type_id: 0,
                name: "Станция СевГУ",
                coord: [
                    44.594911, 33.476004
                ]
            }
        ]

        return stationList.map(item => {
            return new StationStore(item)
        })
    }

    constructor(data) {
        makeAutoObservable(this);

        Object.keys(this).forEach(prop => {
            this[prop] = data[prop]
        })
    }
}