import {observer} from "mobx-react-lite";
import {Chip} from "@material-tailwind/react";

const BeachCardProps = observer(({cardProps}) => {
    return (
        Object.keys(cardProps).map(propId => {
            let prop = cardProps[propId]

            return (
                prop.value && <Chip
                    className={"font-medium"}
                    key={propId}
                    value={prop.name}
                />
            )
        })
    )
})

export default BeachCardProps