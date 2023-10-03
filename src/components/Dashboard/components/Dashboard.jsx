import {observer} from "mobx-react-lite";
import {Tab} from '@headlessui/react'
import {useSearchParams} from "react-router-dom";
import {getIndexLinkInArray} from "../../../Utils";
import DashboardHeader from "./DashboardHeader";
import useWindowSize from "../../../hooks/useWindowSize";
import {useEffect} from "react";
import DashboardToggleButton from "./DashboardToggleButton";
import SuspenseWrapper from "../../SuspenseWrapper/SuspenseWrapper";
import TabHeader, {tabHeaderVariants} from "../../Tabs/components/TabHeader";

const Dashboard = observer(({tabItems, homeLink = "/", card}) => {
    const [searchParams,] = useSearchParams();
    const [width] = useWindowSize()

    if (card)
        tabItems = tabItems.filter(tab => !(tab.link === "wqi" && !card.hasWaterQuality))

    let selectedTabIndex = getIndexLinkInArray(searchParams.get("tab"), tabItems)

    useEffect(() => {
        document.body.style.overflowY = "auto"
    }, [width])

    return (
        <Tab.Group defaultIndex={selectedTabIndex} selectedIndex={selectedTabIndex}>
            <DashboardHeader homeLink={homeLink} tabItems={tabItems}/>

            <Tab.Panels className={"p-7 lg:p-3 w-screen min-h-[300px] bg-gray-50 lg:mb-16"}>
                <div className="relative">
                    {
                        tabItems.map((tab) =>
                            <Tab.Panel key={tab.title}>
                                <SuspenseWrapper>
                                    {tab.content}
                                </SuspenseWrapper>
                            </Tab.Panel>
                        )
                    }
                    {
                        width > 1024 &&
                        <DashboardToggleButton/>
                    }
                </div>
            </Tab.Panels>
            {
                width <= 1280 && <TabHeader
                    variant={tabHeaderVariants.FULL}
                    tabItems={tabItems}
                    tabListClasses={"fixed bottom-0 left-0 bg-white w-full shadow-top z-20 justify-center !gap-0 h-[73px]"}
                    classes={"text-[10px]"}
                />
            }
        </Tab.Group>
    )
})

export default Dashboard