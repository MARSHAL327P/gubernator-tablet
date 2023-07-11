import {observer} from "mobx-react-lite";
import {Chip} from "@material-tailwind/react";
import cc from "classcat";

const BeachCardProps = observer(({cardProps, classes}) => {
    return (
        Object.keys(cardProps).map(propId => {
            let prop = cardProps[propId]

            return (
                prop.value && <Chip
                    className={cc(["font-medium bg-primary/20 text-black", classes])}
                    key={propId}
                    value={prop.name}
                />
            )
        })
    )
})

export default BeachCardProps