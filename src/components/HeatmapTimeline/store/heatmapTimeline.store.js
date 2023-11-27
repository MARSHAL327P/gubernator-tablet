import {makeAutoObservable, runInAction} from "mobx";
import dayjs from "dayjs";
import {capitalizeFirstLetter, dayjsDefaultDateFormat, dayjsZeroTimeFormat} from "../../../Utils";
import HeatmapStore from "./heatmap.store";

require('dayjs/locale/ru')  // Загружаем русскую локализацию
dayjs.locale('ru') // Используем русскую локализацию

class HeatmapTimelineStore {
    numDays = 3
    animationStarted = false
    shortFormat = "dddd, DD"
    fullFormat = "dddd, DD - HH:00"
    nowSelectedData = dayjs()
    lineWidthRef = null
    timerId = null

    toggleTimelineAnimation() {
        if (this.isLastDay)
            this.nowSelectedData = dayjs()

        if (this.timerId) {
            this.stopTimelineAnimation()
            return
        }

        this.animationStarted = true
        this.timerId = setInterval(() => {
            runInAction(() => {
                if (this.isLastDay)
                    this.stopTimelineAnimation()

                this.nowSelectedData = this.nowSelectedData.add(1, "hour")
                HeatmapStore.generateTilesAndData(HeatmapStore.selectedAdditionalLayer)
            })
        }, 1000) // 800
    }

    stopTimelineAnimation() {
        clearInterval(this.timerId)
        this.timerId = null
        this.animationStarted = false
    }

    get isLastDay() {
        let lastDay = dayjs().startOf('day').add(this.numDays, 'day')
        return this.nowSelectedData.diff(lastDay, "hour") === 0
    }

    get totalHours() {
        return this.numDays * 24
    }

    get formattedData() {
        return capitalizeFirstLetter(this.nowSelectedData.format(this.fullFormat))
    }

    get hoursPassed() {
        let startOfDay = dayjs().startOf('day');
        return this.nowSelectedData.diff(startOfDay, 'hour');
    }

    get widthElapsedTime() {
        if (!this.lineWidthRef) return 0
        let pixelsInHours = this.lineWidthRef.clientWidth / this.totalHours

        return this.hoursPassed * pixelsInHours
    }

    get days() {
        return new Array(this.numDays)
            .fill(null)
            .map((item, i) => dayjs().add(i, 'day').format(this.shortFormat))
    }

    get formattedSelectedDatetime(){
        return this.nowSelectedData.format(dayjsDefaultDateFormat + "_" + dayjsZeroTimeFormat)
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default HeatmapTimelineStore = new HeatmapTimelineStore()