import {observer} from "mobx-react-lite";
import {Badge, Button} from "@material-tailwind/react";
import { ReactComponent as Human } from "../../../assets/icons/Human.svg";
import cc from "classcat";

const AdminBtn = observer(({color = "white", classes = null}) => {
    return (
        <div className={classes ?? "!absolute top-7 right-5"}>
            {/*<Badge content="2">*/}
                <Button color={color}>
                    <Human className={cc({
                        "fill-black": color === "white",
                        "fill-white": color !== "white",
                    })}/>
                    Профиль
                </Button>
            {/*</Badge>*/}
        </div>
    )
})

export default AdminBtn