import { observer } from "mobx-react-lite";
import { Tab } from '@headlessui/react'
// import Button, { PRIMARY, TEXT, WHITE } from "../../RedefinedTags/Button/Button";
import { Button, Tooltip } from "@material-tailwind/react";
// import { ReactComponent as Home } from "../../../assets/icons/Home.svg";
import { Link, useParams } from "react-router-dom";
import BeachLocalStore from "../../BeachCard/store/beachLocalStore";
import { classNames } from "../../../Utils";
import { HomeIcon } from "@heroicons/react/24/solid";

const Dashboard = observer(({ tabItems, dashboardName }) => {
    const { beachCode } = useParams()
    let beach = BeachLocalStore.findBeach(beachCode)

    return (
        <div className={"absolute bottom-0 w-screen min-h-[300px]"}>
            <Tab.Group>
                <Tab.List
                    className={"grid grid-cols-[400px_1fr_400px] gap-5 px-7 py-5 backdrop-blur-sm bg-white/50"}>
                    <div className={"flex gap-5"}>
                        <Tooltip placement="top-start" content="Вернуться на главную">
                            <Link to={"/"}>
                                <Button
                                    className={"whitespace-nowrap p-3"}
                                >
                                    <HomeIcon className={"w-6 h-6"}/>
                                    {/*<Home className={"fill-white"}/>*/}
                                </Button>
                            </Link>
                        </Tooltip>
                        <div>
                            <div className={"text-title"}>
                                {dashboardName} «{beach.name}»
                            </div>
                            <div className={"text-xs text-gray-500"}>
                                Обновлено {beach.updateTimeText}
                            </div>
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
                <Tab.Panels className={"p-7 bg-gray-50 min-h-[300px]"}>
                    {Object.values(tabItems).map((tabInfo, idx) => {
                            return <Tab.Panel key={idx}>{tabInfo.content}</Tab.Panel>
                        }
                    )}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
})

export default Dashboard