import {observer} from "mobx-react-lite";
import BaseWidgetTemplate from "../templates/BaseWidgetTemplate";

const TempSurfWidget = observer(({data, indication}) => {
    const params = [
        {
            name: "Вчера было",
            value: `19.6${indication.units}`
        },
    ]

    return <BaseWidgetTemplate
        value={data.value}
        indication={indication}
        // params={params}
    />
})

export default TempSurfWidget