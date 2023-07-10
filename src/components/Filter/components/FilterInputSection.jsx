import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import {Accordion, AccordionBody, AccordionHeader, List, ListItem} from "@material-tailwind/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import cc from "classcat";
import FilterStore from "../store/filter.store";
import {FilterInputs} from "./FilterInputs";
import {ReactComponent as Star} from "../../../assets/icons/Star.svg";
import {action} from "mobx";

const FilterInputSection = observer((
    {
        filterInputs = SelectedClassInfoStore.filterInputs,
        filterGroupName = {}
    }
) => {
    const icons = {
        rating: <Star className={"fill-warning mt-[2px]"}/>
    }

    // useEffect(() => {
    //     SelectedClassInfoStore.currentClass.filterInputs = FilterStore.generateFilterInputs
    // }, [])
    //
    // console.log("ok")

    return (
        Object.keys(filterInputs).length > 0 ?
            <List className={"p-0"}>
                {Object.keys(filterInputs).map((inputName) => {
                    let inputParams = filterInputs[inputName]

                    if (!FilterStore.inputHasVariants(inputParams)) return false

                    return (
                        <Accordion
                            key={inputName}
                            open={inputParams.open}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={cc(["mx-auto h-5 w-5 transition-transform", {
                                        "rotate-180": inputParams.open
                                    }])}
                                />
                            }>
                            <ListItem className="p-0 active:bg-transparent bg-transparent"
                                      selected={inputParams.open}>
                                <AccordionHeader
                                    onClick={action(() => {
                                        inputParams.open = !inputParams.open
                                    })}
                                    className={"border-b-0 p-3 text-base"}
                                >
                                    <div className="flex gap-2">
                                        {icons[inputName]}
                                        {inputParams.name}
                                    </div>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody
                                className={
                                    cc({
                                        "p-0 mb-3": true,
                                        "pl-3": inputParams.type !== FilterStore.filterTypes.checkbox.type
                                    })
                                }>
                                <FilterInputs
                                    inputName={inputName}
                                    inputParams={inputParams}
                                    filterGroupName={filterGroupName}
                                />
                            </AccordionBody>
                        </Accordion>
                    )
                })}
            </List> :
            <div className={"text-xl"}>Нет свойств для фильтрации</div>
    )
})

export default FilterInputSection