import { observer } from "mobx-react-lite";
import cc from "classcat";

const FixedHeader = observer(({children, elOffset, classes}) => {
    return (
        <div className={cc({
            "flex gap-4 transition": true,
            "shadow-xl": elOffset > 0,
            [classes]: true
        })}>
            {children}
        </div>
    )
})

export default FixedHeader