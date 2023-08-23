import {observer} from "mobx-react-lite";
import {Button, Tooltip, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {Bars3Icon, HomeIcon} from "@heroicons/react/24/solid";
import {getUpdateTimeText} from "../../../Utils";
import TabHeader from "../../Tabs/components/TabHeader";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import useWindowSize from "../../../hooks/useWindowSize";
import {runInAction} from "mobx";
import DashboardStore from "../store/dashboard.store";
import MapStore from "../../Map/store/map.store";

const DashboardHeader = observer(({homeLink, tabItems}) => {
    const [width] = useWindowSize()
    const navigate = useNavigate()

    let card = SelectedClassInfoStore.currentClass?.card
    let updateTimeField = card && (card.props_updated_at || card.updateTimeText || card.updated_at || card.updateTime)
    let url = new URL(window.location)

    function toHome(){
        navigate(homeLink + "?" + url.searchParams.toString())
        MapStore.initLocation(true)
    }
    
    return (
        <div className="border-b border-white fixed z-50 top-0 backdrop-blur bg-white/50 flex justify-between items-center px-7 py-4 sm:p-3 gap-2 w-full">
            <div className={"flex items-center gap-5 sm:gap-2"}>
                <Tooltip placement="top-start" content="Вернуться на главную">
                    <div onClick={toHome}>
                        <Button className={"whitespace-nowrap p-3"}>
                            <HomeIcon className={"w-6 h-6"}/>
                        </Button>
                    </div>
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
        </div>
    )
})

export default DashboardHeader