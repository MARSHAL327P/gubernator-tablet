import {observer} from "mobx-react-lite";
import {Input, Rating, Typography} from "@material-tailwind/react";
import InfoBlock from "../../InfoBlock/components/InfoBlock";
import {useEffect, useState} from "react";

const FormField = observer(({field, info = "", type = Input, isRating = false}) => {
    let Type = type
    const [rated, setRated] = useState(0)
    const ratingGrade = ["Ужасно", "Плохо", "Нормально", "Хорошо", "Отлично"]

    useEffect(() => {
        field.validate()
    }, [field, rated])

    return (
        <div>
            {
                isRating ?
                    <div className={"flex items-center gap-2"}>
                        <Rating className={"rating"} value={rated} onChange={(value) => {
                            setRated(value)
                            field.set(value)
                        }}
                        />
                        {
                            rated > 0 &&
                            <Typography variant={"paragraph"}>
                                {ratingGrade[rated - 1]}
                            </Typography>
                        }
                        <input {...field.bind()} type={"hidden"}/>
                    </div> :
                    <Type {...field.bind()}/>
            }
            {info && <InfoBlock text={info}/>}
            {
                field.error &&
                <Typography variant={"small"} className={"text-danger mt-1"}>
                    {
                        field.error
                            .replace(/The (.*?) field is required\./g, "Поле $1 обязательно для заполнения")
                            .replace(/The (.*?) format is invalid\./g, "Неверный формат поля $1")
                    }
                </Typography>
            }
        </div>
    )
})

export default FormField