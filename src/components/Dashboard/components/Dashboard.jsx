import { observer } from "mobx-react-lite";
import { Tab } from '@headlessui/react'
// import Button, { PRIMARY, TEXT, WHITE } from "../../RedefinedTags/Button/Button";
import { Button } from "@material-tailwind/react";
import { ReactComponent as Home } from "../../../assets/icons/Home.svg";
import { Link, useParams } from "react-router-dom";
import BeachLocalStore from "../../BeachCard/store/beachLocalStore";
import { classNames } from "../../../Utils";

const Dashboard = observer(({ tabItems, dashboardName }) => {
    const { beachCode } = useParams()
    let beach = BeachLocalStore.findBeach(beachCode)

    return (
        <>
            <Link to={"/"}>
                <Button
                    className={"!absolute top-7 left-5"}
                    color={"white"}
                >
                    <Home className={"fill-black"}/>
                    На главную
                </Button>
            </Link>
            <div className={"absolute bottom-0 w-full h-[500px]"}>
                <Tab.Group>
                    <Tab.List
                        className={"grid grid-cols-[400px_1fr_400px] gap-5 px-7 py-5 backdrop-blur-sm bg-white/50"}>
                        <div>
                            <div className={"text-title"}>
                                {dashboardName} «{beach.name}»
                            </div>
                            <div className={"text-xs text-gray-500"}>
                                Обновлено {beach.updateTimeText}
                            </div>
                        </div>
                        <div className={"flex flex-wrap gap-2 justify-self-center"}>
                            {Object.keys(tabItems).map((tabName, idx) => {
                                    return (
                                        <Tab as={"div"} key={idx} className={"outline-none"}>
                                            {({ selected }) => (
                                                <Button
                                                    color={selected ? "" : "white"}
                                                    variant={selected ? "filled" : "text"}
                                                    className={classNames(
                                                        "text-lg font-semibold px-7",
                                                        selected ? "shadow-lg" : ""
                                                    )}
                                                >
                                                    {tabName}
                                                </Button>
                                            )}
                                        </Tab>
                                    )
                                }
                            )}
                        </div>
                    </Tab.List>
                    <Tab.Panels className={"p-7 bg-gray-50 h-full"}>
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