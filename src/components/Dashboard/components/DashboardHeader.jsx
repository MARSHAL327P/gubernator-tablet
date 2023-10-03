import {observer} from "mobx-react-lite";
import {Button, Tooltip, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {HomeIcon} from "@heroicons/react/24/solid";
import {getUpdateTimeText} from "../../../Utils";
import TabHeader, {tabHeaderVariants} from "../../Tabs/components/TabHeader";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import useWindowSize from "../../../hooks/useWindowSize";
import MapStore from "../../Map/store/map.store";
import {ReactComponent as Map} from "../../../assets/icons/Map.svg";
import SkeletonCondition from "../../SkeletonCondition/components/SkeletonCondition";
import cc from "classcat";

const DashboardHeader = observer(({homeLink, tabItems}) => {
    const [width] = useWindowSize()
    const navigate = useNavigate()
    const styles = {
        skeleton: "rgba(255, 255, 255, .7)"
    }

    let card = SelectedClassInfoStore.currentClass?.card
    let updateTimeField = card && (card.props_updated_at || card.updateTimeText || card.updated_at || card.updateTime)
    let url = new URL(window.location)

    function toHome() {
        navigate(homeLink + "?" + url.searchParams.toString())
        MapStore.initLocation(true)
    }

    function iconButtons(Icon, classes = "") {
        return (
            <Button className={"whitespace-nowrap p-3 sm:p-3"}>
                <Icon className={cc(["w-6 h-6 sm:w-4 sm:h-4", classes])}/>
            </Button>
        )
    }

    return (
        <div
            className="border-b border-white fixed z-50 top-0 backdrop-blur bg-white/50 flex justify-between items-center gap-2 w-full">
            <div className={"flex items-center gap-5 sm:gap-2 py-2 pl-7 lg:pl-3"}>
                <div className={"flex gap-2 sm:gap-1"}>
                    <Tooltip placement="top-start" content="Вернуться на главную">
                        <div onClick={toHome}>
                            {iconButtons(HomeIcon)}
                        </div>
                    </Tooltip>
                    <SkeletonCondition condition={!card} skeleton={
                        <Skeleton
                            baseColor={styles.skeleton}
                            containerClassName={"relative bottom-[4px]"}
                            width={48} height={48}
                        />
                    }>
                        {() => (
                            <Tooltip placement="top-start" content="Показать на карте">
                                <div onClick={() => {
                                    MapStore.zoomToItem(card.coord)
                                }}>
                                    {iconButtons(Map, "fill-white")}
                                </div>
                            </Tooltip>
                        )}
                    </SkeletonCondition>

                </div>
                <div>
                    <SkeletonCondition condition={!card} skeleton={
                        <>
                            <Skeleton baseColor={styles.skeleton} width={250} height={25}/>
                            <Skeleton baseColor={styles.skeleton} width={250} height={10}/>
                        </>
                    }>
                        {() => (
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
                        )}
                    </SkeletonCondition>
                </div>
            </div>
            {
                width > 1280 &&
                <SkeletonCondition condition={!card} skeleton={
                    <Skeleton count={5} width={150} height={48} inline={true} containerClassName={"flex gap-2"}/>
                }>
                    {() => (
                        <TabHeader
                            tabItems={tabItems}
                            variant={tabHeaderVariants.FULL}
                            classes={"px-5 py-6 gap-2"}
                            tabListClasses={"!gap-0"}
                        />
                    )}
                </SkeletonCondition>
            }

            {/*<AdminBtn color={"blue"} classes={""}/>*/}
        </div>
    )
})

export default DashboardHeader