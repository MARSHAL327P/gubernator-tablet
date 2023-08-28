import {observer} from "mobx-react-lite";
import {Tab} from "@headlessui/react";
import {Button} from "@material-tailwind/react";
import cc from "classcat";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

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

        if( initialUrl.toString() !== url.toString() )
            navigate(url.pathname + url.search)
    }
}

const TabHeader = observer(
    ({
         tabItems,
         variant = tabHeaderVariants.DEFAULT,
         size = "md"
     }) => {
        let navigate = useNavigate();

        return (
            <Tab.List className={"flex gap-2 justify-self-center"}>
                {tabItems.map((tab) => {
                        return (
                            <Tab key={tab.title} as={"div"} className={"outline-none w-full"}>
                                {({selected}) => {
                                    tab.selected = selected

                                    return (
                                        <Button
                                            onClick={buttonClickHandler.bind(null, tab, navigate)}
                                            color={selected ? "blue" : "white"}
                                            variant={selected ? "filled" : variant.noSelected}
                                            className={
                                                cc({
                                                    "outline-none whitespace-nowrap": true,
                                                    "font-semibold px-7": size === "md",
                                                    "text-sm w-full": size === "sm"
                                                })
                                            }
                                        >
                                            {tab.title}
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