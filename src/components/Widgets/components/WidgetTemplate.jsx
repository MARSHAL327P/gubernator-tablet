import {observer} from "mobx-react-lite";
import {ReactComponent as Chart} from "../../../assets/icons/Chart.svg";
import {ReactComponent as Share} from "../../../assets/icons/Share.svg";
import IndicationsStore from "../../Indications/store/indications.store";
import cc from "classcat";
import SkeletonCondition from "../../SkeletonCondition/components/SkeletonCondition";
import Skeleton from "react-loading-skeleton";

const WidgetTemplate = observer((
    {
        data,
        indications = Object.values(IndicationsStore.indications),
        hasCharts = true
    }
) => {
    const buttons = [
        {
            name: "Поделиться",
            icon: Share
        },
    ]
    const styles = {
        widgetWrapper: "grid grid-cols-widgets sm:grid-cols-1 gap-10 mx-auto lg:w-full",
        widgetHeight: "min-h-[380px] sm:min-h-[300px]"
    }

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
                            let indicationValue = data[indication.indicationName]?.value || data[indication.indicationName]
                            let Icon = indication.icon
                            let Widget = indication.widget

                            return indicationValue && Widget && (
                                <div
                                    className={cc([styles.widgetHeight, "p-6 shadow-lg rounded-xl bg-white grid content-between"])}
                                    key={indication.id}
                                >
                                    <div className={"flex gap-2 justify-between"}>
                                        <div className={"flex gap-2 items-center"}>
                                            {indication.icon && <Icon className={cc([indication.color, "w-8 h-8"])}/>}
                                            <span>{indication.name || indication.indicationName}</span>
                                        </div>
                                        {/*<div className={"flex gap-2"}>*/}
                                        {/*    {buttons.map((btn, idx) => {*/}
                                        {/*        let Icon = btn.icon*/}

                                        {/*        return (*/}
                                        {/*            <Tooltip key={idx} content={btn.name}>*/}
                                        {/*                <Button className={"p-3 rounded-full w-[40px] h-[40px]"} size={"sm"}>*/}
                                        {/*                    <Icon className={"fill-white"}/>*/}
                                        {/*                </Button>*/}
                                        {/*            </Tooltip>*/}
                                        {/*        )*/}
                                        {/*    })}*/}
                                        {/*</div>*/}
                                    </div>
                                    <Widget data={data[indication.indicationName]} indication={indication}/>
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