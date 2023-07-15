import {observer} from "mobx-react-lite";

const Notification = observer(({content}) => {
    return (
        <div className={"fixed -left-2/4 -translate-x-3/4 transition bottom-5 bg-white p-6 rounded-xl shadow-lg"}>
            {content}
        </div>
    )
})

export default Notification