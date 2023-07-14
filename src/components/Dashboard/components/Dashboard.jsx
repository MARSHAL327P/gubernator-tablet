import {observer} from "mobx-react-lite";
import {Tab} from '@headlessui/react'
import {useSearchParams} from "react-router-dom";
import {getIndexLinkInArray} from "../../../Utils";
import DashboardHeader from "./DashboardHeader";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import DashboardStore from "../store/dashboard.store";
import {Button} from "@material-tailwind/react";
import cc from "classcat";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import MapControls from "../../Map/components/MapControls";

const Dashboard = observer(({tabItems, homeLink = "/"}) => {
    const [searchParams,] = useSearchParams();
    let card = SelectedClassInfoStore.currentClass?.card
    let selectedTabIndex = getIndexLinkInArray(searchParams.get("tab"), tabItems)
    // tabItems = tabItems.filter(tab => !(tab.link === "wqi" && !card.waterQuality))


    return (<Tab.Group defaultIndex={selectedTabIndex}>
            <div
                className="border-b border-white fixed z-50 top-0 backdrop-blur bg-white/50 flex justify-between items-center px-7 py-4 w-full"
            >
                <DashboardHeader homeLink={homeLink} tabItems={tabItems}/>
            </div>

            <Tab.Panels className={"p-7 w-screen min-h-[300px] bg-gray-50"}>
                <div className="relative">
                    {
                        card ?
                            tabItems.map((tab) => <Tab.Panel key={tab.title}>{tab.content}</Tab.Panel>) :
                            <Skeleton count={5}/>
                    }
                    {
                        DashboardStore.isDashboard() &&
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
                    }
                </div>


            </Tab.Panels>
        </Tab.Group>

    )
})

export default Dashboard