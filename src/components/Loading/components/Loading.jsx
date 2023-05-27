import {observer} from "mobx-react-lite";
import {Spinner} from "@material-tailwind/react";

const Loading = observer(({text = ""}) => {
    return (
        <div className={"flex items-center gap-3 mx-auto"}>
            <Spinner className={"w-10 h-10"}/>
            {text}
        </div>
    )
})

export default Loading