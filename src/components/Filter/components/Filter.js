import { observer } from "mobx-react-lite";
import FilterStore from "../store/filterStore";
import { useEffect, useRef } from "react";


const Filter = observer(() => {
    let filterEl = useRef(null)

    useEffect(() => {
        FilterStore.width = filterEl.current.offsetWidth
    }, [])

    return (
        <div ref={filterEl} className={"h-full bg-white p-7 transition" +  (FilterStore.isOpen ? "" : " -translate-x-full")}>
            test
        </div>
    )
})

export default Filter