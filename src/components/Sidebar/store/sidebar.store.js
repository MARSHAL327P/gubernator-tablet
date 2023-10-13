import {makeAutoObservable} from "mobx";
import FilterStore from "../../Filter/store/filter.store";

class SidebarStore {
    searchQuery = ""
    touchStart = 0
    touchEnd = 0
    sidebarWrapper = null
    minSwipeDistance = 10
    mobileHideCards = true
    fixedHeaderHeight = 0
    deltaOffset = 0
    isUpSwipe = 0
    isDownSwipe = 0

    onTouchStart = (e) => {
        let isSidebarHeader = e.target.closest(".sidebar__header")

        this.touchEnd = null
        this.touchStart = document.querySelector(".sidebar").scrollTop <= 0 || isSidebarHeader ? e.targetTouches[0].clientY : 0
    }

    onTouchMove = (e) => {
        if (!this.touchStart) return

        this.touchEnd = e.targetTouches[0].clientY

        this.deltaOffset = this.touchStart - this.touchEnd
        let hasMoveDown = !this.mobileHideCards && this.deltaOffset < 0
        let hasMoveUp = this.mobileHideCards && this.deltaOffset > 0
        let offsetValue = `calc(100dvh - ${this.deltaOffset + this.fixedHeaderHeight}px)`
        this.isUpSwipe = this.deltaOffset > this.minSwipeDistance
        this.isDownSwipe = this.deltaOffset < -this.minSwipeDistance

        if (!this.mobileHideCards)
            offsetValue = `${30 + Math.abs(this.deltaOffset)}px`

        if ((hasMoveDown) || (hasMoveUp)) {
            this.sidebarWrapper.current.style.transition = "0s"
            this.sidebarWrapper.current.style.transform = `translateY(${offsetValue})`
        } else {
            this.touchEnd = null
        }
    }

    onTouchEnd = () => {
        if (!this.touchStart || !this.touchEnd) return

        if (this.isUpSwipe)
            this.toggleMobileHideCards(false)

        if (this.isDownSwipe && !this.mobileHideCards) {
            this.toggleMobileHideCards(true)
            FilterStore.isOpen = false
        } else {
            this.sidebarWrapper.current.style.transform = `translateY(calc(100dvh - ${this.fixedHeaderHeight}px))`
        }
    }

    toggleMobileHideCards(value) {
        this.mobileHideCards = value

        this.sidebarWrapper.current.style.transform = ``
        this.sidebarWrapper.current.style.transition = ".3s"
        setTimeout(() => {
            this.sidebarWrapper.current.style.transition = "0s"
        }, 300)
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default SidebarStore = new SidebarStore()