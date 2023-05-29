import {observer} from "mobx-react-lite";
import Search from "../../Search/components/Search";
import {Badge} from "@material-tailwind/react";
import FilterStore from "../../Filter/store/filter.store";
import FixedHeader from "../../FixedHeader/FixedHeader";
import {useEffect, useState} from "react";
import FilterBtn from "../../Filter/components/FilterBtn";
import TabHeader, {tabHeaderVariants} from "../../Tabs/components/TabHeader";
import {Tab} from "@headlessui/react";
import Card from "../../Card/components/Card"
import {useLocation} from "react-router-dom";
import {getIndexLinkInArray} from "../../../Utils";
import SidebarStore from "../store/sidebar.store";


const Sidebar = observer(({tabItems}) => {
    function changeSelectedTabClass(tabIndex){
        SidebarStore.selectedTabClass = tabItems[tabIndex].data
    }

    let [elOffset, setElOffset] = useState(0)
    const location = useLocation();
    let selectedTabIndex = getIndexLinkInArray(location.pathname, tabItems)

    useEffect(() => {
       SidebarStore.selectedTabClass = tabItems[0]?.data
    }, [])

    return (
        <div className={"h-full bg-white transition z-20"}>
            <FixedHeader elOffset={elOffset} classes={"px-3 py-7 mr-[6px]"}>
                <Search/>
                {FilterStore.numChangedParams > 0 ?
                    <Badge withBorder content={FilterStore.numChangedParams}>
                        <FilterBtn/>
                    </Badge> :
                    <FilterBtn/>
                }
            </FixedHeader>
            <Tab.Group defaultIndex={selectedTabIndex} onChange={changeSelectedTabClass}>
                <div
                    onScroll={(e) => {
                        setElOffset(e.currentTarget.scrollTop)
                    }}
                    className={"min-w-[400px] sidebar p-3 pb-7 overflow-auto transition"}>
                    <div className="mb-7">
                        <TabHeader
                            variant={tabHeaderVariants.WHITE}
                            size={"sm"}
                            tabItems={tabItems}
                        />
                    </div>

                    <Tab.Panels>
                        {tabItems.map((tab, idx) => {
                                return (
                                    <Tab.Panel key={idx} className="flex flex-col gap-10">
                                        <Card component={tab.component}
                                              loadingText={tab.loadingText}
                                              data={tab.data.filteredCards}
                                        />
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