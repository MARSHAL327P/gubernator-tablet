import { observer } from "mobx-react-lite";
import BaseWidgetTemplate from "./BaseWidgetTemplate";

const WidgetHumidity = observer(({ data, indication }) => {
    const params = [
        {
            name: "Вчера было",
            value: "62" + indication.units
        },
    ]

    return <BaseWidgetTemplate data={data} indication={indication} params={params}/>
})

export default WidgetHumidity