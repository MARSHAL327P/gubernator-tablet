import {observer} from "mobx-react-lite";
import FilterStore from "../store/filter.store";
import {Button, Checkbox, Input} from "@material-tailwind/react";
import {action} from "mobx";
import cc from "classcat";
import {ReactComponent as Star} from "../../../assets/icons/Star.svg";
import Ripple from "../../RedefinedTags/Ripple/Ripple";

const FilterInputsComponent = ({inputName, inputParams, filterGroupName}) => {
    switch (inputParams.type) {
        case FilterStore.filterTypes.radioBtn.type:
            return (
                <div className={"flex flex-row gap-5 sm:gap-3"}>
                    {inputParams.variants.map((item, idx) => {
                        let {id, label, inputValue} = FilterStore.getInputAttr(inputName + "-" + idx, item)
                        let itemIsSelected = FilterStore.findSelectedItem(inputName, inputValue) !== -1

                        return (
                            <Button
                                key={id}
                                onClick={
                                    action(() => {
                                        let sendData = {isChecked: itemIsSelected, value: inputValue}

                                        FilterStore.setFilterInputs(inputName, inputParams, sendData, filterGroupName)
                                    })
                                }
                                className={cc(["flex sm:p-3", {
                                    "shadow-md": itemIsSelected
                                }])}
                                fullWidth
                                color={itemIsSelected ? "" : "white"}
                            >
                                {label}
                                {inputName === "rating" && <Star className={"fill-warning sm:w-4 sm:h-4"}/>}
                            </Button>
                        )
                    })
                    }
                </div>
            )
        case FilterStore.filterTypes.selectFromTo.type:
            let defaultParams = {
                min: inputParams.from,
                max: inputParams.to,
                step: 0.2,
                type: "number",
                label: "",
                onInput: action((e) => {
                    FilterStore.setFilterInputs(inputName, inputParams, e, filterGroupName)
                }),
                containerProps: {className: "min-w-[100px]"}
            }

            return (
                <div className={"flex gap-5 mt-2 mr-2"}>
                    <Input
                        {...defaultParams}
                        value={inputParams.selected.from ?? ""}
                        name={`from`}
                        placeholder={"От " + inputParams.from}
                    />
                    <Input
                        {...defaultParams}
                        value={inputParams.selected.to ?? ""}
                        name={`to`}
                        placeholder={"До " + inputParams.to}
                    />
                </div>
            )
        default:
            return (
                <div className={"flex flex-col"}>
                    {inputParams.variants.map((item, i) => {
                        let {id, label, inputValue} = FilterStore.getInputAttr(inputName + "-" + i, item)
                        let checkedItemIndex = FilterStore.findSelectedItem(inputName, inputValue)
                        let isChecked = checkedItemIndex !== -1

                        return (
                            <div
                                key={id}
                                className={"overflow-hidden relative rounded-md hover:cursor-pointer hover:bg-gray-100 transition duration-150"}
                                onClick={action(() => {
                                    let sendData = {isChecked: isChecked, value: inputValue}

                                    FilterStore.setFilterInputs(inputName, inputParams, sendData, filterGroupName)
                                })}
                            >
                                <Checkbox
                                    readOnly
                                    id={id}
                                    className={"checked:bg-primary checked:border-primary checked:before:bg-primary"}
                                    label={label}
                                    name={inputName}
                                    checked={isChecked}
                                />
                                <Ripple color={"rgba(161,161,161,0.69)"}/>
                            </div>

                        )
                    })}
                </div>
            )
    }
}

export const FilterInputs = observer(FilterInputsComponent)