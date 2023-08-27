import {observer} from "mobx-react-lite";
import 'dayjs/locale/ru';
import 'dayjs/plugin/updateLocale';
import Skeleton from "react-loading-skeleton";
import UiStore from "../../../stores/ui.store";
import CardHeaderSkeleton from "../../SkeletonCondition/Templates/CardHeader.skeleton";
import BeachPropsSkeleton from "../../SkeletonCondition/Templates/BeachProps.skeleton";
import IndicationsSkeleton from "../../SkeletonCondition/Templates/Indications.skeleton";

const BeachCardSkeleton = observer(() => {
    return (
        <div className={UiStore.cardWrapperClasses}>
            {
                [...Array(2)].map((item, idx) => (
                    <div
                        key={idx}
                        className={UiStore.cardItemClasses}
                    >
                        <CardHeaderSkeleton/>
                        <Skeleton height={220}/>
                        <Skeleton height={48}/>
                        <div className={"px-7 py-5 flex flex-col gap-4"}>
                            <BeachPropsSkeleton/>
                            <IndicationsSkeleton/>
                            <div className="flex justify-between gap-2">
                                <Skeleton width={63} height={48}/>
                                <Skeleton width={63} height={48}/>
                                <Skeleton width={230} height={48}/>
                            </div>
                        </div>

                    </div>

                ))
            }
        </div>
    )
})

export default BeachCardSkeleton