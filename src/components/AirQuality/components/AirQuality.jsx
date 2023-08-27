import {observer} from "mobx-react-lite";
import AirQualityIndicator from "../../AirQualityIndicator/AirQualityIndicator";
import Skeleton from "react-loading-skeleton";
import SkeletonCondition from "../../SkeletonCondition/components/SkeletonCondition";
import AQIDescription from "./AQIDescription";
import AQIValues from "./AQIValues";

function AQIValuesSkeleton() {
    return (
        <Skeleton count={6} inline={true} height={55} containerClassName={"grid grid-cols-2 sm:grid-cols-1 gap-4"}/>
    )
}

const AirQuality = observer(({airQualityData}) => {
    return (
        <div className={"flex lg:flex-wrap justify-center w-8/12 lg:w-full mx-auto gap-10"}>
            <div className={"flex flex-col gap-14 w-[70%]"}>
                <div className={"flex sm:flex-wrap sm:justify-center sm:text-center gap-7 h-fit items-center"}>
                    <SkeletonCondition condition={!airQualityData} skeleton={<Skeleton width={150} height={135}/>}>
                        {() => (
                            <AirQualityIndicator value={airQualityData.totalRating}/>
                        )}
                    </SkeletonCondition>

                    <div className={"flex flex-col gap-2 w-full"}>
                        <SkeletonCondition condition={!airQualityData} skeleton={
                            <>
                                <Skeleton width={150}/>
                                <Skeleton height={100}/>
                            </>
                        }>
                            {() => (
                                <>
                                    <div className={"text-4xl font-bold"}>
                                        {airQualityData.currentRatingLevel.title}
                                    </div>
                                    {airQualityData.currentRatingLevel.description}
                                </>
                            )}
                        </SkeletonCondition>
                    </div>
                </div>
                <div>
                    <div className={"text-2xl font-bold mb-4"}>
                        Загрязняющие вещества в воздухе
                    </div>
                    <SkeletonCondition condition={!airQualityData} skeleton={AQIValuesSkeleton()}>
                        {() => (
                            <AQIValues airQualityData={airQualityData}/>
                        )}
                    </SkeletonCondition>
                </div>
            </div>

            <div className={"w-[30%]"}>
                <div className={"text-2xl font-bold"}>
                    Подробнее о значениях AQI
                </div>
                <SkeletonCondition condition={!airQualityData} skeleton={<Skeleton height={60} count={6}/>}>
                    {() => (
                        <AQIDescription airQualityData={airQualityData}/>
                    )}
                </SkeletonCondition>
            </div>
        </div>
    )
})

export default AirQuality