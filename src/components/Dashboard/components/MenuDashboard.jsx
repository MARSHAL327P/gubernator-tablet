import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {Tab} from "@headlessui/react";
import {Button} from "@material-tailwind/react";
import cc from "classcat";
import Ripple from "../../RedefinedTags/Ripple/Ripple";
import useWindowSize from "../../../hooks/useWindowSize";

const MenuDashboard = observer(({tabItems}) => {
    const [width] = useWindowSize()

    return (
        <Tab.List
            className={"fixed bottom-0 left-0 bg-white w-full flex text-[10px] shadow-top z-20 justify-center"}
        >
            {
                tabItems.map(tab => {
                    let Icon = tab.icon

                    return (
                        <Link
                            key={tab.title}
                            to={tab.getParam ? ("?tab=" + tab.link) : tab.link}
                            className={"w-full"}
                        >
                            <Tab className={"outline-0 w-full h-full"}>
                                {({selected}) => (
                                    <Button
                                        color={"white"}
                                        className={"h-full w-full shadow-none flex flex-col gap-1 justify-center items-center text-center p-2 bg-transparent rounded-none"}
                                    >
                                        {/*<Ripple color={"rgba(0, 0, 0, .6)"}/>*/}
                                        {Icon && <Icon className={selected ? "fill-primary" : ""}/>}
                                        <p className={cc(["text-black", {
                                            "text-primary font-bold": selected,
                                            "truncate": width >= 370
                                        }])}>
                                            {tab.title}
                                        </p>
                                    </Button>
                                )}

                            </Tab>
                        </Link>
                    )
                })
            }
        </Tab.List>

    )
})

export default MenuDashboard