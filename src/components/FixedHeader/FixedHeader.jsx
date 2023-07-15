import {observer} from "mobx-react-lite";
import cc from "classcat";
import {forwardRef} from "react";
import SidebarStore from "../Sidebar/store/sidebar.store";

const FixedHeader = observer(forwardRef(({children, elOffset, classes}, ref) => {
    return (
        <div
            className={cc({
                "flex gap-4 transition lg:w-full": true,
                "shadow-xl": elOffset > 0,
                [classes]: true
            })}
            ref={ref}
            onTouchStart={SidebarStore.onTouchStart}
            onTouchMove={SidebarStore.onTouchMove}
            onTouchEnd={SidebarStore.onTouchEnd}
        >
            {children}
        </div>
    )
}))

export default FixedHeader