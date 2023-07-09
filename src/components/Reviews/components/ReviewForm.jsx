import {observer} from "mobx-react-lite";
import {Button, Textarea} from "@material-tailwind/react";
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";
import reviewForm from "../store/reviewForm";
import FormField from "../../Form/components/FormField";

const ReviewForm = observer(() => {
    let name = reviewForm.$('name')
    let email = reviewForm.$('email')
    let review = reviewForm.$('review')
    let reviewRating = reviewForm.$('reviewRating')

    return (
        <form className={"flex flex-col gap-5"} onSubmit={reviewForm.onSubmit}>
            <FormField field={reviewRating} isRating={true} />
            <FormField field={name} />
            <FormField field={email} info={"Не публикуется"} />
            <FormField field={review} info={"Не обязательно"} type={Textarea} />
            <Button onClick={reviewForm.onSubmit}>
                Отправить
                <PaperAirplaneIcon className={"w-5 h-5"}/>
            </Button>
        </form>
    )
})

export default ReviewForm