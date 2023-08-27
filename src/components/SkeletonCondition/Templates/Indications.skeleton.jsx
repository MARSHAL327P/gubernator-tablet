import Skeleton from "react-loading-skeleton";

const IndicationsSkeleton = () => {
    return (
        <Skeleton count={3} height={40} inline={true}
                  containerClassName={"grid grid-cols-3 gap-2"}/>
    )
}

export default IndicationsSkeleton