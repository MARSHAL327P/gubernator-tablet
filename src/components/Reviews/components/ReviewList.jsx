import {observer} from "mobx-react-lite";
import {declOfNum, getUpdateTimeText} from "../../../Utils";
import {Rating} from "@material-tailwind/react";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

const ReviewList = observer(() => {
    let reviews = SelectedClassInfoStore.currentClass.reviews

    return (
        reviews.reviewList.length > 0 ?
            <div className={"flex flex-col gap-5"}>
                <div>
                    {reviews.reviewList.length} {declOfNum(reviews.reviewList.length, ["Отзыв", "Отзыва", "Отзывов"])}
                </div>
                <div className={"flex flex-col gap-5"}>
                    {
                        reviews.reviewList.map(review => {
                            return (
                                <div key={review.id} className={"flex flex-col gap-2 shadow-lg shadow-blue-gray-900/5 p-8 rounded-xl border border-blue-gray-50"}>
                                    <div>
                                        {review.name}
                                    </div>
                                    <div className={"text-xs text-gray-500"}>
                                        {getUpdateTimeText(review.created_at)}
                                    </div>
                                    <Rating value={review.mark} readonly />
                                    <p>
                                        {review.review}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div> :
            <div>Отзывов пока нет. Вы можете стать первым!</div>
    )
})

export default ReviewList