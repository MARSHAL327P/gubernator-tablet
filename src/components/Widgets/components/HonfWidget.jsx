import {observer} from "mobx-react-lite";
import BaseWidgetTemplate from "../templates/BaseWidgetTemplate";

const HonfWidget = observer(({data, indication}) => {
    const params = [
        {
            name: "Вчера было",
            value: `0.5${indication.units}`
        },
    ]

    return <BaseWidgetTemplate
        value={data.value}
        indication={indication}
        // params={params}
    />
})

export default HonfWidget