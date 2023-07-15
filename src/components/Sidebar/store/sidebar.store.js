import { makeAutoObservable } from "mobx";

class SidebarStore {
    searchQuery = ""
    touchStart = 0
    touchEnd = 0
    sidebarWrapper = null
    minSwipeDistance = 10
    mobileHideCards = true

    onTouchStart = (e) => {
        this.touchEnd = null
        this.touchStart = e.targetTouches[0].clientY
    }

    onTouchMove = (e) => {
        let clientYOffset = e.targetTouches[0].clientY

        this.touchEnd = clientYOffset

        if ((window.innerHeight - clientYOffset) > 148)
            this.sidebarWrapper.current.style.transform = `translateY(${clientYOffset}px)`
    }

    onTouchEnd = () => {
        if (!this.touchStart || !this.touchEnd) return
        const distance = this.touchStart - this.touchEnd
        const isUpSwipe = distance > this.minSwipeDistance
        const isDownSwipe = distance < -this.minSwipeDistance

        this.sidebarWrapper.current.style.transform = ``
        this.sidebarWrapper.current.style.transition = ".3s"

        if (isUpSwipe)
            this.mobileHideCards = false

        if( isDownSwipe )
            this.mobileHideCards = true

        setTimeout(() => {
            this.sidebarWrapper.current.style.transition = "0s"
        }, 300)
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default SidebarStore = new SidebarStore()