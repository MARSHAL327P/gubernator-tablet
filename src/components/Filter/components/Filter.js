import { observer } from "mobx-react-lite";
import FilterStore from "../store/filterStore";


const Filter = observer(({ classes }) => {
    return (
        <div className={ classes + (FilterStore.isOpen ? ""  : " -translate-x-full" )  + " p-7"}>
            test
        </div>
    )
})

export default Filter