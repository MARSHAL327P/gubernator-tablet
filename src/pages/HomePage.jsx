import Sidebar from "../components/Sidebar/components/Sidebar";
import Filter from "../components/Filter/components/Filter";
import {observer} from "mobx-react-lite";
import FilterStore from "../components/Filter/store/filter.store";
import cc from "classcat";
import {ReactComponent as Chevron} from "../assets/icons/Chevron.svg";
import {useEffect, useRef, useState} from "react";
import Ripple from "../components/RedefinedTags/Ripple/Ripple";
import {Tooltip} from "@material-tailwind/react";
import SidebarStore from "../components/Sidebar/store/sidebar.store";
import useWindowSize from "../hooks/useWindowSize";
import BeachLocalStore from "../components/BeachCard/store/beachLocal.store";
import RealObjectStore from "../components/RealObjects/store/realObject.store";
import SelectedClassInfoStore from "../stores/selectedClassInfo.store";
import {runInAction} from "mobx";

let tabItems = [
    {
        title: "Пляжи",
        data: BeachLocalStore,
        selected: true,
        link: "/",
        onClick: onTabClick
    },
    {
        title: "Объекты",
        data: RealObjectStore,
        selected: false,
        link: "/object",
        onClick: onTabClick
    },
]

function onTabClick(isSelected, e) {
    if (SelectedClassInfoStore.currentClass.isLoading)
        e.preventDefault()
    if (isSelected)
        SidebarStore.toggleMobileHideCards(false)
}

const HomePage = observer(() => {
    let sidebarWrapper = useRef(null)
    let [width] = useWindowSize()
    let styles = {
        sidebarWrapper: {
            transform: width <= 1024 &&
                !FilterStore.isOpen &&
                SidebarStore.isOpen &&
                SidebarStore.mobileHideCards &&
                `translateY(calc(100dvh - ${SidebarStore.fixedHeaderHeight}px))`
        }
    }

    useEffect(() => {
        SidebarStore.sidebarWrapper = sidebarWrapper
    }, [sidebarWrapper])

    useEffect(() => {
        document.body.style.overflowY = width > 1024 ? "auto" : "hidden"
    }, [width])

    return (
        <>
            <div
                style={styles.sidebarWrapper}
                ref={sidebarWrapper}
                id={"sidebar"}
                className={cc(["flex drop-shadow-xl h-full transition lg:duration-0 lg:w-screen lg:overflow-hidden absolute top-0 left-0 z-50", {
                    "translate-x-0": !FilterStore.isOpen && SidebarStore.isOpen && SidebarStore.mobileHideCards,
                    "lg:translate-y-0": !SidebarStore.mobileHideCards,
                    "-translate-x-full": !FilterStore.isOpen && !SidebarStore.isOpen,
                    "-translate-x-[200%]": FilterStore.isOpen && !SidebarStore.isOpen
                }])}
            >
                <div className={"w-full"}>
                    <Sidebar tabItems={tabItems}/>
                </div>

                {
                    <div className={cc(["transition flex absolute h-full lg:z-20 lg:w-full", {
                        "translate-x-0 lg:translate-x-full": !FilterStore.isOpen,
                        "translate-x-[calc(100%-21px)] lg:translate-x-0": FilterStore.isOpen,
                    }])}>
                        <Filter/>
                        <Tooltip content={!SidebarStore.isOpen ? "Открыть боковую панель" : "Скрыть боковую панель"}>
                            <div
                                className={cc(["lg:hidden overflow-hidden relative left-5 top-7 bg-white hover:bg-gray-200 " +
                                "hover:cursor-pointer transition rounded-xl py-4 px-3 h-fit"])}
                                onClick={() => runInAction(() => {SidebarStore.isOpen = !SidebarStore.isOpen})}
                            >
                                <Chevron className={cc(["transition rotate-0", {
                                    "rotate-180": !SidebarStore.isOpen
                                }])}/>
                                <Ripple color={"rgba(0,0,0,.6)"}/>
                            </div>
                        </Tooltip>
                    </div>
                }

            </div>
            {/*<AdminBtn/>*/}
        </>
    )
})

export default HomePage