import {makeAutoObservable, observable, runInAction} from "mobx";
import axios from "axios";
import IndicationsStore from "../../Indications/store/indications.store";

class MapStore {
    ymaps = null
    mapRef = null
    queryParam = null
    defaultHeatmapOptions = {
        radius: 70,
        dissipating: false,
        opacity: 0.5,
        intensityOfMidpoint: 0.3,
        gradient: {
            0.1: '#80ff00b3',
            0.2: '#ffff00cc',
            0.7: '#ea483ae6',
            0.99999: '#a22419'
        }
    }
    additionalLayers = {
        temperature: {
            fetchData: this.showHeatmap.bind(this),
            data: null,
            heatmapObject: null,
            apiUrl: process.env.REACT_APP_AIR_TEMP_HEATMAP,
            selected: false,
            indicationData: IndicationsStore.indications.temperature,
            isLoading: false,
            options: this.defaultHeatmapOptions,
            gradeRange: null
        },
        t_surf: {
            fetchData: this.showHeatmap.bind(this),
            data: null,
            heatmapObject: null,
            apiUrl: process.env.REACT_APP_WATER_TEMP_HEATMAP,
            selected: false,
            indicationData: IndicationsStore.indications.t_surf,
            isLoading: false,
            options: {
                ...this.defaultHeatmapOptions,
                gradient: {
                    0.1: '#a22419',
                    0.2: '#ea483ae6',
                    0.7: '#ffff00cc',
                    0.99999: '#80ff00b3',
                }
            },
            gradeRange: null
        },
    }
    zoomIsBlocked = false
    markerTextClasses = "absolute left-[-23px] top-[60px] w-[100px] font-bold text-xs drop-shadow-md shadow-black"
    blurBackgroundClasses = "absolute bottom-24 z-10 right-5 bg-white/50 backdrop-blur p-6 shadow-lg rounded-xl border-2 border-white min-w-72"

    zoomToItem(coord, zoom = 17) {
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
            this.blockZoom()
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

    constructor() {
        makeAutoObservable(this, {
            ymaps: observable.ref,
            mapRef: observable.ref,
        });
    }
}

export default MapStore = new MapStore()