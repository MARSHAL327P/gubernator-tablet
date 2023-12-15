import {makeAutoObservable, observable} from "mobx";
import React from "react";
import ReactDOM from "react-dom";

/* global ymaps3 */

class MapStore {
    ymaps = null
    mapRef = null
    mapData = null
    queryParam = null
    location = null
    defaultLocation = {
        center: [33.526402, 44.576972],
        zoom: 12
    }

    zoomIsBlocked = false
    markerTextClasses = "font-bold text-xs text-center drop-shadow-md shadow-black bg-white rounded-xl py-1 px-2 whitespace-nowrap"
    blurBackgroundClasses = "bg-white/50 backdrop-blur p-6 shadow-lg rounded-xl border-2 border-white min-w-72"

    async loadMap() {
        try {
            const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);
            const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
            let additionalModules = reactify.module(await ymaps3.import('@yandex/ymaps3-controls@0.0.1'))

            return {
                ...reactify.module(ymaps3),
                YMapZoomControl: additionalModules.YMapZoomControl,
                YMapGeolocationControl: additionalModules.YMapGeolocationControl
            }

            // this.mapData = {
            //     ...reactify.module(ymaps3),
            //     YMapZoomControl: additionalModules.YMapZoomControl,
            //     YMapGeolocationControl: additionalModules.YMapGeolocationControl
            // }
        } catch (e) {
            console.error(e)
        }
    }

    initLocation(initDefaultValues = false) {
        let url = new URL(window.location)
        let searchParams = url.searchParams

        if (!searchParams.get("ll") || !searchParams.get("zoom") || initDefaultValues) {
            this.setLocationParams(this.defaultLocation)
        }

        this.location = {
            center: searchParams.get("ll") && !initDefaultValues ? searchParams.get("ll").split(",") : this.defaultLocation.center,
            zoom: searchParams.get("zoom") && !initDefaultValues ? parseFloat(searchParams.get("zoom")) : this.defaultLocation.zoom,
            duration: 500
        }
    }

    setLocationParams(newLocation) {
        let url = new URL(window.location)
        let searchParams = url.searchParams
        let zoom = parseFloat(newLocation.zoom.toFixed(2))

        searchParams.set("ll", newLocation.center)
        searchParams.set("zoom", zoom)

        this.location = {
            center: newLocation.center,
            zoom: zoom,
            duration: 500
        }

        window.history.pushState({}, "", url)
    }

    zoomToItem(coord, zoom = 16) {
        if (this.zoomIsBlocked)
            zoom = 13

        this.location = {
            center: [coord[0] + 0.0001, coord[1]],
            zoom: zoom,
            duration: 500
        }
        this.setLocationParams(this.location)
    }


    saveGeoLocation(coords) {
        localStorage.setItem("location", JSON.stringify(coords))
    }

    get geoLocation() {
        return localStorage.getItem("location") &&
            JSON.parse(localStorage.getItem("location"))
    }

    generateRoute(coordTo) {
        let geoLocation = (this.geoLocation && this.geoLocation.reverse()) || ""

        window.open(`https://yandex.ru/maps/959/sevastopol/?mode=routes&rtext=${geoLocation}~${coordTo.reverse().join(",")}&rtt=auto&ruri=~`, "_blank");
    }

    constructor() {
        makeAutoObservable(this, {
            ymaps: observable.ref,
            mapRef: observable.ref,
        });
    }
}

export default MapStore = new MapStore()