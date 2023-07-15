import {observer} from "mobx-react-lite";
import Search from "../../Search/components/Search";
import {Badge} from "@material-tailwind/react";
import FilterStore from "../../Filter/store/filter.store";
import FixedHeader from "../../FixedHeader/FixedHeader";
import {useEffect, useRef, useState} from "react";
import FilterBtn from "../../Filter/components/FilterBtn";
import TabHeader, {tabHeaderVariants} from "../../Tabs/components/TabHeader";
import {Tab} from "@headlessui/react";
import Card from "../../Card/components/Card"
import {useLocation} from "react-router-dom";
import {getIndexLinkInArray} from "../../../Utils";
import SidebarStore from "../store/sidebar.store";
import {runInAction} from "mobx";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import FastFilter from "../../Filter/components/FastFilter";
import useWindowSize from "../../../hooks/useWindowSize";

const Sidebar = observer(({tabItems}) => {
    function changeSelectedTab(tabIndex) {
        runInAction(() => {
            SelectedClassInfoStore.initCurrentClass(tabItems[tabIndex].data)
            SidebarStore.searchQuery = ""
        })
    }

    const location = useLocation();
    let [width, height] = useWindowSize()
    let [elOffset, setElOffset] = useState(0)
    let selectedTabIndex = getIndexLinkInArray(location.pathname, tabItems)
    let fixedHeaderEl = useRef(null)
    let [fixedHeaderHeight, setFixedHeaderHeight] = useState(0)

    useEffect(() => {
        runInAction(() => {
            SelectedClassInfoStore.initCurrentClass(tabItems[selectedTabIndex].data)
        })
    }, [selectedTabIndex, tabItems])

    let currentClass = SelectedClassInfoStore.currentClass

    useEffect(() => {
        setFixedHeaderHeight(fixedHeaderEl.current.offsetHeight + (width > 1024 ? 0 : 40))
    }, [currentClass, currentClass?.isLoading, width])

    return (
        <div className={"h-full bg-white transition z-20 w-[460px] lg:w-full relative"}>

            <Tab.Group defaultIndex={selectedTabIndex} onChange={changeSelectedTab}>
                <FixedHeader ref={fixedHeaderEl} elOffset={elOffset} classes={"px-3 pb-3 pt-7 lg:pt-3 mr-[6px] flex-col"}>
                    <div className={"bg-gray-500 rounded-full w-[100px] h-1 hidden lg:block mx-auto"}></div>
                    <div className="flex gap-4">
                        <Search/>
                        {FilterStore.numChangedParams > 0 ?
                            <Badge withBorder content={FilterStore.numChangedParams}>
                                <FilterBtn/>
                            </Badge> :
                            <FilterBtn/>
                        }
                    </div>
                    <TabHeader
                        variant={tabHeaderVariants.WHITE}
                        size={"sm"}
                        tabItems={tabItems}
                    />
                    <FastFilter/>
                </FixedHeader>
                <div
                    onScroll={(e) => {
                        setElOffset(e.currentTarget.scrollTop)
                    }}
                    style={{
                        "height": `calc(100% - ${fixedHeaderHeight}px)`
                    }}
                    className={"sidebar p-3 pb-7 overflow-auto transition"}>

                    <Tab.Panels>
                        {tabItems.map((tab, idx) => {
                                return (
                                    <Tab.Panel key={idx} className={"flex flex-col"}>
                                        <Card/>
                                    </Tab.Panel>
                                )
                            }
                        )}
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </div>

    )
})

export default Sidebar