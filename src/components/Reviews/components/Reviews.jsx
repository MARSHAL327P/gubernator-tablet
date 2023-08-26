import {observer} from "mobx-react-lite";
import {Typography} from "@material-tailwind/react";
import ReviewsStore from "../store/reviews.store";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Reviews = observer(({card}) => {
    if (!card) return

    if (!card.reviews)
        card.reviews = new ReviewsStore(card.id)

    return (
        <div className={"grid grid-cols-review lg:grid-cols-1 lg:w-full lg:gap-5 gap-24 w-[1200px] mx-auto"}>
            <div className={"flex flex-col gap-5"}>
                <Typography variant={"h4"}>
                    Оставить отзыв
                </Typography>
                {
                    card ?
                        card.reviews.successAdded ?
                            <div className={"bg-primary p-5 text-center text-white rounded-xl shadow-lg"}>
                                Отзыв успешно добавлен
                            </div> :
                            <ReviewForm card={card}/> :
                        <>
                            <Skeleton height={40} count={3} inline={true} containerClassName={"grid gap-2"}/>
                            <Skeleton height={80}/>
                            <Skeleton height={40}/>
                        </>
                }
            </div>
            <div className={"flex flex-col gap-5 lg:gap-1"}>
                <Typography variant={"h4"}>
                    Отзывы
                </Typography>
                {
                    card.reviews.reviewList ?
                        <ReviewList reviewList={card.reviews.reviewList}/> :
                        (!card || card.reviews.isLoading) &&
                        <>
                            <Skeleton width={100} height={25}/>
                            <Skeleton height={150} count={2} inline={true} containerClassName={"grid gap-5"}/>
                        </>
                }
            </div>
        </div>


    )
})

export default Reviews