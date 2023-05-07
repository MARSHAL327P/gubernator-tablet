import Sidebar from "../components/Sidebar/components/Sidebar";
import Filter from "../components/Filter/components/Filter";
import { observer } from "mobx-react-lite";

const HomePage = observer(() => {
    return (
        <div className={"flex drop-shadow-xl h-full transition"}>
            <Filter/>
            <Sidebar/>
        </div>
    )
})

export default HomePage