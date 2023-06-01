import { observer } from "mobx-react-lite";
import FilterStore from "../store/filter.store";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { action } from "mobx";
import cc from "classcat";
import { ReactComponent as Star } from "../../../assets/icons/Star.svg";
import Ripple from "../../RedefinedTags/Ripple/Ripple";

const FilterInputsComponent = ({ inputName, inputParams }) => {
    switch (inputParams.type) {
        case FilterStore.filterTypes.radioBtn.type:
            return (
                <div className={"flex flex-row gap-5"}>
                    {inputParams.variants.map((item, idx) => {
                        let { id, label, sendData } = FilterStore.getInputAttr(inputName + "-" + idx, item)
                        let itemIsSelected = FilterStore.findSelectedItem(inputName, sendData) !== -1

                        return (
                            <Button
                                key={id}
                                onClick={action(FilterStore.setCheckedItems.bind(FilterStore, sendData, inputName, inputParams))}
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
                variant: "standard",
                label: "",
                onInput: action((e) => FilterStore.setSelectFromToItem(e, inputName))
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
                        let { id, label, sendData } = FilterStore.getInputAttr(inputName + "-" + i, item)

                        return (
                            <div
                                key={id}
                                className={"overflow-hidden relative rounded-md hover:cursor-pointer hover:bg-gray-100 transition duration-150"}
                                onClick={action(FilterStore.setCheckedItems.bind(FilterStore, sendData, inputName, inputParams))}
                            >
                                <Checkbox
                                    readOnly
                                    id={id}
                                    className={"checked:bg-primary checked:border-primary checked:before:bg-primary"}
                                    label={label}
                                    name={inputName}
                                    checked={FilterStore.findSelectedItem(inputName, sendData) !== -1}
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