import { ReactComponent as SearchIcon } from "../../../assets/icons/Search.svg";
import sidebarStore from "../../Sidebar/store/sidebarStore";
import { observer } from "mobx-react-lite";

const Search = observer(() => {
    return (
        <div className={"relative"}>
            <input className={"text-gray-500 transition bg-gray-200 rounded-xl py-3 px-5 flex " +
                "justify-between w-[287px]" + (!sidebarStore.isOpen ? " bg-white shadow-lg" : "")}
                   type="text"
                   placeholder={"Поиск..."}
                   onChange={(e) => {sidebarStore.searchQuery = e.currentTarget.value}}
            />
            <SearchIcon className={"absolute top-[13px] right-5 fill-gray-500"}/>
        </div>
    )
})

export default Search