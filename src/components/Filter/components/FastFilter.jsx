import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import FilterStore from "../store/filter.store";
import {toJS} from "mobx";

const FastFilter = observer(() => {
    if( !SelectedClassInfoStore.currentClass.fastFilter ) return null

    let fastFilter = SelectedClassInfoStore.currentClass.fastFilter

    return Object.keys(fastFilter).map(filterSection => {
        // console.log(toJS(FilterStore.filterInputs))
        return (
            <div key={filterSection} className={"flex gap-3"}>

            </div>
        )
    })
})

export default FastFilter