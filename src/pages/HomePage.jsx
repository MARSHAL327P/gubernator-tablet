import Sidebar from "../components/Sidebar/components/Sidebar";
import Filter from "../components/Filter/components/Filter";
import { observer } from "mobx-react-lite";

const HomePage = observer(() => {
    return (
        <div className={"absolute top-0 left-0 flex drop-shadow-xl h-full transition"}>
            <Filter/>
            <Sidebar/>
        </div>
    )
})

export default HomePage