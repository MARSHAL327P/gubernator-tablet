import BeachCard from "../../BeachCard/components/BeachCard";
import sidebarStore from "../store/sidebarStore";
import { observer } from "mobx-react-lite";

const Sidebar = observer(({ classes = "" }) => {
    let filteredBeaches = sidebarStore.beachList

    if( sidebarStore.searchQuery.trim() !== "" ){
        filteredBeaches = filteredBeaches
            .filter((beach) =>
                beach
                    .name
                    .toLowerCase()
                    .indexOf(sidebarStore.searchQuery.toLowerCase()) >= 0)
    }

    return (
        <div
            onScroll={(e) => {sidebarStore.topOffset = e.currentTarget.scrollTop}}
            className={classes + " sidebar px-3 py-7 overflow-auto transition flex flex-col gap-10 z-[1] pt-[120px] " +
                " h-full" + (!sidebarStore.isOpen ? " -translate-x-full" : "")}>
            {filteredBeaches.length > 0 ?
                filteredBeaches.map((beach) => {
                return <BeachCard {...beach} key={beach.id}/>
            }) :
                <div className={"w-[348px] text-center font-bold text-2xl"}>Нет результатов</div>
            }
        </div>
    )
})

export default Sidebar