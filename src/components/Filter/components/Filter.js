import { observer } from "mobx-react-lite";
import FilterStore from "../store/filterStore";
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionHeader, AccordionBody, Checkbox, Input } from "@material-tailwind/react";
import FixedHeader from "../../FixedHeader/FixedHeader";
import { toJS } from "mobx";

function findSelectedItem(inputName, item) {
    return FilterStore.filterInputs[inputName].selected.indexOf(item)
}

function setCheckedItems(e, item, inputName, inputParams) {
    let isChecked = e.target.checked

    if (isChecked) {
        inputParams.selected.push(item)
    } else {
        let findItemIndex = findSelectedItem(inputName, item)

        if (findItemIndex !== -1) {
            inputParams.selected.splice(findItemIndex, 1)
        }
    }

    FilterStore.filterInputs[inputName] = inputParams
}

function setSelectFromToItem(e, inputName, inputParams){
    FilterStore.filterInputs[inputName].selected[e.target.name] = e.target.value
}

function inputValues(inputName, inputParams) {
    switch (inputParams.type) {
        case FilterStore.filterTypes.selectFromTo.type:
            let defaultParams = {
                min: inputParams.from,
                max: inputParams.to,
                step: 0.2,
                type: "number",
                variant: "standard",
                label: "",
                onInput: (e) => setSelectFromToItem(e, inputName)
            }

            return (
                <div className={"flex gap-5"}>
                    <Input
                        {...defaultParams}
                        value={inputParams.selected.from ?? ""}
                        name={"from"}
                        placeholder={"От " + inputParams.from}
                    />
                    <Input
                        {...defaultParams}
                        value={inputParams.selected.to ?? ""}
                        name={"to"}
                        placeholder={"До " + inputParams.to}
                    />
                </div>
            )
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
                            checked={findSelectedItem(inputName, item) !== -1}
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
        FilterStore.fillFilterInputs()
    }, [])

    useEffect(() => {
        FilterStore.width = filterEl.current.clientWidth
    }, [filterEl.current])

    return (
        <div ref={filterEl}
             className={"h-full bg-white transition" + (FilterStore.isOpen ? "" : " -translate-x-full")}>
            <FixedHeader elOffset={elOffset} classes={"py-7 px-7 items-baseline"}>
                <div className={"text-title"}>Фильтр пляжей</div>
                <span className={"hover:cursor-pointer"} onClick={() => FilterStore.clearFilter()}>Очистить</span>
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