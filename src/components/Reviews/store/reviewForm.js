import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

const plugins = {
    dvr: dvr(validatorjs)
};

const fields = [
    {
        name: "name",
        label: "Имя",
        placeholder: "Имя",
        rules: "required|string",
        value: ""
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Email",
        rules: "required|email|string|between:5,25",
        value: "",
    },
    {
        name: "review",
        label: "Отзыв",
        placeholder: "Отзыв",
        rules: "required|string",
        value: "",
    },
    {
        name: "reviewRating",
        label: "Рейтинг",
        placeholder: "Рейтинг",
        rules: "required",
        value: "",
        error: "Поле Рейтинг обязательно для заполнения"
    },
];

const hooks = {
    onSuccess(form) {
        console.log("Form Values!", form.values());
    },
    onError(form) {
        console.log("All form errors", form.errors());
    }
};

export default new MobxReactForm(
    { fields },
    {
        plugins,
        hooks
    }
);
