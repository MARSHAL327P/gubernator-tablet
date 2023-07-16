import {observer} from "mobx-react-lite";
import {Button, Tooltip, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {Bars3Icon, HomeIcon} from "@heroicons/react/24/solid";
import {getUpdateTimeText} from "../../../Utils";
import TabHeader from "../../Tabs/components/TabHeader";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import useWindowSize from "../../../hooks/useWindowSize";
import DrawerDashboard from "./DrawerDashboard";
import {runInAction} from "mobx";
import DashboardStore from "../store/dashboard.store";

const DashboardHeader = observer(({homeLink, tabItems}) => {
    let card = SelectedClassInfoStore.currentClass?.card
    let updateTimeField = card && (card.props_updated_at || card.updateTimeText || card.updated_at || card.updateTime)
    const [width] = useWindowSize()

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
                                <Typography variant={width > 1024 ? "h4" : "h5"}>
                                    {SelectedClassInfoStore.currentClass.title + ` «${card.name}»`}
                                </Typography>
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
            {
                width > 1024 ?
                    <TabHeader tabItems={tabItems}/> :
                    <Bars3Icon className={"w-8 h-8"} onClick={() => {
                        runInAction(() => {
                            DashboardStore.drawerIsOpen = true
                        })
                    }}/>
            }

            {/*<AdminBtn color={"blue"} classes={""}/>*/}
        </>
    )
})

export default DashboardHeader