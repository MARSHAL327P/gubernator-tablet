import { observer } from "mobx-react-lite";

const FixedHeader = observer(({children, elOffset, classes}) => {
    return (
        <div className={"flex gap-4 transition" + (elOffset > 0 ? " shadow-xl" : "") + " " + classes}>
            {children}
        </div>
    )
})

export default FixedHeader