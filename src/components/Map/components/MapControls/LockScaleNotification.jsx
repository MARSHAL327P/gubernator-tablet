import {observer} from "mobx-react-lite";
import MapStore from "../../store/map.store";
import {Alert, Tooltip} from "@material-tailwind/react";
import {ReactComponent as LockIcon} from '../../../../assets/icons/Lock.svg'

const LockScaleNotification = observer(({classes}) => {
    return (
        !!MapStore.selectedAdditionalLayer &&
        <Alert
            className={"alert w-fit bg-white text-black shadow-xl"}
        >
            {/*<Lottie className={"w-14 h-14"} animationData={Lock}/>*/}
            <Tooltip content={"Изменение масштаба заблокировано"}>
                <LockIcon className={"fill-black lg:w-5 lg:h-5"}/>
            </Tooltip>
            <div className={"md:hidden"}>
                Изменение масштаба заблокировано
            </div>
        </Alert>
    )
})

export default LockScaleNotification