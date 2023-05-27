import BeachCard from "../../BeachCard/components/BeachCard";
import {observer} from "mobx-react-lite";
import Search from "../../Search/components/Search";
import {Badge, Button, Spinner, Tooltip} from "@material-tailwind/react";
import FilterStore from "../../Filter/store/filterStore";
import FixedHeader from "../../FixedHeader/FixedHeader";
import {useState} from "react";
import {AdjustmentsVerticalIcon} from "@heroicons/react/24/solid";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {action} from "mobx";
import BeachLocalStore from "../../BeachCard/store/beachLocalStore";
import FilterBtn from "../../Filter/components/FilterBtn";

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
            <div
                onScroll={(e) => {
                    setElOffset(e.currentTarget.scrollTop)
                }}
                className={"min-w-[400px] sidebar p-3 pb-7 overflow-auto transition"}>
                <div className={"mb-7"}>
                    ads
                </div>
                <div className={"flex flex-col gap-10"}>
                    {
                        BeachLocalStore.isLoading ?
                            <div className={"flex items-center gap-3 mx-auto"}>
                                <Spinner className={"w-10 h-10"}/>
                                Загрузка пляжей
                            </div> :
                            filteredBeaches.length > 0 ?
                                filteredBeaches.map((beach) => {
                                    return <BeachCard beach={beach} key={beach.id}/>
                                }) :
                                <div className={"text-center font-bold text-2xl"}>Нет результатов</div>
                    }
                </div>
            </div>
        </div>

    )
})

export default Sidebar