import {makeAutoObservable, observable} from "mobx";
import BeachMap from "../components/BeachMap";
import RealObjectMap from "../components/RealObjectMap";

class MapStore {
    ymaps = null
    mapItems = {
        "/": <BeachMap/>,
        "/object": <RealObjectMap/>
    }

    constructor(data) {
        makeAutoObservable(this, {
            ymaps: observable.ref
        });
    }
}

export default MapStore = new MapStore()