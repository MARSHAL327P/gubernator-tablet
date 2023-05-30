import { makeAutoObservable } from "mobx";

export class StationStore {
    id = 0
    code = ""
    name = ""
    description = "";
    type = ""
    coord = []
    created_at = null;
    updated_at = null;
    props = {}

    static get() {
        let stationList = [
            {
                id: 1,
                code: "buoy-1",
                name: "Буй 1",
                description: "Описание буя",
                type: "BUOY",
                coord: [
                    44.617309514457844, 33.518458637702622
                ],
                created_at: "2023-05-22T09:47:06",
                updated_at: "2023-05-22T09:47:06",
                props: {
                    t_surf: 12.3,
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
            },
            {
                id: 2,
                code: "meteostantsiya-1",
                name: "Метеостанция 1",
                description: "Описание метеостанции",
                type: "METEO_STATION",
                coord: [
                    44.616762540148841, 33.517701416658646
                ],
                created_at: "2023-05-22T09:47:06",
                updated_at: "2023-05-22T09:47:06",
                props: {
                    windSpeed: 3,
                    windDirection: 0,
                    temperature: 16.8,
                    pressure: 0,
                    rainfall: 0,
                    uvIndex: 0,
                    humidity: 0,
                    solarRadiation: 0
                }
            },
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