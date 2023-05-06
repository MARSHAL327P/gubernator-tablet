import BeachCard from "../../BeachCard/components/BeachCard";
import { observer } from "mobx-react-lite";
import Search from "../../Search/components/Search";
import { Button } from "@material-tailwind/react";
import FilterStore from "../../Filter/store/filterStore";
import FixedHeader from "../../FixedHeader/FixedHeader";
import { useState } from "react";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Sidebar = observer(() => {
    let [elOffset, setElOffset] = useState(0)
    const iconStyles = "fill-white w-7 h-7"

    return (
        <div className={"h-full bg-white transition z-20"}>
            <FixedHeader elOffset={elOffset} classes={"px-3 py-7 mr-[6px]"}>
                <Search/>
                <Button
                    className={"flex items-center px-4 max-h-[48px]"}
                    onClick={() => {
                        FilterStore.isOpen = !FilterStore.isOpen
                    }}
                >
                    {
                        FilterStore.isOpen ?
                            <XMarkIcon className={iconStyles}/> :
                            <AdjustmentsVerticalIcon className={iconStyles}/>
                    }
                </Button>
            </FixedHeader>
            <div
                onScroll={(e) => {
                    setElOffset(e.currentTarget.scrollTop)
                }}
                className={"sidebar p-3 pb-7 overflow-auto transition flex flex-col gap-10"}>
                {FilterStore.filteredBeaches.length > 0 ?
                    FilterStore.filteredBeaches.map((beach) => {
                        return <BeachCard beach={beach} key={beach.id}/>
                    }) :
                    <div className={"w-[348px] text-center font-bold text-2xl"}>Нет результатов</div>
                }
            </div>
        </div>

    )
})

export default Sidebar