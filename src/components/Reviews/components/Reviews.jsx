import {observer} from "mobx-react-lite";
import {Typography} from "@material-tailwind/react";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import ReviewsStore from "../store/reviews.store";
import Loading from "../../Loading/components/Loading";
import {useEffect} from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Reviews = observer(() => {
    let card = SelectedClassInfoStore.currentClass.card
    let beachId = card.id

    useEffect(() => {
        console.log(card.reviews)
        if( !card.reviews )
            card.reviews = new ReviewsStore(beachId)

        console.log(card.reviews)
    }, [beachId])

    console.log(card.reviews)
    return (
        card.reviews &&
        <div className={"grid grid-cols-review lg:grid-cols-1 lg:w-full lg:gap-5 gap-24 w-[1200px] mx-auto"}>
            <div className={"flex flex-col gap-5"}>
                <Typography variant={"h4"}>
                    Оставить отзыв
                </Typography>
                {
                    card.reviews.successAdded ?
                        <div className={"bg-primary p-5 text-center text-white rounded-xl shadow-lg"}>Отзыв успешно добавлен</div> :
                        <ReviewForm beachId={beachId}/>
                }
            </div>
            <div className={"flex flex-col gap-5 lg:gap-1"}>
                <Typography variant={"h4"}>
                    Отзывы
                </Typography>
                {
                    card.reviews.isLoading  ?
                        <>
                            <Skeleton width={100}/>
                            <Skeleton height={200}/>
                        </> :
                        <ReviewList reviewList={card.reviews.reviewList} />
                }
            </div>
        </div>

    )
})

export default Reviews