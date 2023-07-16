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
import FastFilter from "../components/Filter/components/FastFilter";
import useWindowSize from "../hooks/useWindowSize";

const HomePage = observer(({tabItems}) => {
    let [hideSidebar, setHideSidebar] = useState(false)
    let sidebarWrapper = useRef(null)
    let [width] = useWindowSize()
    let styles = {
        sidebarWrapper: {
            transform: width <= 1024 && !FilterStore.isOpen && !hideSidebar && SidebarStore.mobileHideCards && `translateY(calc(100% - ${SidebarStore.fixedHeaderHeight}px))`
        }
    }


    useEffect(() => {
        SidebarStore.sidebarWrapper = sidebarWrapper
    }, [sidebarWrapper])

    return (
        <>
            <div
                style={styles.sidebarWrapper}
                ref={sidebarWrapper}
                className={cc(["flex drop-shadow-xl h-full transition lg:duration-0 lg:w-screen lg:overflow-hidden absolute top-0 left-0 z-20", {
                    "translate-x-0": !FilterStore.isOpen && !hideSidebar && SidebarStore.mobileHideCards,
                    "lg:translate-y-[30px]": !SidebarStore.mobileHideCards,
                    "-translate-x-full": !FilterStore.isOpen && hideSidebar,
                    "-translate-x-[200%]": FilterStore.isOpen && hideSidebar
                }])}
            >
                <div className={"w-full"}>
                    {
                        width <= 1024 && <FastFilter classes={"gap-3"} itemClasses={"bg-white"}/>
                    }
                    <Sidebar tabItems={tabItems}/>
                </div>

                <div className={cc(["transition flex absolute h-full lg:z-20 lg:w-full", {
                    "translate-x-0 lg:translate-x-full": !FilterStore.isOpen,
                    "translate-x-[calc(100%-21px)] lg:translate-x-0": FilterStore.isOpen,
                }])}>
                    <Filter/>
                    <Tooltip content={hideSidebar ? "Открыть боковую панель" : "Скрыть боковую панель"}>
                        <div
                            className={cc(["lg:hidden overflow-hidden rotate-0 relative left-5 top-7 bg-white hover:bg-gray-200 " +
                            "hover:cursor-pointer transition rounded-xl py-4 px-3 h-fit", {
                                "rotate-180": hideSidebar
                            }])}
                            onClick={() => setHideSidebar(hideSidebar => !hideSidebar)}
                        >
                            <Chevron/>
                            <Ripple color={"rgba(0,0,0,.6)"}/>
                        </div>
                    </Tooltip>
                </div>
            </div>
            {/*<AdminBtn/>*/}
        </>
    )
})

export default HomePage