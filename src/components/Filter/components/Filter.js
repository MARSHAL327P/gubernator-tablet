import { observer } from "mobx-react-lite";
import FilterStore from "../store/filterStore";
import { useEffect, useRef } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

function input(){

}

const Filter = observer(() => {
    let filterEl = useRef(null)

    useEffect(() => {
        FilterStore.width = filterEl.current.offsetWidth
    }, [])

    return (
        <div ref={filterEl}
             className={"h-full bg-white p-7 transition" + (FilterStore.isOpen ? "" : " -translate-x-full")}>
            <div className={"text-title"}>Фильтр пляжей</div>
            {Object.keys(FilterStore.filterInputs).map((inputName) => {
                let inputParams = FilterStore.filterInputs[inputName]

                return (
                    <Accordion key={inputName} open={inputParams.open}>
                        <AccordionHeader onClick={ () => {inputParams.open = !inputParams.open}}>
                            {inputParams.name}
                        </AccordionHeader>
                        <AccordionBody>
                            asdd
                        </AccordionBody>
                    </Accordion>
                )
            })}

        </div>
    )
})

export default Filter