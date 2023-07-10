import {observer} from "mobx-react-lite";
import MapStore from "../store/map.store";
import {Alert} from "@material-tailwind/react";
import {ReactComponent as LockIcon} from '../../../assets/icons/Lock.svg'

const LockScaleNotification = observer(({classes}) => {
    return (
        !!MapStore.selectedAdditionalLayer &&
        <Alert
            className={"alert w-fit bg-white text-black shadow-xl"}
        >
            {/*<Lottie className={"w-14 h-14"} animationData={Lock}/>*/}
            <LockIcon className={"fill-black"}/>
            Изменение масштаба заблокировано
        </Alert>
    )
})

export default LockScaleNotification