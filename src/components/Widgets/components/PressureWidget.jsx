import { observer } from "mobx-react-lite";
import PressureIndicator from "../../PressureIndicator/PressureIndicator";

const PressureWidget = observer(({ data, indication }) => {
    return (
        <>
            <PressureIndicator value={data} indication={indication}/>
            <div></div>
        </>

    )
})

export default PressureWidget