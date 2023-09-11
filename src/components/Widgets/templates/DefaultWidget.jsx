import {observer} from "mobx-react-lite";
import BaseWidgetTemplate from "./BaseWidgetTemplate";

const DefaultWidget = observer(({data, indication}) => {
    return <BaseWidgetTemplate value={data.value} indication={indication}/>
})

export default DefaultWidget