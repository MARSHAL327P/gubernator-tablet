import { ReactComponent as SearchIcon } from "../../../assets/icons/Search.svg";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import SidebarStore from "../../Sidebar/store/sidebar.store";

const Search = observer(() => {
    return (
        <div className={"relative w-full"}>
            <input className={"text-gray-500 transition bg-gray-200 rounded-xl py-3 px-5 flex " +
                "justify-between w-full focus:bg-white focus:shadow-lg outline-none"}
                   type="text"
                   placeholder={"Поиск..."}
                   value={SidebarStore.searchQuery}
                   onChange={action((e) => {SidebarStore.searchQuery = e.currentTarget.value})}
            />
            <SearchIcon className={"absolute top-[13px] right-5 fill-gray-500"}/>
        </div>
    )
})

export default Search