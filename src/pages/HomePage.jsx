import Sidebar from "../components/Sidebar/components/Sidebar";
import Filter from "../components/Filter/components/Filter";
import { observer } from "mobx-react-lite";

const HomePage = observer(() => {
    return (
        <div className={"flex drop-shadow-xl h-full transition"}>
            <Sidebar/>
            <Filter/>
        </div>
    )
})

export default HomePage