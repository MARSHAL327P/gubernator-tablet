import Skeleton from "react-loading-skeleton";

const CardHeaderSkeleton = () => {
    return (
        <div className={"px-7 pt-4"}>
            <Skeleton/>
            <Skeleton height={30}/>
        </div>
    )
}

export default CardHeaderSkeleton