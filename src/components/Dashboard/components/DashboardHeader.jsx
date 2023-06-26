import {observer} from "mobx-react-lite";
import {Button, Tooltip} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {HomeIcon} from "@heroicons/react/24/solid";
import {getUpdateTimeText} from "../../../Utils";
import TabHeader from "../../Tabs/components/TabHeader";
import AdminBtn from "../../AdminPanel/components/AdminBtn";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const DashboardHeader = observer(({homeLink, tabItems}) => {
    let card = SelectedClassInfoStore.currentClass?.card
    let updateTimeField = card && (card.updateTimeText || card.updated_at || card.updateTime)

    return (
        <>
            <div className={"flex items-center gap-5"}>
                <Tooltip placement="top-start" content="Вернуться на главную">
                    <Link to={homeLink}>
                        <Button className={"whitespace-nowrap p-3"}>
                            <HomeIcon className={"w-6 h-6"}/>
                        </Button>
                    </Link>
                </Tooltip>
                <div>
                    {
                        card ?
                            <>
                                <div className={"text-title"}>
                                    {SelectedClassInfoStore.currentClass.title + ` «${card.name}»`}
                                </div>
                                {
                                    updateTimeField &&
                                    <div className={"text-xs text-gray-500"}>
                                        Обновлено {getUpdateTimeText(updateTimeField)}
                                    </div>
                                }
                            </>
                            : <Skeleton baseColor={"rgba(255, 255, 255, .7)"} width={250} height={40}/>
                    }

                </div>
            </div>
            <TabHeader tabItems={tabItems}/>
            <AdminBtn color={"blue"} classes={""}/>
        </>
    )
})

export default DashboardHeader