import {observer} from "mobx-react-lite";
import {Suspense} from "react";

const SuspenseWrapper = observer(({children}) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    )
})

export default SuspenseWrapper