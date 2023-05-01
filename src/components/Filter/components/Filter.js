import { observer } from "mobx-react-lite";
import FilterStore from "../store/filterStore";
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionHeader, AccordionBody, Checkbox } from "@material-tailwind/react";
import filterStore from "../store/filterStore";
import FixedHeader from "../../FixedHeader/FixedHeader";

function setCheckedItems(e, item, inputName, inputParams){
    let isChecked = e.target.checked

    if( isChecked ){
        inputParams.selected.push(item)
    } else {
        let findItemIndex = FilterStore.filterInputs[inputName].selected.indexOf(item)

        if( findItemIndex !== -1 ){
            inputParams.selected.splice(findItemIndex, 1)
        }
    }

    FilterStore.filterInputs = {
        ...FilterStore.filterInputs,
        [inputName]: inputParams
    }
}

function inputValues(inputName, inputParams) {
    switch (inputParams.type) {
        case filterStore.filterTypes.selectFromTo.type:
            return <></>
        default:
            return (
                <div className={"flex flex-col"}>
                    {inputParams.variants.map((item, i) => {
                        return <Checkbox
                            key={inputName + "-" + i}
                            onChange={(e) => setCheckedItems(e, item, inputName, inputParams)}
                            id={inputName + "-" + i}
                            className={"checked:bg-primary checked:border-primary checked:before:bg-primary"}
                            label={item}
                            name={inputName}
                        />
                    })}
                </div>
            )
    }
}

const Filter = observer(() => {
    let filterEl = useRef(null)
    let [elOffset, setElOffset] = useState(0)

    useEffect(() => {
        FilterStore.width = filterEl.current.offsetWidth
    }, [])

    return (
        <div ref={filterEl}
             className={"h-full bg-white transition" + (FilterStore.isOpen ? "" : " -translate-x-full")}>
            <FixedHeader elOffset={elOffset} classes={"py-7 px-7 items-baseline"}>
                <div className={"text-title"}>Фильтр пляжей</div>
                <span>Очистить</span>
            </FixedHeader>
            <div
                className={"overflow-auto p-7 pt-0 transition filter"}
                onScroll={(e) => {
                    setElOffset(e.currentTarget.scrollTop)
                }}
            >
                {Object.keys(FilterStore.filterInputs).map((inputName) => {
                    let inputParams = FilterStore.filterInputs[inputName]

                    return (
                        <Accordion key={inputName} open={inputParams.open}>
                            <AccordionHeader onClick={() => {
                                inputParams.open = !inputParams.open
                            }}>
                                {inputParams.name}
                            </AccordionHeader>
                            <AccordionBody>
                                {inputValues(inputName, inputParams)}
                            </AccordionBody>
                        </Accordion>
                    )
                })}
            </div>
        </div>
    )
})

export default Filter