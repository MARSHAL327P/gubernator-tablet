import {makeAutoObservable, observable, runInAction, toJS} from "mobx";
import axios from "axios";
import IndicationsStore from "../../Indications/store/indications.store";
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
    defaultHeatmapOptions = {
        radius: 120,
        dissipating: true,
        opacity: 0.7,
        intensityOfMidpoint: 0.01,
        gradient: {
            0.1: 'rgba(49,173,70,1)',
            0.15: 'rgba(196,201,61,1)',
            0.3: 'rgba(222,151,46)',
            0.5: 'rgb(222,140,46)',
            0.7: 'rgba(206,90,35)',
            0.99999: 'rgba(190,41,25)',
        }
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
        },
        pressure: {
            ...this.defaultAdditionalLayersOptions,
            indicationData: IndicationsStore.indications.pressure,
        },
    }
    zoomIsBlocked = false
    markerTextClasses = "font-bold text-xs text-center drop-shadow-md shadow-black"
    blurBackgroundClasses = "bg-white/50 backdrop-blur p-6 shadow-lg rounded-xl border-2 border-white min-w-72"
    tileSize = 256;

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

    initLocation(initDefaultValues = false){
        let url = new URL(window.location)
        let searchParams = url.searchParams

        if( !searchParams.get("ll") || !searchParams.get("zoom") || initDefaultValues ){
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

        searchParams.set("ll", newLocation.center )
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
        return Object.values(this.additionalLayers).find((layerData) => layerData.selected)
    }

    selectAdditionalLayer(layerName) {
        let lastSelectedAdditionalLayer = this.selectedAdditionalLayer
        let layerData = this.additionalLayers[layerName]

        layerData.selected = !layerData.selected

        if( lastSelectedAdditionalLayer )
            lastSelectedAdditionalLayer.selected = false
    }

    blockZoom(zoomValue = 13) {
        this.zoomToItem([44.577681655459656, 33.49127241954839], zoomValue)
        this.mapRef.current.behaviors.disable("scrollZoom")
        this.zoomIsBlocked = true
    }

    unBlockZoom() {
        this.mapRef.current.behaviors.enable("scrollZoom")
        this.zoomIsBlocked = false
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

    async fetchTile(x, y, z, layer) {
        runInAction(() => {
            layer.isLoading = true
        })

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = this.tileSize;
        canvas.height = this.tileSize;

        let base_image = new Image();

        base_image.src = `${process.env.REACT_APP_TILES}/${layer.indicationData.nclName}/${z}/${x}/${y}.png`;
        base_image.onload = function(){
            runInAction(() => {
                layer.isLoading = false
            })

            ctx.drawImage(base_image, 0, 0);
        }

        return {image: canvas};
    }

    constructor() {
        makeAutoObservable(this, {
            ymaps: observable.ref,
            mapRef: observable.ref,
        });
    }
}

export default MapStore = new MapStore()