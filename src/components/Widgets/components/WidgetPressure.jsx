import { observer } from "mobx-react-lite";
import PressureIndicator from "../../PressureIndicator/PressureIndicator";

const WidgetPressure = observer(({ color }) => {
    return (
        <>
            <PressureIndicator value={756.8} color={color}/>
        </>
    )
})

export default WidgetPressure