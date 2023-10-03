import {observer} from "mobx-react-lite";
import {Tab} from "@headlessui/react";
import {Button} from "@material-tailwind/react";
import cc from "classcat";
import {useNavigate} from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";

const defaultColor = (selected) => (selected ? "blue" : "white")
export const tabHeaderVariants = {
    DEFAULT: {
        name: "default",
        colorNoSelected: "white",
        variantNoSelected: "text",
        color: defaultColor
    },
    WHITE: {
        name: "white",
        colorNoSelected: "white",
        variantNoSelected: "filled",
        color: defaultColor
    },
    FULL: {
        name: "full",
        variantNoSelected: "text",
        colorNoSelected: "white",
            classes: "h-full shadow-none flex lg:flex-col gap-1 justify-center " +
            "items-center text-center p-2 bg-transparent rounded-none border-b-2 border-transparent",
        color: (selected) => (selected ? "white" : "white")
    }
}

function buttonClickHandler(tab, navigate) {
    if (tab.onClick)
        tab.onClick(tab.selected)

    if (tab.link) {
        let url = new URL(window.location)
        let initialUrl = new URL(window.location)

        if (tab.getParam) {
            url.searchParams.set("tab", tab.link)
        } else {
            url.pathname = tab.link
        }

        if (initialUrl.toString() !== url.toString())
            navigate(url.pathname + url.search)
    }
}

const TabHeader = observer(
    ({
         tabItems,
         variant = tabHeaderVariants.DEFAULT,
         classes = "",
         tabListClasses = ""
     }) => {
        const [width] = useWindowSize()

        let navigate = useNavigate();

        return (
            <Tab.List className={cc(["flex gap-2 items-center", tabListClasses])}>
                {tabItems.map((tab) => {
                        return (
                            <Tab key={tab.title} as={"div"} className={"outline-0 w-full h-full"}>
                                {({selected}) => {
                                    let Icon = tab.icon
                                    tab.selected = selected

                                    return (
                                        <Button
                                            onClick={buttonClickHandler.bind(null, tab, navigate)}
                                            color={variant.color(selected)}
                                            variant={selected ? "filled" : variant.variantNoSelected}
                                            className={
                                                cc(["w-full text-sm", variant.classes, classes, {
                                                    "border-b-2 border-primary": selected && variant.name === tabHeaderVariants.FULL.name
                                                }])
                                            }
                                        >
                                            {
                                                variant.name === tabHeaderVariants.FULL.name ?
                                                    <>
                                                        {Icon && <Icon className={selected ? "fill-primary" : "fill-black"}/>}
                                                        <p className={cc(["text-black", {
                                                            "text-primary font-bold": selected,
                                                            "truncate": width >= 370
                                                        }])}>
                                                            {tab.title}
                                                        </p>
                                                    </>
                                                    : tab.title
                                            }
                                        </Button>
                                    )
                                }}
                            </Tab>
                        )
                    }
                )}
            </Tab.List>
        )
    })

export default TabHeader