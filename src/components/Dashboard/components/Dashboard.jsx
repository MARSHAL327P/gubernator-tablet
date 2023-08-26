import {observer} from "mobx-react-lite";
import {Tab} from '@headlessui/react'
import {useSearchParams} from "react-router-dom";
import {getIndexLinkInArray} from "../../../Utils";
import DashboardHeader from "./DashboardHeader";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import DashboardStore from "../store/dashboard.store";
import {Button} from "@material-tailwind/react";
import cc from "classcat";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import MapControls from "../../Map/components/MapControls/MapControls";
import DrawerDashboard from "./DrawerDashboard";
import useWindowSize from "../../../hooks/useWindowSize";
import {useEffect} from "react";

const Dashboard = observer(({tabItems, homeLink = "/"}) => {
    const [searchParams,] = useSearchParams();
    const [width] = useWindowSize()

    let card = SelectedClassInfoStore.currentClass?.card
    let selectedTabIndex = getIndexLinkInArray(searchParams.get("tab"), tabItems)

    tabItems = tabItems.filter(tab => !(tab.link === "wqi" && !card?.waterQuality))


    useEffect(() => {
        document.body.style.overflowY = "auto"
    }, [width])

    return (
        <Tab.Group defaultIndex={selectedTabIndex}>
            <DashboardHeader homeLink={homeLink} tabItems={tabItems}/>

            <Tab.Panels className={"p-7 w-screen min-h-[300px] bg-gray-50"}>
                <div className="relative">
                    {
                        tabItems.map((tab) => <Tab.Panel key={tab.title}>{tab.content}</Tab.Panel>)
                    }
                    <div className={"absolute -top-20 right-0 w-full"}>
                        <Button
                            color={"white"}
                            className={"relative shadow-lg bottom-5 mx-auto z-20 px-4 rounded-xl w-fit"}
                            onClick={DashboardStore.toggleOpen.bind(DashboardStore)}
                        >
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={cc(["h-5 w-5 transition-transform", {
                                    "rotate-180": !DashboardStore.isOpen
                                }])}
                            />
                            {DashboardStore.isOpen ? "Скрыть" : "Раскрыть"}
                        </Button>
                        <MapControls/>
                    </div>
                </div>
            </Tab.Panels>
            {
                width <= 1024 && <DrawerDashboard tabItems={tabItems}/>
            }

        </Tab.Group>
    )
})

export default Dashboard