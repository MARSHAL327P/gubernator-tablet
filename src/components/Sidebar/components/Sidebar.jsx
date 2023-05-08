import BeachCard from "../../BeachCard/components/BeachCard";
import { observer } from "mobx-react-lite";
import Search from "../../Search/components/Search";
import { Button, Spinner, Tooltip } from "@material-tailwind/react";
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
                <Tooltip content={FilterStore.isOpen ? "Закрыть фильтр" : FilterStore.filteredBeaches ? "Фильтр пляжей" : "Фильтр недоступен"} >
                    <Button
                        className={"flex items-center px-4 max-h-[48px]"}
                        onClick={() => {
                            if( FilterStore.filteredBeaches !== null )
                                FilterStore.isOpen = !FilterStore.isOpen
                        }}
                    >
                        {
                            FilterStore.isOpen ?
                                <XMarkIcon className={iconStyles}/> :
                                <AdjustmentsVerticalIcon className={iconStyles}/>
                        }
                    </Button>
                </Tooltip>
            </FixedHeader>
            <div
                onScroll={(e) => {
                    setElOffset(e.currentTarget.scrollTop)
                }}
                className={"min-w-[400px] sidebar p-3 pb-7 overflow-auto transition flex flex-col gap-10"}>
                {
                    FilterStore.filteredBeaches === null ?
                        <div className={"flex items-center gap-3 mx-auto"}>
                            <Spinner className={"w-10 h-10"}/>
                            Загрузка пляжей
                        </div> :
                        FilterStore.filteredBeaches.length > 0 ?
                            FilterStore.filteredBeaches.map((beach) => {
                                return <BeachCard beach={beach} key={beach.id}/>
                            }) :
                            <div className={"text-center font-bold text-2xl"}>Нет результатов</div>
                }
            </div>
        </div>

    )
})

export default Sidebar