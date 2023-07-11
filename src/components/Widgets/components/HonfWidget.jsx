import {observer} from "mobx-react-lite";
import BaseWidgetTemplate from "./BaseWidgetTemplate";

const HonfWidget = observer(({data, indication}) => {
    const params = [
        {
            name: "Вчера было",
            value: `0.5${indication.units}`
        },
    ]

    return <BaseWidgetTemplate data={data} indication={indication} params={params}/>
})

export default HonfWidget