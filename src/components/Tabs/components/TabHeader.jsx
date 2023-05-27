import {observer} from "mobx-react-lite";
import {Tab} from "@headlessui/react";
import {Button} from "@material-tailwind/react";
import {classNames} from "../../../Utils";

const TabHeader = observer(({tabItems}) => {
    return (
        <Tab.List className={"flex flex-wrap gap-2 justify-self-center"}>
            {tabItems.map((tab) => {
                    return (
                        <Tab as={"div"} key={tab.title} className={"outline-none"}>
                            {({selected}) => (
                                <Button
                                    color={selected ? "blue" : "white"}
                                    variant={selected ? "filled" : "text"}
                                    className={classNames(
                                        "text-lg font-semibold px-7",
                                        selected ? "shadow-lg" : ""
                                    )}
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