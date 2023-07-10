import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

const plugins = {
    dvr: dvr(validatorjs)
};

const fields = [
    {
        name: "name",
        label: "Имя",
        placeholder: "Имя",
        rules: "required|string",
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Email",
        rules: "required|email|string",
    },
    {
        name: "review",
        label: "Отзыв",
        placeholder: "Отзыв",
        rules: "string",
    },
    {
        name: "rating",
        label: "Рейтинг",
        placeholder: "Рейтинг",
        rules: "required",
    },
];

const hooks = {
    onSuccess(form) {
        SelectedClassInfoStore.currentClass.reviews.sendRequest(form.values())
    },
    onError(form) {
        // console.log("All form errors", form.errors());
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default new MobxReactForm(
    { fields },
    {
        plugins,
        hooks
    }
);
