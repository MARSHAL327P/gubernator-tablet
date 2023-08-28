import {observer} from "mobx-react-lite";
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCondition = observer(({children, condition, skeleton}) => {
    return (
        condition ? skeleton : children()
    )
})

export default SkeletonCondition