import {observer} from "mobx-react-lite";
import 'dayjs/locale/ru';
import 'dayjs/plugin/updateLocale';
import Skeleton from "react-loading-skeleton";
import UiStore from "../../../stores/ui.store";
import CardHeaderSkeleton from "../../SkeletonCondition/Templates/CardHeader.skeleton";
import IndicationsSkeleton from "../../SkeletonCondition/Templates/Indications.skeleton";

const BeachCardSkeleton = observer(() => {
    return (
        <div className={UiStore.cardWrapperClasses}>
            {
                [...Array(3)].map((item, idx) => (
                    <div
                        key={idx}
                        className={UiStore.cardItemClasses}
                    >
                        <CardHeaderSkeleton/>
                        <div className={"px-7 py-5 flex flex-col gap-4"}>
                            <IndicationsSkeleton count={6}/>
                            <div className="flex justify-between gap-2">
                                <Skeleton width={63} height={48}/>
                                <Skeleton width={147} height={48}/>
                                <Skeleton width={147} height={48}/>
                            </div>
                        </div>

                    </div>

                ))
            }
        </div>
    )
})

export default BeachCardSkeleton