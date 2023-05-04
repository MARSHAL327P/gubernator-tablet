import { observer } from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import Widgets from "../components/Dashboard/components/Widgets";

const BeachPage = observer(() => {
    const tabItems = {
        "Виджеты": {
            content: <Widgets/>
        },
        "Графики": {
            content: "Тут будут графики"
        },
    }

    return (
        <Dashboard tabItems={tabItems}/>
    )
})

export default BeachPage