import { observer } from "mobx-react-lite";
import BaseWidgetTemplate from "./BaseWidgetTemplate";
import parse from "html-react-parser";

const WidgetSolarRadiation = observer(({ data, indication }) => {
    const params = [
        {
            name: "Сегодняшний пик",
            value: parse(`${data.todayMax} Вт/м<sup>2</sup>`)
        },
    ]

    return <BaseWidgetTemplate data={data.value} indication={indication} params={params}/>
})

export default WidgetSolarRadiation