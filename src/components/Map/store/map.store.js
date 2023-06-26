import {makeAutoObservable, observable} from "mobx";

class MapStore {
    ymaps = null
    mapRef = null
    queryParam = null

    zoomToItem(coord){
        this.mapRef.current.setZoom(17)
        this.mapRef.current.panTo([coord[0] + 0.0001, coord[1]])
    }

    constructor(data) {
        makeAutoObservable(this, {
            ymaps: observable.ref,
            mapRef: observable.ref,
        });
    }
}

export default MapStore = new MapStore()