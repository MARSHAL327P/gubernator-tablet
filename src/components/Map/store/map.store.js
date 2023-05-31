import {makeAutoObservable, observable} from "mobx";
import BeachMap from "../components/BeachMap";
import RealObjectMap from "../components/RealObjectMap";

class MapStore {
    ymaps = null
    mapRef = null
    mapItems = {
        "/": <BeachMap/>,
        "/object": <RealObjectMap/>
    }
    queryParam = null

    zoomToItem(coord){
        this.mapRef.current.panTo(coord, {
            delay: 1500
        });
    }

    constructor(data) {
        makeAutoObservable(this, {
            ymaps: observable.ref,
            mapRef: observable.ref,
        });
    }
}

export default MapStore = new MapStore()