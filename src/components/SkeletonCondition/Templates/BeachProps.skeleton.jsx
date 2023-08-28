import Skeleton from "react-loading-skeleton";

const BeachPropsSkeleton = () => {
    return (
        <Skeleton count={3} width={80} inline={true} containerClassName={"flex flex-wrap gap-1"}/>
    )
}

export default BeachPropsSkeleton