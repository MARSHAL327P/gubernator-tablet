import {makeAutoObservable} from "mobx";
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
    nowSelectedDate = dayjs()
    hoveredDate = dayjs()
    lineWidthRef = null
    timerId = null
    leftOffsetToNowHours = null
    isHovered = false
    isDraggable = false
    hoverDistance = 0
    draggableWidthElapsedTime = null

    toggleTimelineAnimation() {
        if (this.isLastDay)
            this.nowSelectedDate = dayjs()

        if (this.timerId) {
            this.stopTimelineAnimation()
            return
        }

        this.startTimelineAnimation()
        this.timerId = setInterval(this.startTimelineAnimation.bind(this), 1000) // 800
    }

    startTimelineAnimation() {
        if (this.isLastDay) {
            this.stopTimelineAnimation()
            return
        }
        this.animationStarted = true

        this.nowSelectedDate = this.nowSelectedDate.add(1, "hour")
        HeatmapStore.generateTilesAndData(HeatmapStore.selectedAdditionalLayer)
    }

    stopTimelineAnimation() {
        clearInterval(this.timerId)
        this.timerId = null
        this.animationStarted = false
    }

    goToDate(date = dayjs()) {
        this.nowSelectedDate = date
        HeatmapStore.generateTilesAndData(HeatmapStore.selectedAdditionalLayer)
        this.stopTimelineAnimation()
    }

    onTimelineMouseLeave() {
        this.isHovered = false
    }

    onTimelineMouseEnter() {
        this.isHovered = true
    }

    onTimelineMouseUp() {
        this.isDraggable = false
        this.draggableWidthElapsedTime = null
    }

    onTimelineMouseDown() {
        this.isDraggable = true
    }

    onTimelineMouseMove(e) {
        let mouseX = e.clientX;
        let targetX = e.currentTarget.getBoundingClientRect().left;
        this.hoverDistance = mouseX - targetX;
        let hourNum = Math.round(this.hoverDistance / this.pixelsInHours)
        this.hoveredDate = dayjs().startOf('day').add(hourNum, 'hour')

        // if(this.isDraggable){
        //     this.draggableWidthElapsedTime = this.hoverDistance
        //     HeatmapStore.generateTilesAndData(HeatmapStore.selectedAdditionalLayer)
        // }
    }

    diffDateWithNow(date1, date2 = dayjs()) {
        return Math.ceil(date1.diff(date2, "hour", true))
    }

    get formattedHoveredDate() {
        return capitalizeFirstLetter(this.hoveredDate.format(this.fullFormat))
    }

    get differentHourFromNow() {
        return this.diffDateWithNow(this.nowSelectedDate)
    }

    get isLastDay() {
        let lastDay = dayjs().startOf('day').add(this.numDays, 'day')
        return this.diffDateWithNow(this.nowSelectedDate, lastDay) === 0
    }

    get totalHours() {
        return this.numDays * 24
    }

    get formattedDate() {
        return capitalizeFirstLetter(this.nowSelectedDate.format(this.fullFormat))
    }

    get hoursPassed() {
        let startOfDay = dayjs().startOf('day');
        return this.nowSelectedDate.diff(startOfDay, 'hour');
    }

    get pixelsInHours() {
        return this.lineWidthRef.clientWidth / this.totalHours
    }

    get widthElapsedTime() {
        if (!this.lineWidthRef) return 0

        let widthElapsedTime = this.hoursPassed * this.pixelsInHours

        if (!this.leftOffsetToNowHours)
            this.leftOffsetToNowHours = widthElapsedTime

        return widthElapsedTime
    }

    get days() {
        return new Array(this.numDays)
            .fill(null)
            .map((item, i) => dayjs().add(i, 'day').format(this.shortFormat))
    }

    get formattedSelectedDatetime() {
        return this.nowSelectedDate.format(dayjsDefaultDateFormat + "_" + dayjsZeroTimeFormat)
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default HeatmapTimelineStore = new HeatmapTimelineStore()