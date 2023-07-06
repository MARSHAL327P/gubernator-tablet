import {makeAutoObservable, observable, runInAction} from "mobx";
import axios from "axios";
import IndicationsStore from "../../Indications/store/indications.store";

class MapStore {
    ymaps = null
    mapRef = null
    queryParam = null
    additionalLayers = {
        temperature: {
            fetchData: this.showHeatmap.bind(this),
            data: null,
            heatmapObject: null,
            apiUrl: process.env.REACT_APP_HEATMAP,
            selected: false,
            indicationData: IndicationsStore.indications.temperature,
            isLoading: false
        },
        t_surf: {
            fetchData: this.showHeatmap.bind(this),
            data: null,
            heatmapObject: null,
            apiUrl: "http://185.180.230.129:8081/api/layers/water",
            selected: false,
            indicationData: IndicationsStore.indications.t_surf,
            isLoading: false
        },
    }
    zoomIsBlocked = false
    markerTextClasses = "absolute left-[-23px] top-[60px] w-[100px] font-bold text-xs drop-shadow-md shadow-black"

    zoomToItem(coord, zoom = 17){
        if( this.zoomIsBlocked )
            zoom = 13

        this.mapRef.current.setCenter([coord[0] + 0.0001, coord[1]], zoom, {
            duration: 500,
            timingFunction: "ease"
        })
    }

    get selectedAdditionalLayer(){
        return Object.values(this.additionalLayers).find((layerData) => layerData.selected)
    }

    selectAdditionalLayer(layerName){
        let lastSelectedAdditionalLayer = this.selectedAdditionalLayer
        let layerData = this.additionalLayers[layerName]

        layerData.selected = !layerData.selected

        if( lastSelectedAdditionalLayer && lastSelectedAdditionalLayer.heatmapObject ){
            lastSelectedAdditionalLayer.heatmapObject.destroy()
            lastSelectedAdditionalLayer.selected = false
        }

        if( layerData.selected && this.selectedAdditionalLayer.data ){
            this.selectedAdditionalLayer.heatmapObject.setMap(this.mapRef.current)
        } else if( layerData.selected ){
            runInAction(() => {
                this.selectedAdditionalLayer.isLoading = true
            })
            layerData.fetchData()
        }

        if( this.selectedAdditionalLayer ){
            this.blockZoom()
        } else {
            this.unBlockZoom()
        }
    }

    async loadHeatmapLibrary() {
        let {yandexHeatmap} = await import('../libs/heatmap');

        yandexHeatmap(this.ymaps)
    }

    showHeatmap(){
        if (!this.ymaps) return

        this.loadHeatmapLibrary().then(() => {
            axios.get(this.selectedAdditionalLayer.apiUrl)
                .then(({data}) => {
                    this.selectedAdditionalLayer.data = data
                    this.setHeatmap()
                })
        })
    }

    setHeatmap(){
        this.ymaps.ready(['Heatmap']).then(() => {
            this.selectedAdditionalLayer.heatmapObject = new this.ymaps.Heatmap(this.selectedAdditionalLayer.data, {
                // The radius of influence.
                radius: 70,
                // Whether to reduce the pixel size of the dots when reducing the zoom. False - Do not reduce the size.
                dissipating: false,
                // The transparency of the heatmap.
                opacity: 0.5,
                // The transparency of the median weight point.
                intensityOfMidpoint: 0.3,
                // JSON description of the gradient.
                gradient: {
                    0.1: 'rgba(128, 255, 0, 0.7)',
                    0.2: 'rgba(255, 255, 0, 0.8)',
                    0.7: 'rgba(234, 72, 58, 0.9)',
                    1.0: 'rgba(162, 36, 25, 1)'
                }
                // gradient: {
                //     0.1:  'rgba(162, 36, 25, 1)'
                //     0.2: 'rgba(234, 72, 58, 0.9)',
                //     0.7: 'rgba(255, 255, 0, 0.8)',
                //     1.0:'rgba(128, 255, 0, 0.7)',
                // }
            });

            this.selectedAdditionalLayer.heatmapObject.setMap(this.mapRef.current);
            runInAction(() => {
                this.selectedAdditionalLayer.isLoading = false
            })
        })
    }

    blockZoom(zoomValue = 13){
        this.zoomToItem([44.577681655459656, 33.49127241954839], zoomValue)
        this.mapRef.current.behaviors.disable("scrollZoom")
        this.zoomIsBlocked = true
    }

    unBlockZoom(){
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