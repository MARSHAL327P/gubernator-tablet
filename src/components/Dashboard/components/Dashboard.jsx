import { observer } from "mobx-react-lite";
import { Tab } from '@headlessui/react'
import Button, { PRIMARY, TEXT, WHITE } from "../../RedefinedTags/Button/Button";
import { ReactComponent as Home } from "../../../assets/icons/Home.svg";
import { Link } from "react-router-dom";

const Dashboard = observer(({ tabItems }) => {

    return (
        <>
            <Link to={"/"}>
                <Button
                    classes={"!absolute top-7 left-5"}
                    type={WHITE}
                    icon={Home}
                >
                    На главную
                </Button>
            </Link>
            <div className={"absolute bottom-0 bg-white w-full"}>
                <Tab.Group>
                    <Tab.List className={"flex gap-2 p-3"}>
                        {Object.keys(tabItems).map((tabName, idx) => {
                                return (
                                    <Tab key={idx} className={"outline-none"}>
                                        {({ selected }) => (
                                            <Button type={selected ? PRIMARY : TEXT}>
                                                {tabName}
                                            </Button>
                                        )}
                                    </Tab>
                                )
                            }
                        )}
                    </Tab.List>
                    <Tab.Panels>
                        {Object.values(tabItems).map((tabInfo, idx) => {
                                return <Tab.Panel key={idx}>{tabInfo.content}</Tab.Panel>
                            }
                        )}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </>
    )
})

export default Dashboard