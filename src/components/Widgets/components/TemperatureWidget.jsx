import {observer} from "mobx-react-lite";
import BaseWidgetTemplate from "./BaseWidgetTemplate";

const TemperatureWidget = observer(({data, indication}) => {
    const params = [
        {
            name: "Вчера было",
            value: `${data.yesterday}${indication.units}`
        },
        {
            name: "Ощущается как",
            value: `${data.feelsLike}${indication.units}`
        }
    ]

    return <BaseWidgetTemplate value={data.value} indication={indication} params={params}/>
})

export default TemperatureWidget