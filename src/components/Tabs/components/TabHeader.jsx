import {observer} from "mobx-react-lite";
import {Tab} from "@headlessui/react";
import {Button} from "@material-tailwind/react";
import cc from "classcat";
import {Link} from "react-router-dom";

export const tabHeaderVariants = {
    DEFAULT: {
        name: "default",
        noSelected: "text"
    },
    WHITE: {
        name: "white",
        noSelected: "filled"
    }
}

function TabItem(variant, size, tab) {
    return <Tab as={"div"} className={"outline-none w-full"}>
        {({selected}) => {
            tab.selected = selected

            return (
                <Button
                    onClick={tab.onClick ? tab.onClick.bind(null, tab.selected) : null}
                    color={selected ? "blue" : "white"}
                    variant={selected ? "filled" : variant.noSelected}
                    className={
                        cc({
                            "outline-none whitespace-nowrap": true,
                            "text-lg font-semibold px-7": size === "md",
                            "shadow-lg": selected && variant.name === tabHeaderVariants.DEFAULT.name,
                            "text-sm w-full": size === "sm"
                        })
                    }
                >
                    {tab.title}
                </Button>
            )
        }}
    </Tab>
}

const TabHeader = observer(({tabItems, variant = tabHeaderVariants.DEFAULT, size = "md"}) => {
    return (
        <Tab.List className={"flex gap-2 justify-self-center"}>
            {tabItems.map((tab) => {
                    return (
                        tab.link ?
                            <Link
                                key={tab.title}
                                to={tab.getParam ? ("?tab=" + tab.link) : tab.link}
                                className={"outline-none w-full"}
                            >
                                {TabItem(variant, size, tab)}
                            </Link>
                            : TabItem(variant, size, tab)
                    )
                }
            )}
        </Tab.List>
    )
})

export default TabHeader