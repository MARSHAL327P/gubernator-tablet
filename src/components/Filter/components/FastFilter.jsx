import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import FilterStore from "../store/filter.store";
import {action} from "mobx";
import {Checkbox, List, ListItem, ListItemPrefix, Typography} from "@material-tailwind/react";

const FastFilter = observer(() => {
    if (!SelectedClassInfoStore.currentClass?.fastFilter) return null

    let fastFilter = SelectedClassInfoStore.currentClass.fastFilter

    return (
        <List className="flex-row flex-wrap gap-0">
            {
                Object.entries(FilterStore.fastFilter.fields).map(([fieldName, fieldValues]) => {
                    return fieldValues.map(fastFilterItem => {
                        let checkedItemIndex = fastFilter.selected.indexOf(fastFilterItem)
                        let isChecked = checkedItemIndex !== -1

                        return (
                            <ListItem
                                key={fastFilterItem}
                                className="p-0 w-fit"
                            >
                                <label htmlFor={fastFilterItem}
                                       className="px-3 py-2 flex items-center w-full cursor-pointer">
                                    <ListItemPrefix className="mr-3">
                                        <Checkbox
                                            id={fastFilterItem}
                                            ripple={false}
                                            className="hover:before:opacity-0 checked:bg-primary checked:border-primary checked:before:bg-primary"
                                            containerProps={{
                                                className: "p-0"
                                            }}
                                            onChange={action((e) => {
                                                if (isChecked) {
                                                    fastFilter.selected.splice(checkedItemIndex, 1)
                                                } else {
                                                    fastFilter.selected.push(fastFilterItem)
                                                }
                                            })}
                                            checked={isChecked}
                                        />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="font-medium">
                                        {FilterStore.fastFilter.alias[fastFilterItem] ?? fastFilterItem}
                                    </Typography>
                                </label>
                            </ListItem>
                        )
                    })
                })
            }
        </List>
    )

})

export default FastFilter