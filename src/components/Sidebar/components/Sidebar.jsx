import BeachCard from "../../BeachCard/components/BeachCard";
import { observer } from "mobx-react-lite";
import Search from "../../Search/components/Search";
import Button from "../../RedefinedTags/Button/Button";
import FilterStore from "../../Filter/store/filterStore";
import { ReactComponent as Settings } from "../../../assets/icons/Settings.svg";
import { ReactComponent as Close } from "../../../assets/icons/Close.svg";
import FixedHeader from "../../FixedHeader/FixedHeader";
import { useState } from "react";

const Sidebar = observer(() => {
    let [elOffset, setElOffset] = useState(0)

    let filterWidth = {
        transform: `translateX(${FilterStore.width}px)`
    }

    // console.log(toJS(FilterStore.filterInputs))

    return (
        <div className={"h-full bg-white transition absolute"} style={FilterStore.isOpen ? filterWidth : {}}>
            <FixedHeader elOffset={elOffset} classes={"px-3 py-7"}>
                <Search/>
                <Button
                    onClick={() => {FilterStore.isOpen = !FilterStore.isOpen}}
                    icon={FilterStore.isOpen ? Close : Settings}
                />
            </FixedHeader>
            <div
                onScroll={(e) => {setElOffset(e.currentTarget.scrollTop)}}
                className={"sidebar p-3 pb-7 overflow-auto transition flex flex-col gap-10" +
                    " z-[1]"}>
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