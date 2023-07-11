import { observer } from "mobx-react-lite";
import BaseWidgetTemplate from "./BaseWidgetTemplate";

const HumidityWidget = observer(({ data, indication }) => {
    const params = [
        {
            name: "Вчера было",
            value: `${data.yesterday}${indication.units}`
        },
    ]

    return <BaseWidgetTemplate data={data.value} indication={indication} params={params}/>
})

export default HumidityWidget