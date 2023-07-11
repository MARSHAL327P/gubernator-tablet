import { observer } from "mobx-react-lite";
import BaseWidgetTemplate from "./BaseWidgetTemplate";

const WidgetSolarRadiation = observer(({ data, indication }) => {
    console.log(indication.units)
    const params = [
        {
            name: "Сегодняшний пик",
            value: "120" + indication.units
        },
    ]

    return <BaseWidgetTemplate data={data} indication={indication} params={params}/>
})

export default WidgetSolarRadiation