import {action, makeAutoObservable, observable, runInAction} from "mobx";
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

        setTimeout(() => {
            runInAction(() => {
                this.isSend = false
                let dataFromServer = {
                    "id": 5,
                    "created_at": "2023-07-09T18:36:02.000000Z",
                    "updated_at": "2023-07-09T18:36:02.000000Z",
                    "name": "Александр",
                    "email": "sanya.shvedenko@mail.ru",
                    "review": "Тестовый отзыв",
                    "mark": 3,
                    "id_object": 1,
                    "ip": "83.171.224.220"
                }
                this.reviewList.unshift(dataFromServer)
                this.successAdded = true
            })
        }, 1000)
        // axios.post(process.env.REACT_APP_REVIEWS, sendData)
        //     .then((data) => {
        //         console.log(data)
        //         this.isSend = false
        //     })
    }

    constructor(beachId) {
        makeAutoObservable(this)

        this.beachId = beachId
        this.fetchReviews()
    }
}

export default ReviewsStore