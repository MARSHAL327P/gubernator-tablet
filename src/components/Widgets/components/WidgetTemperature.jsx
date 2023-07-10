import {observer} from "mobx-react-lite";
import cc from "classcat";
import BaseWidgetTemplate from "./BaseWidgetTemplate";

const WidgetTemperature = observer(({data, indication}) => {
    const params = [
        {
            name: "Вчера было",
            value: "16.2" + indication.units
        },
        {
            name: "Ощущается как",
            value: "17.8" + indication.units
        }
    ]

    return <BaseWidgetTemplate data={data} indication={indication} params={params}/>
})

export default WidgetTemperature