import { observer } from "mobx-react-lite";
import cc from "classcat";
import {forwardRef} from "react";

const FixedHeader = observer(forwardRef(({children, elOffset, classes}, ref) => {
    return (
        <div className={cc({
            "flex gap-4 transition": true,
            "shadow-xl": elOffset > 0,
            [classes]: true
        })}
        ref={ref}
        >
            {children}
        </div>
    )
}))

export default FixedHeader