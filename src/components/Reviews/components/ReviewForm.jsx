import {observer} from "mobx-react-lite";
import {Button, Spinner, Textarea} from "@material-tailwind/react";
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";
import reviewForm from "../store/reviewForm";
import FormField from "../../Form/components/FormField";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import {action} from "mobx";

const ReviewForm = observer(({beachId}) => {
    let rating = SelectedClassInfoStore.currentClass.reviews
    let name = reviewForm.$('name')
    let email = reviewForm.$('email')
    let review = reviewForm.$('review')
    let reviewRating = reviewForm.$('rating')

    reviewForm.add({
        name: "beachId",
        value: beachId
    })

    return (
        <form className={"flex flex-col gap-5"}>
            <FormField field={reviewRating} isRating={true}/>
            <FormField field={name}/>
            <FormField field={email} info={"Не публикуется"}/>
            <FormField field={review} info={"Не обязательно"} type={Textarea}/>

            <Button onClick={action(reviewForm.onSubmit)} disabled={rating.isSend}>
                Отправить
                {
                    rating.isSend ?
                        <Spinner className={"spinner_white"}/> :
                        <PaperAirplaneIcon className={"w-5 h-5"}/>
                }

            </Button>
        </form>
    )
})

export default ReviewForm