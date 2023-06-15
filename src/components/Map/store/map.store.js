import {makeAutoObservable, observable} from "mobx";

class MapStore {
    ymaps = null
    mapRef = null
    // mapItems = {
    //     "/": <BeachMap/>,
    //     "/object": <RealObjectMap/>
    // }
    queryParam = null

    zoomToItem(coord, dashboardMargin = false){
        this.mapRef.current.panTo([coord[0] + (dashboardMargin ? 0.0001 : 0), coord[1]], {
            delay: 1500,
        }).then(() => {
            this.mapRef.current.setZoom(17)
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