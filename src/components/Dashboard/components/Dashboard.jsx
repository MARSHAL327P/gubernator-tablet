import {observer} from "mobx-react-lite";
import {Tab} from '@headlessui/react'
import {Button, Tooltip} from "@material-tailwind/react";
import {Link, useSearchParams} from "react-router-dom";
import {HomeIcon} from "@heroicons/react/24/solid";
import TabHeader from "../../Tabs/components/TabHeader";
import AdminBtn from "../../AdminPanel/components/AdminBtn";
import {getIndexLinkInArray, getUpdateTimeText} from "../../../Utils";

const Dashboard = observer(({card, tabItems, dashboardName, homeLink = "/"}) => {
    const [searchParams,] = useSearchParams();
    let selectedTabIndex = getIndexLinkInArray(searchParams.get("tab"), tabItems)
    let updateTimeField = card.updateTimeText || card.updated_at

    return (<Tab.Group defaultIndex={selectedTabIndex}>
            <div
                className="border-b border-white fixed z-10 top-0 backdrop-blur-sm bg-white/50 flex justify-between items-center px-7 py-4 w-full">
                <div className={"flex items-center gap-5"}>
                    <Tooltip placement="top-start" content="Вернуться на главную">
                        <Link to={homeLink}>
                            <Button className={"whitespace-nowrap p-3"}>
                                <HomeIcon className={"w-6 h-6"}/>
                            </Button>
                        </Link>
                    </Tooltip>
                    <div>
                        <div className={"text-title"}>
                            {dashboardName} «{card.name}»
                        </div>
                        {
                            updateTimeField &&
                            <div className={"text-xs text-gray-500"}>
                                Обновлено {getUpdateTimeText(updateTimeField)}
                            </div>
                        }
                    </div>
                </div>
                <TabHeader tabItems={tabItems}/>
                <AdminBtn color={"blue"} classes={""}/>
            </div>
            <div className={"w-screen min-h-[300px]"}>
                <Tab.Panels className={"p-7 bg-gray-50 min-h-[300px]"}>
                    {tabItems.map((tab) => {
                            return <Tab.Panel key={tab.title}>{tab.content}</Tab.Panel>
                        }
                    )}
                </Tab.Panels>
            </div>
        </Tab.Group>

    )
})

export default Dashboard