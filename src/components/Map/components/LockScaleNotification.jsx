import {observer} from "mobx-react-lite";
import MapStore from "../store/map.store";
import {Alert} from "@material-tailwind/react";
import {Transition} from "@headlessui/react";
import {ReactComponent as LockIcon} from '../../../assets/icons/Lock.svg'
import cc from "classcat";

const LockScaleNotification = observer(({classes}) => {
    return (
        <Transition
            show={!!MapStore.selectedAdditionalLayer}
            className={cc(["absolute bottom-5 mx-auto inset-x-0 z-20 w-fit", classes])}
            enter="transition duration-75"
            enterFrom="opacity-0 translate-y-5"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-5"
        >
            <Alert
                className={"alert w-fit bg-white text-black shadow-xl"}
            >
                <LockIcon className={"fill-black"}/>
                Изменение масштаба заблокировано
            </Alert>
        </Transition>
    )
})

export default LockScaleNotification