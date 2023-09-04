import {makeAutoObservable, observable, runInAction} from "mobx";
import axios from "axios";
import IndicationsStore from "../../Indications/store/indications.store";
import React from "react";
import ReactDOM from "react-dom";
import GlobalStore from "../../../stores/global.store";
import coordValue from "./coordValues";

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
    defaultAdditionalLayersOptions = {
        indicationData: IndicationsStore.indications.temperature,
        selected: false,
        isLoading: false,
        gradeRange: null,
    }
    additionalLayers = {
        temperature: this.defaultAdditionalLayersOptions,
        wind: {
            ...this.defaultAdditionalLayersOptions,
            indicationData: IndicationsStore.indications.wind,
            gradeRange: null,
        },
        pressure: {
            ...this.defaultAdditionalLayersOptions,
            indicationData: IndicationsStore.indications.pressure,
            gradeRange: null,
        },
        t_surf: {
            ...this.defaultAdditionalLayersOptions,
            indicationData: IndicationsStore.indications.t_surf,
            gradeRange: null,
        },
    }
    zoomIsBlocked = false
    markerTextClasses = "font-bold text-xs text-center drop-shadow-md shadow-black bg-white rounded-xl py-1 px-2 whitespace-nowrap"
    blurBackgroundClasses = "bg-white/50 backdrop-blur p-6 shadow-lg rounded-xl border-2 border-white min-w-72"
    tileSize = 256;
    coordValues = {}
    currentValue = null

    async loadMap() {
        const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);
        const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
        let additionalModules = reactify.module(await ymaps3.import('@yandex/ymaps3-controls@0.0.1'))
        this.mapData = {
            ...reactify.module(ymaps3),
            YMapZoomControl: additionalModules.YMapZoomControl,
            YMapGeolocationControl: additionalModules.YMapGeolocationControl
        };
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

    get selectedAdditionalLayer() {
        let layer = Object.values(this.additionalLayers).find((layerData) => layerData.selected)
        GlobalStore.selectedAdditionalLayer = layer

        return layer
    }

    selectAdditionalLayer(layerName) {
        let lastSelectedAdditionalLayer = this.selectedAdditionalLayer
        let layerData = this.additionalLayers[layerName]

        GlobalStore.generateNewHeatmap = true

        this.currentValue = null
        this.coordValues = coordValue
        layerData.selected = !layerData.selected

        if (layerData.selected)
            layerData.isLoading = true

        if( !lastSelectedAdditionalLayer ) {
            this.setLocationParams({
                ...this.location,
                zoom: 10
            })
        }

        axios.get(process.env.REACT_APP_TILES_DATA)
            .then(({data}) => {
                layerData.gradeRange = layerData.gradeRange ?? data[layerData.indicationData.nclName]
            })

        if (lastSelectedAdditionalLayer)
            lastSelectedAdditionalLayer.selected = false
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

    async fetchTile(x, y, z) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let layer = GlobalStore.selectedAdditionalLayer

        canvas.width = this.tileSize;
        canvas.height = this.tileSize;
        // ctx.fillStyle = '#000000';
        //
        // ctx.beginPath();
        // ctx.rect(0, 0, canvas.width, canvas.height)
        // ctx.closePath();
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        // ctx.fillText(`${x}:${y}:${z}`, 10, 10);

        let base_image = new Image();

        base_image.src = `https://10.32.141.2:8083/tiles/${layer.indicationData.nclName}/${z}/${x}/${y}`;
        base_image.onload = () => {
            runInAction(() => {
                layer.isLoading = false
            })

            ctx.drawImage(base_image, 0, 0);
        }

        GlobalStore.generateNewHeatmap = false

        return {image: canvas};
    }

    findCurrentValue(object, event){
        if( object?.type === "marker" )
            return false

        var startTime = performance.now()
        let coords = event.coordinates
        let searchLat = coords[1]
        let searchLon = coords[0]

        let findElement = this.coordValues.reduce((acc, obj) =>
            (
                Math.abs(searchLat - obj.lat) <= Math.abs(searchLat - acc.lat) &&
                Math.abs(searchLon - obj.lon) <= Math.abs(searchLon - acc.lon)
            ) ? obj : acc
        );

        this.currentValue = {
            coord: coords,
            value: findElement.value
        }

        var endTime = performance.now()
        console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
    }

    get currentValueText(){
        let indication = this.selectedAdditionalLayer.indicationData
        return `${this.currentValue.value} ${indication.unitsFull ?? indication.units}`
    }

    constructor() {
        makeAutoObservable(this, {
            ymaps: observable.ref,
            mapRef: observable.ref,
        });
    }
}

export default MapStore = new MapStore()