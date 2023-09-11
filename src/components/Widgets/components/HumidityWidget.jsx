import { observer } from "mobx-react-lite";
import BaseWidgetTemplate from "../templates/BaseWidgetTemplate";

const HumidityWidget = observer(({ data, indication }) => {
    const params = [
        {
            name: "Вчера было",
            value: `${data.yesterday}${indication.units}`
        },
    ]

    return <BaseWidgetTemplate value={data.value} indication={indication} params={params}/>
})

export default HumidityWidget