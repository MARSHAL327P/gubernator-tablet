import {observer} from "mobx-react-lite";
import BaseWidgetTemplate from "./BaseWidgetTemplate";

const TempSurfWidget = observer(({data, indication}) => {
    const params = [
        {
            name: "Вчера было",
            value: `19.6${indication.units}`
        },
    ]

    return <BaseWidgetTemplate data={data} indication={indication} params={params}/>
})

export default TempSurfWidget