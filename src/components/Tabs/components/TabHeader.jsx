import {observer} from "mobx-react-lite";
import {Tab} from "@headlessui/react";
import {Button} from "@material-tailwind/react";
import cc from "classcat";

export const tabHeaderVariants = {
    DEFAULT: {
        name: "default",
        noSelected: "text"
    },
    WHITE: {
        name: "white",
        noSelected: "white"
    }
}

const TabHeader = observer(({tabItems, variant = tabHeaderVariants.DEFAULT, size = "md"}) => {
    return (
        <Tab.List className={"flex gap-2 justify-self-center"}>
            {tabItems.map((tab) => {
                    return (
                        <Tab as={"div"} key={tab.title} className={"outline-none w-full"}>
                            {({selected}) => (
                                <Button
                                    color={selected ? "blue" : "white"}
                                    variant={ selected ? "filled" : variant.noSelected}
                                    className={
                                        cc({
                                            "text-lg font-semibold px-7": size === "md",
                                            "shadow-lg": selected && variant.name === tabHeaderVariants.DEFAULT.name,
                                            "text-sm w-full": size === "sm"
                                        })
                                    }
                                >
                                    {tab.title}
                                </Button>
                            )}
                        </Tab>
                    )
                }
            )}
        </Tab.List>
    )
})

export default TabHeader