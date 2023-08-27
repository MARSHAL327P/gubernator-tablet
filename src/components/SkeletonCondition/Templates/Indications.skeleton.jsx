import Skeleton from "react-loading-skeleton";

const IndicationsSkeleton = ({count = 3}) => {
    return (
        <Skeleton count={count} height={40} inline={true}
                  containerClassName={"grid grid-cols-3 gap-2"}/>
    )
}

export default IndicationsSkeleton