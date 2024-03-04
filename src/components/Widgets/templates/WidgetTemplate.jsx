import {observer} from "mobx-react-lite";
import {ReactComponent as Chart} from "../../../assets/icons/Chart.svg";
import {ReactComponent as Share} from "../../../assets/icons/Share.svg";
import IndicationsStore from "../../Indications/store/indications.store";
import cc from "classcat";
import SkeletonCondition from "../../SkeletonCondition/components/SkeletonCondition";
import Skeleton from "react-loading-skeleton";
import WidgetStore from "../store/widget.store";
import {Button, Tooltip} from "@material-tailwind/react";
import {Link} from "react-router-dom";

const WidgetTemplate = observer((
    {
        data,
        indications = Object.values(IndicationsStore.indications),
        hasCharts = true
    }
) => {

    function chartButtonHandler(indicationName) {
        console.log(indicationName)
    }

    const buttons = [
        // {
        //     name: "Поделиться",
        //     icon: Share
        // },
    ]
    const styles = {
        widgetWrapper: "grid grid-cols-widgets sm:grid-cols-1 gap-10 mx-auto lg:w-full",
        widgetHeight: "min-h-[380px] sm:min-h-[300px]"
    }
    const url = new URL(window.location)

    if (hasCharts)
        buttons.unshift({
            name: "Графики",
            icon: Chart
        })

    return (
        <SkeletonCondition
            condition={!data}
            skeleton={
                <Skeleton count={4} inline={true}
                          containerClassName={cc([styles.widgetWrapper, styles.widgetHeight])}/>
            }
        >
            {() => (
                <div className={styles.widgetWrapper}>
                    {
                        indications.map(indication => {
                            let indicationData = data[indication.indicationName]
                            if( !indicationData ) return false

                            let indicationValue = indicationData?.value || indicationData
                            let Icon = indication.icon
                            let Widget = indication.widget
                            let comfort = WidgetStore.comfort[indicationData.comfort]

                            return indicationValue && Widget && (
                                <div
                                    className={cc([styles.widgetHeight, "shadow-lg rounded-xl bg-white"])}
                                    key={indication.id}
                                >
                                    {/*{*/}
                                    {/*    comfort &&*/}
                                    {/*    <div className={cc(["py-1 text-white rounded-t-xl text-center", comfort.classes])}>{comfort.value}</div>*/}
                                    {/*}*/}
                                    <div className={"px-6 py-5 grid content-between h-[348px]"}>
                                        <div className={"flex gap-2 justify-between"}>
                                            <div className={"flex gap-2 items-center"}>
                                                {indication.icon && <Icon className={cc([indication.color, "w-8 h-8"])}/>}
                                                <span>{indication.name || indication.indicationName}</span>
                                            </div>
                                            <div className={"flex gap-2"}>
                                                {buttons.map((btn, idx) => {
                                                    url.searchParams.set("tab", "charts")

                                                    let Icon = btn.icon

                                                    return (
                                                        <Tooltip key={idx} content={btn.name}>
                                                            <Link to={`${url.toString()}#${indication.indicationName}`}>
                                                                <Button
                                                                    className={"p-3 rounded-full w-[40px] h-[40px]"}
                                                                    size={"sm"}
                                                                >
                                                                    <Icon className={"fill-white"}/>
                                                                </Button>
                                                            </Link>
                                                        </Tooltip>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <Widget data={data[indication.indicationName]} indication={indication}/>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            )}
        </SkeletonCondition>
    )
})

export default WidgetTemplate