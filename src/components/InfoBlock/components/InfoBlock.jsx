import {observer} from "mobx-react-lite";
import {InformationCircleIcon} from "@heroicons/react/24/solid";
import {Typography} from "@material-tailwind/react";

const InfoBlock = observer(({text}) => {
    return (
        <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-1">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {text}
        </Typography>
    )
})

export default InfoBlock