import {observer} from "mobx-react-lite";
import BaseWidgetTemplate from "./BaseWidgetTemplate";

const DefaultWidget = observer(({data, indication}) => {
    return <BaseWidgetTemplate data={data} indication={indication}/>
})

export default DefaultWidget