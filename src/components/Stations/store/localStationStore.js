import { makeAutoObservable } from "mobx";
import { StationStore } from "./stationStore";

class LocalStationStore {
    stationList = []

    constructor(data) {
        makeAutoObservable(this);

        this.stationList = StationStore.get()
    }
}

export default LocalStationStore = new LocalStationStore()