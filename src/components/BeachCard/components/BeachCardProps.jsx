import {observer} from "mobx-react-lite";
import {Chip} from "@material-tailwind/react";
import cc from "classcat";

const BeachCardProps = observer(({cardProps, classes = ""}) => {
    return (
        <div className={"flex flex-wrap gap-1"}>
            {
                Object.keys(cardProps).map(propId => {
                    let prop = cardProps[propId]

                    return (
                        prop.value && <Chip
                            className={cc(["font-medium bg-primary text-white", classes])}
                            key={propId}
                            value={prop.name}
                        />
                    )
                })
            }
        </div>
    )
})

export default BeachCardProps