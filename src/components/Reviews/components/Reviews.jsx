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

    useEffect(() => {
        setReviewStore(new ReviewsStore(SelectedClassInfoStore.currentClass.card.id))
    }, [])


    return (
        ReviewStore &&
        <div className={"flex gap-24 w-[1200px] mx-auto"}>
            <div className={"flex flex-col gap-5 flex-[2]"}>
                <Typography variant={"h4"}>
                    Оставить отзыв
                </Typography>
                <ReviewForm/>
            </div>
            <div className={"flex flex-col gap-5 flex-[5]"}>
                <Typography variant={"h4"}>
                    Отзывы
                </Typography>
                {
                    ReviewStore.isLoading ?
                        <Loading text={"Загрузка отзывов"}/> :
                        <ReviewList store={ReviewStore} />
                }
            </div>
        </div>
    )
})

export default Reviews