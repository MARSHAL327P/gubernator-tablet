import { makeAutoObservable } from "mobx";
import axios from "axios";

export class ReviewItemStore {
    id = 0
    id_object = 0
    mark = 0
    name = ""
    email = ""
    review = ""
    created_at = null
    updated_at = null
    ip = ""

    static get(beachId) {
        return axios.get(process.env.REACT_APP_REVIEWS + "/" + beachId)
            .then(({data}) => {
                return data.map(item => {
                    return new ReviewItemStore(item)
                });
            })
    }

    constructor(data) {
        makeAutoObservable(this);

        Object.keys(this).forEach(prop => {
            this[prop] = data[prop]
        })
    }
}