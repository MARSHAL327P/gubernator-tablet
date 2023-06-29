import {observer} from "mobx-react-lite";
import FilterStore from "../store/filter.store";
import {Button, Checkbox, Input} from "@material-tailwind/react";
import {action} from "mobx";
import cc from "classcat";
import {ReactComponent as Star} from "../../../assets/icons/Star.svg";
import Ripple from "../../RedefinedTags/Ripple/Ripple";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

const FilterInputsComponent = ({inputName, inputParams, filterGroupName}) => {
    switch (inputParams.type) {
        case FilterStore.filterTypes.radioBtn.type:
            return (
                <div className={"flex flex-row gap-5"}>
                    {inputParams.variants.map((item, idx) => {
                        let {id, label, sendData} = FilterStore.getInputAttr(inputName + "-" + idx, item)
                        let itemIsSelected = FilterStore.findSelectedItem(inputName, sendData) !== -1

                        return (
                            <Button
                                key={id}
                                onClick={
                                    action(() => {
                                        FilterStore.setFilterInputs(inputName, inputParams, sendData, filterGroupName)
                                    })
                                }
                                className={cc({
                                    "flex": true,
                                    "shadow-md": itemIsSelected
                                })}
                                fullWidth
                                color={itemIsSelected ? "" : "white"}
                            >
                                {label}
                                {inputName === "rating" && <Star className={"fill-warning"}/>}
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
                className: "focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 " +
                    "!border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500",
                labelProps: {
                    className: "hidden"
                },
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
            let checkedCheckbox = []
            return (
                <div className={"flex flex-col"}>
                    {inputParams.variants.map((item, i) => {
                        let {id, label, sendData} = FilterStore.getInputAttr(inputName + "-" + i, item)
                        let checkedItemIndex = FilterStore.findSelectedItem(inputName, sendData)
                        let isChecked = checkedItemIndex !== -1

                        if (isChecked)
                            checkedCheckbox.push(sendData)

                        return (
                            <div
                                key={id}
                                className={"overflow-hidden relative rounded-md hover:cursor-pointer hover:bg-gray-100 transition duration-150"}
                                onClick={action(() => {
                                    if (isChecked) {
                                        checkedCheckbox.splice(checkedItemIndex, 1)
                                    } else {
                                        checkedCheckbox.push(sendData)
                                    }

                                    FilterStore.setFilterInputs(inputName, inputParams, checkedCheckbox, filterGroupName)
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