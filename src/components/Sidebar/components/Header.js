import { ReactComponent as Chevron } from "../../../assets/icons/Chevron.svg";
import sidebarStore from "../store/sidebarStore";
import { observer } from "mobx-react-lite";
import FilterStore from "../../Filter/store/filterStore";

const Header = observer(({classes}) => {
    return (
        <div className={classes + (FilterStore.isOpen ? "" : " ") + " transition flex gap-4 absolute top-0 left-0 z-[2]"}>

            <div className={"bg-white rounded-lg shadow px-3 py-4 mt-7 " +
                "absolute right-[-60px] hover:bg-gray-200 hover:cursor-pointer " +
                "transition " + (!sidebarStore.isOpen ? "translate-x-[-20px]" : "")} onClick={() => {sidebarStore.isOpen = !sidebarStore.isOpen}}>
                <Chevron className={ "transition" + (!sidebarStore.isOpen ? " rotate-180" : "")}/>
            </div>
        </div>
    );
})

export default Header