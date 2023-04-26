import { makeAutoObservable } from "mobx";

class SidebarStore {
    isOpen = true
    topOffset = 0
    searchQuery = ""

    get beachList(){
        return [
            {
                id: 1,
                updateTime: 12,
                name: "Любимовка",
                rating: 4.7,
                isOpen: true,
                bathingComfort: "GOOD",
                waterTemp: 14.7,
                airTemp: 21.3,
                wind: 5,
                coord: [44, 33],
            },
            {
                id: 2,
                updateTime: 12,
                name: "Учкуевка",
                rating: 4.2,
                isOpen: true,
                bathingComfort: "NO_BATHING",
                beachProblems: "DANGER",
                waterTemp: 15.9,
                airTemp: 22.9,
                wind: 2,
                coord: [44, 33],
            },
            {
                id: 3,
                updateTime: 12,
                name: "Хрустальный",
                rating: 3.9,
                isOpen: true,
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