import { makeAutoObservable } from "mobx";

class SidebarStore {
    isOpen = true
    topOffset = 0
    searchQuery = ""

    get beachList(){
        return [
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
            }
        ]
    }

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default SidebarStore = new SidebarStore()