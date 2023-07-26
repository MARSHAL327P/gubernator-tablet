import {observer} from "mobx-react-lite";
import {Typography} from "@material-tailwind/react";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import ReviewsStore from "../store/reviews.store";
import Loading from "../../Loading/components/Loading";
import {useEffect, useState} from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

const Reviews = observer(() => {
    if (!SelectedClassInfoStore.currentClass?.card) return
    let [ReviewStore, setReviewStore] = useState(null)
    let beachId = SelectedClassInfoStore.currentClass.card.id

    useEffect(() => {
        let ReviewStore = new ReviewsStore(beachId)

        setReviewStore(ReviewStore)
        SelectedClassInfoStore.currentClass.reviews = ReviewStore
    }, [beachId])

    return (
        ReviewStore &&
        <div className={"grid grid-cols-review lg:grid-cols-1 lg:w-full lg:gap-5 gap-24 w-[1200px] mx-auto"}>
            <div className={"flex flex-col gap-5"}>
                <Typography variant={"h4"}>
                    Оставить отзыв
                </Typography>
                {
                    ReviewStore.successAdded ?
                        <div className={"bg-primary p-5 text-center text-white rounded-xl shadow-lg"}>Отзыв успешно добавлен</div> :
                        <ReviewForm beachId={beachId}/>
                }
            </div>
            <div className={"flex flex-col gap-5 lg:gap-1"}>
                <Typography variant={"h4"}>
                    Отзывы
                </Typography>
                {
                    ReviewStore.isLoading ?
                        <Loading text={"Загрузка отзывов"}/> :
                        <ReviewList/>
                }
            </div>
        </div>
    )
})

export default Reviews