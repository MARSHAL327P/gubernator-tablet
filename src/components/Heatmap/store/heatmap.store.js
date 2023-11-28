import {makeAutoObservable, runInAction} from "mobx";
import GlobalStore from "../../../stores/global.store";
import axios from "axios";
import HeatmapTimelineStore from "./heatmapTimeline.store";
import IndicationsStore from "../../Indications/store/indications.store";
import MapStore from "../../Map/store/map.store";
import dayjs from "dayjs";
import SidebarStore from "../../Sidebar/store/sidebar.store";

class HeatmapStore {
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
    tileSize = 256;
    indicationData = null
    currentValue = null

    get selectedAdditionalLayer() {
        let layer = Object.values(this.additionalLayers).find((layerData) => layerData.selected)
        GlobalStore.selectedAdditionalLayer = layer

        return layer
    }

    selectAdditionalLayer(layerName) {
        let lastSelectedAdditionalLayer = this.selectedAdditionalLayer
        let layerData = this.additionalLayers[layerName]

        if( window.outerWidth > 1024 )
            SidebarStore.isOpen = false
        layerData.selected = !layerData.selected

        if (layerData.selected)
            layerData.isLoading = true

        if (!lastSelectedAdditionalLayer && MapStore.location.zoom > 10) {
            MapStore.setLocationParams({
                ...MapStore.location,
                zoom: 10
            })
        }

        this.generateTilesAndData(layerData)

        if (lastSelectedAdditionalLayer)
            lastSelectedAdditionalLayer.selected = false

        if( lastSelectedAdditionalLayer?.indicationData.indicationName === layerData.indicationData.indicationName){
            HeatmapTimelineStore.nowSelectedDate = dayjs()
            HeatmapTimelineStore.stopTimelineAnimation()
            SidebarStore.isOpen = true
        }

    }

    generateTilesAndData(layerData) {
        let nclName = layerData.indicationData.nclName

        if (this.currentValue !== null)
            this.currentValue = {
                ...this.currentValue,
                value: null
            }
        this.indicationData = null
        GlobalStore.generateNewHeatmap = true

        axios.get(process.env.REACT_APP_TILES_DATA + `?datetime=${HeatmapTimelineStore.formattedSelectedDatetime}`)
            .then(({data}) => {
                runInAction(() => {
                    layerData.gradeRange = data[nclName]
                })
            })

        this.fetchIndicationData(nclName)
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

        base_image.src = `${process.env.REACT_APP_TILES}/${layer.indicationData.nclName}/${z}/${x}/${y}?datetime=${HeatmapTimelineStore.formattedSelectedDatetime}`;
        base_image.onload = () => {
            runInAction(() => {
                layer.isLoading = false
            })

            ctx.drawImage(base_image, 0, 0);
        }

        GlobalStore.generateNewHeatmap = false

        return {image: canvas};
    }

    findCurrentValue(object, event) {
        if (object?.type === "marker")
            return false

        let coords = event.coordinates
        let searchLat = coords[1]
        let searchLon = coords[0]

        this.currentValue = {
            coord: coords,
            value: null
        }

        if (!this.indicationData)
            return false

        let findLat = Object.keys(this.indicationData).reduce((acc, obj) =>
            (Math.abs(searchLat - obj) <= Math.abs(searchLat - acc)) ? obj : acc
        );

        let findLon = Object.keys(this.indicationData[findLat]).reduce((acc, obj) =>
            (Math.abs(searchLon - obj) <= Math.abs(searchLon - acc)) ? obj : acc
        );

        let pointInRectangle = searchLat > 46.3044 || searchLat < 44.0737 || searchLon < 31.9598 || searchLon > 37.0402
        if (pointInRectangle || !this.indicationData[findLat][findLon]) {
            this.currentValue.value = undefined
        } else {
            this.currentValue.value = this.indicationData[findLat][findLon]
        }
    }

    fetchIndicationData(indication) {
        this.indicationDataActiveRequest && this.indicationDataActiveRequest.abort();
        let request = this.indicationDataActiveRequest = new AbortController();

        axios({
            method: "get",
            url: `${process.env.REACT_APP_TILES_POINT_DATA}/${indication}?datetime=${HeatmapTimelineStore.formattedSelectedDatetime}`,
            signal: request.signal
        })
            .then(({data}) => {
                runInAction(() => {
                    this.indicationData = data
                })
            })
    }

    get currentValueText() {
        let indication = this.selectedAdditionalLayer.indicationData
        return `${this.currentValue.value} ${indication.unitsFull ?? indication.units}`
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default HeatmapStore = new HeatmapStore()