import { makeAutoObservable } from "mobx";
import axios from "axios";

export class RealObjectCardStore {
    id = 0
    code = ""
    name = ""
    description = "";
    type = ""
    coord = []
    created_at = null;
    updated_at = null;
    props_updated_at = null;
    props = {}

    static get() {
        return axios.get(process.env.REACT_APP_REAL_OBJECTS)
            .then(({data}) => {
                return data.map(item => {
                    return new RealObjectCardStore(item)
                });
            })
    }

    get link(){
        return `/object/${this.formattedType}/${this.id}`
    }

    get formattedType(){
        return this.type.toLowerCase().replace(/_/g, "-")
    }

    constructor(data) {
        makeAutoObservable(this);

        Object.keys(this).forEach(prop => {
            this[prop] = data[prop]
        })
    }
}