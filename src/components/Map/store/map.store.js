import {makeAutoObservable, observable, runInAction} from "mobx";
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
        fetchData: this.showHeatmap.bind(this),
        data: null,
        heatmapObject: null,
        apiUrl: process.env.REACT_APP_AIR_TEMP_HEATMAP,
        selected: false,
        indicationData: IndicationsStore.indications.temperature,
        isLoading: false,
        options: this.defaultHeatmapOptions,
        gradeRange: null
    }
    additionalLayers = {
        temperature: this.defaultAdditionalLayersOptions,
        t_surf: {
            ...this.defaultAdditionalLayersOptions,
            apiUrl: process.env.REACT_APP_WATER_TEMP_HEATMAP,
            indicationData: IndicationsStore.indications.t_surf,
            options: {
                ...this.defaultHeatmapOptions,
                gradient: {
                    0.1: 'rgb(190,41,25)',
                    0.3: 'rgb(206,90,35)',
                    0.5: 'rgb(222,151,46)',
                    0.7: 'rgba(196,201,61,1)',
                    0.99999: 'rgba(49,173,70,1)',
                }
            },
        },
        aqi: {
            ...this.defaultAdditionalLayersOptions,
            apiUrl: process.env.REACT_APP_AIR_QUALITY_HEATMAP,
            indicationData: IndicationsStore.indications.aqi,
            options: {
                ...this.defaultHeatmapOptions,
                gradient: {
                    0.1: '#36E166',
                    0.3: '#E8EC20',
                    0.5: '#ECBF20',
                    0.7: '#DF2828',
                    0.8: '#C936E1',
                    0.99999: '#6236E1',
                }
            },
        },
        excitement: {
            ...this.defaultAdditionalLayersOptions,
            apiUrl: process.env.REACT_APP_EXCITEMENT_HEATMAP,
            indicationData: IndicationsStore.indications.excitement,
            options: {
                ...this.defaultHeatmapOptions,
                // gradient:	{
                //     0.1: '#36E166',
                //     0.3: '#E8EC20',
                //     0.5: '#ECBF20',
                //     0.7: '#DF2828',
                //     0.8: '#C936E1',
                //     0.99999: '#6236E1',
                // }
            },
        },
    }
    zoomIsBlocked = false
    markerTextClasses = "absolute left-[-23px] top-[60px] w-[100px] font-bold text-xs drop-shadow-md shadow-black"
    blurBackgroundClasses = "bg-white/50 backdrop-blur p-6 shadow-lg rounded-xl border-2 border-white min-w-72"

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

    setLocation(navigate, location) {
        let url = new URL(window.location)
        let searchParams = url.searchParams

        if( location ){
            searchParams.set("ll", location.center)
            searchParams.set("zoom", location.zoom)
        }

        this.location = {
            center: searchParams.get("ll") ? searchParams.get("ll").split(",") : [33.526402, 44.556972],
            zoom: searchParams.get("zoom") ?? 12,
        }

        navigate(url.pathname + "?" + searchParams.toString())
    }

    zoomToItem(coord, zoom = 17) {
        if (!this.mapRef.current) return

        if (this.zoomIsBlocked)
            zoom = 13

        this.mapRef.current.setCenter([coord[0] + 0.0001, coord[1]], zoom, {
            duration: 500,
            timingFunction: "ease"
        })
    }

    get selectedAdditionalLayer() {
        return Object.values(this.additionalLayers).find((layerData) => layerData.selected)
    }

    selectAdditionalLayer(layerName) {
        let lastSelectedAdditionalLayer = this.selectedAdditionalLayer
        let layerData = this.additionalLayers[layerName]

        layerData.selected = !layerData.selected

        if (lastSelectedAdditionalLayer && lastSelectedAdditionalLayer.heatmapObject) {
            lastSelectedAdditionalLayer.heatmapObject.destroy()
            lastSelectedAdditionalLayer.selected = false
        }

        if (layerData.selected && this.selectedAdditionalLayer.data) {
            this.selectedAdditionalLayer.heatmapObject.setMap(this.mapRef.current)
        } else if (layerData.selected) {
            runInAction(() => {
                this.selectedAdditionalLayer.isLoading = true
            })
            layerData.fetchData()
        }

        if (this.selectedAdditionalLayer) {
            // this.blockZoom()
        } else {
            this.unBlockZoom()
        }
    }

    async loadHeatmapLibrary() {
        let {yandexHeatmap} = await import('../libs/heatmap');

        yandexHeatmap(this.ymaps)
    }

    showHeatmap() {
        if (!this.ymaps) return

        this.loadHeatmapLibrary().then(() => {
            axios.get(this.selectedAdditionalLayer.apiUrl)
                .then(({data}) => {
                    this.selectedAdditionalLayer.gradeRange = data.grade
                    this.selectedAdditionalLayer.data = data.layer
                    this.setHeatmap()
                })
        })
    }

    setHeatmap() {
        this.ymaps.ready(['Heatmap']).then(() => {
            this.selectedAdditionalLayer.heatmapObject = new this.ymaps.Heatmap(this.selectedAdditionalLayer.data, this.selectedAdditionalLayer.options);

            this.selectedAdditionalLayer.heatmapObject.setMap(this.mapRef.current);
            runInAction(() => {
                this.selectedAdditionalLayer.isLoading = false
            })
        })
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
        if (!this.ymaps || !this.mapRef.current || this.isSameLocation(coords)) return

        localStorage.setItem("location", coords)
        this.setGeoLocationMarker(coords)
    }

    get geoLocation() {
        return localStorage.getItem("location") &&
            localStorage
                .getItem("location")
                .split(",")
                .map(item => parseFloat(item))
    }

    setGeoLocationMarker(coords) {
        this.mapRef.current.geoObjects.add(new this.ymaps.Placemark(coords, {},
            {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '50'
            }));
    }

    isSameLocation(coords) {
        return this.geoLocation && this.geoLocation[0] === coords[0] && this.geoLocation[1] === coords[1]
    }

    generateRoute(coordTo) {
        let geoLocation = (this.geoLocation && this.geoLocation.join(",")) || ""

        window.open(`https://yandex.ru/maps/959/sevastopol/?mode=routes&rtext=${geoLocation}~${coordTo.join(",")}&rtt=auto&ruri=~`, "_blank");
    }

    constructor() {
        makeAutoObservable(this, {
            ymaps: observable.ref,
            mapRef: observable.ref,
        });
    }
}

export default MapStore = new MapStore()