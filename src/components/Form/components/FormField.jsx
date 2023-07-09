import {observer} from "mobx-react-lite";
import {Input, Rating, Typography} from "@material-tailwind/react";
import InfoBlock from "../../InfoBlock/components/InfoBlock";
import {useState} from "react";

const FormField = observer(({field, info = "", type = Input, isRating = false}) => {
    let Type = type
    const [rated, setRated] = useState(0)

    return (
        <div>
            {
                isRating ?
                    <>
                        <Rating value={rated} onChange={(value) => setRated(value)}/>
                        <input {...field.bind()} type="hidden" value={rated}/>
                    </> :
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