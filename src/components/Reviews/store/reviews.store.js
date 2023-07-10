import {action, makeAutoObservable, runInAction} from "mobx";
import {ReviewItemStore} from "./reviewItem.store";
import axios from "axios";

class ReviewsStore {
    reviewList = null
    isLoading = false
    isSend = false
    beachId = 0
    successAdded = false

    fetchReviews() {
        this.isLoading = true

        ReviewItemStore
            .get(this.beachId)
            .then(
                action(data => {
                    this.reviewList = data ?? []
                    this.isLoading = false
                })
            )
    }

    sendRequest(sendData) {
        this.isSend = true

        axios.post(process.env.REACT_APP_REVIEWS, sendData)
            .then(({data}) => {
                runInAction(() => {
                    this.reviewList.unshift(data)
                    this.successAdded = true
                    this.isSend = false
                })
            })
    }

    constructor(beachId) {
        makeAutoObservable(this)

        this.beachId = beachId
        this.fetchReviews()
    }
}

export default ReviewsStore