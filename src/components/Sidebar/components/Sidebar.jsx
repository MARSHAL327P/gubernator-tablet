import BeachCard from "../../BeachCard/components/BeachCard";
import {observer} from "mobx-react-lite";
import Search from "../../Search/components/Search";
import {Badge, Button, Spinner, Tooltip} from "@material-tailwind/react";
import FilterStore from "../../Filter/store/filterStore";
import FixedHeader from "../../FixedHeader/FixedHeader";
import {useState} from "react";
import {AdjustmentsVerticalIcon, HomeIcon} from "@heroicons/react/24/solid";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {action} from "mobx";
import BeachLocalStore from "../../BeachCard/store/beachLocalStore";
import FilterBtn from "../../Filter/components/FilterBtn";
import Loading from "../../Loading/components/Loading";
import {Link} from "react-router-dom";
import TabHeader, {tabHeaderVariants} from "../../Tabs/components/TabHeader";
import AdminBtn from "../../AdminPanel/components/AdminBtn";
import {Tab} from "@headlessui/react";
import SidebarStore from "../store/sidebarStore";

const Sidebar = observer(() => {

    let [elOffset, setElOffset] = useState(0)
    let filteredBeaches = FilterStore.filteredBeaches

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
            <Tab.Group>
                <div
                    onScroll={(e) => {
                        setElOffset(e.currentTarget.scrollTop)
                    }}
                    className={"min-w-[400px] sidebar p-3 pb-7 overflow-auto transition"}>
                    <div className="mb-7">
                        <TabHeader variant={tabHeaderVariants.WHITE} size={"sm"} tabItems={SidebarStore.tabItems}/>
                    </div>

                    <Tab.Panels>
                        {SidebarStore.tabItems.map((tab, idx) => {
                                return <Tab.Panel key={idx} className="flex flex-col gap-10">
                                    {
                                        BeachLocalStore.isLoading ?
                                            <Loading text={"Загрузка пляжей"}/> :
                                            filteredBeaches.length > 0 ?
                                                filteredBeaches.map((beach) => {
                                                    return <BeachCard beach={beach} key={beach.id}/>
                                                }) :
                                                <div className={"text-center font-bold text-2xl"}>Нет результатов</div>
                                    }
                                </Tab.Panel>
                            }
                        )}
                    </Tab.Panels>
                </div>
            </Tab.Group>

        </div>

    )
})

export default Sidebar