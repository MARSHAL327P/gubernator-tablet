import {observer} from "mobx-react-lite";
import {Suspense} from "react";

const SuspenseWrapper = observer(({children}) => {
    return (
        <Suspense fallback={<div className={"absolute"}></div>}>
            {children}
        </Suspense>
    )
})

export default SuspenseWrapper