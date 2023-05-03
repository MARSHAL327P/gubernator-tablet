import { makeAutoObservable } from "mobx";

export class BeachCardStore {
    id = 0
    updateTime = null
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
        let beachCardList = [
            {
                id: 1,
                updateTime: "2023-04-26T13:57:00",
                name: "Любимовка",
                rating: 4.7,
                bathingComfort: "GOOD",
                waterTemp: 14.7,
                airTemp: 21.3,
                wind: 5,
                coord: [44, 33],
                beachType: "Дикий",
                beachCoverage: "Песочный",
                price: 0,
                workTime: {
                    from: "10:00",
                    to: "19:00"
                },
                props: {
                    parking: {
                        name: "Паркова",
                        value: true
                    },
                    market: {
                        name: "Магазины",
                        value: false
                    },
                    shower: {
                        name: "Душ",
                        value: false
                    },
                }
            },
            {
                id: 2,
                updateTime: "2023-04-27T21:54:00",
                name: "Учкуевка",
                rating: 4.2,
                bathingComfort: "NO_BATHING",
                beachProblems: "DANGER",
                waterTemp: 15.9,
                airTemp: 22.9,
                wind: 2,
                coord: [44, 33],
                beachType: "Городской",
                beachCoverage: "Галька",
                price: 900,
                workTime: {
                    from: "00:00",
                    to: "00:00"
                },
                props: {
                    parking: {
                        name: "Паркова",
                        value: false
                    },
                    market: {
                        name: "Магазины",
                        value: true
                    },
                    shower: {
                        name: "Душ",
                        value: false
                    },
                }
            },
            {
                id: 3,
                updateTime: "2023-03-24T13:57:00",
                name: "Хрустальный",
                rating: 3.9,
                bathingComfort: "BEACH_CLOSE",
                beachProblems: "WARNING",
                waterTemp: 16.3,
                airTemp: 22.1,
                wind: 7,
                coord: [44, 33],
                beachType: "Городской",
                beachCoverage: "Бетон",
                price: 500,
                workTime: {
                    from: "10:00",
                    to: "19:00"
                },
                props: {
                    parking: {
                        name: "Паркова",
                        value: false
                    },
                    market: {
                        name: "Магазины",
                        value: true
                    },
                    shower: {
                        name: "Душ",
                        value: true
                    },
                    rescuers: {
                        name: "Спасатели",
                        value: true
                    },
                }
            }
        ]

        return beachCardList.map(item => {
            return new BeachCardStore(item)
        })
    }

    constructor(data) {
        makeAutoObservable(this);

        Object.keys(this).forEach(prop => {
            this[prop] = data[prop]
        })
    }
}