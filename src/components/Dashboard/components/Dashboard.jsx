import {observer} from "mobx-react-lite";
import {Tab} from '@headlessui/react'
import {useSearchParams} from "react-router-dom";
import {getIndexLinkInArray} from "../../../Utils";
import DashboardHeader from "./DashboardHeader";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Dashboard = observer(({tabItems, homeLink = "/"}) => {
    const [searchParams,] = useSearchParams();
    let card = SelectedClassInfoStore.currentClass?.card
    let selectedTabIndex = getIndexLinkInArray(searchParams.get("tab"), tabItems)


    return (<Tab.Group defaultIndex={selectedTabIndex}>
            <div
                className="border-b border-white fixed z-10 top-0 backdrop-blur bg-white/50 flex justify-between items-center px-7 py-4 w-full"
            >
                {
                    <DashboardHeader homeLink={homeLink} tabItems={tabItems}/>
                }
            </div>

            <Tab.Panels className={"p-7 w-screen min-h-[300px] bg-gray-50"}>
                {tabItems.map((tab) => {
                        return (card ?
                            <Tab.Panel key={tab.title}>{tab.content}</Tab.Panel> :
                            <Skeleton/>)
                    }
                )}
            </Tab.Panels>


        </Tab.Group>

    )
})

export default Dashboard