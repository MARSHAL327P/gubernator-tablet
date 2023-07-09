import {observer} from "mobx-react-lite";

const ReviewList = observer(({store}) => {
    return (
        store.reviewList.length > 0 ?
            <div></div> :
            <div>Отзывов пока нет. Вы можете стать первым!</div>
    )
})

export default ReviewList