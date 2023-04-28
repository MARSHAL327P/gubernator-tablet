import BeachCard from "../../BeachCard/components/BeachCard";
import sidebarStore from "../store/sidebarStore";
import { observer } from "mobx-react-lite";
import Search from "../../Search/components/Search";
import Button from "../../RedefinedTags/components/Button";
import FilterStore from "../../Filter/store/filterStore";
import { ReactComponent as Settings } from "../../../assets/icons/Settings.svg";

const Sidebar = observer(() => {
    let filteredBeaches = sidebarStore.beachList
    let filterWidth = {
        transform: `translateX(${FilterStore.width}px)`
    }

    if( sidebarStore.searchQuery.trim() !== "" ){
        filteredBeaches = filteredBeaches
            .filter((beach) =>
                beach
                    .name
                    .toLowerCase()
                    .indexOf(sidebarStore.searchQuery.toLowerCase()) >= 0)
    }

    return (
        <div className={"h-full bg-white transition absolute"} style={FilterStore.isOpen ? filterWidth : {}}>
            <div className={"flex gap-4 py-7 transition px-3" + (sidebarStore.topOffset > 0 && sidebarStore.isOpen ? " shadow-xl" : "")}>
                <Search/>
                <Button onClick={() => {FilterStore.isOpen = !FilterStore.isOpen}} icon={Settings}/>
            </div>
            <div
                onScroll={(e) => {sidebarStore.topOffset = e.currentTarget.scrollTop}}
                className={"sidebar p-3 pb-7 overflow-auto transition flex flex-col gap-10" +
                    " z-[1]" + (!sidebarStore.isOpen ? " -translate-x-full" : "")}>
                {filteredBeaches.length > 0 ?
                    filteredBeaches.map((beach) => {
                        return <BeachCard {...beach} key={beach.id}/>
                    }) :
                    <div className={"w-[348px] text-center font-bold text-2xl"}>Нет результатов</div>
                }
            </div>
        </div>

    )
})

export default Sidebar