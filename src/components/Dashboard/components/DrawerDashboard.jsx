import {observer} from "mobx-react-lite";
import DashboardStore from "../store/dashboard.store";
import {Drawer, IconButton, List, ListItem, Typography} from "@material-tailwind/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import {runInAction} from "mobx";
import {Link} from "react-router-dom";
import {Tab} from "@headlessui/react";

const DrawerDashboard = observer(({tabItems}) => {
    const closeDrawer = () => {
        runInAction(() => {
            DashboardStore.drawerIsOpen = false
        })
    };

    const openDrawer = () => {
        runInAction(() => {
            DashboardStore.drawerIsOpen = true
        })
    };


    return (
        <>
            <Drawer placement={"right"} open={DashboardStore.drawerIsOpen} onClose={closeDrawer}>
                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray">
                        Вкладки
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                <List>
                    <Tab.List>
                    {
                        tabItems.map(tab => {
                            return (
                                <Link
                                    key={tab.title}
                                    to={tab.getParam ? ("?tab=" + tab.link) : tab.link}
                                    className={"outline-none w-full"}
                                    onClick={closeDrawer}
                                >
                                    <ListItem>
                                        <Tab>
                                            {tab.title}
                                        </Tab>
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                    </Tab.List>
                </List>
            </Drawer>
        </>
    )
})

export default DrawerDashboard