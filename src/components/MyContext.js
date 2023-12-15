import React, {createContext, useEffect, useState} from 'react';
import MapStore from "./Map/store/map.store";

/* global ymaps3 */

export const MyContext = createContext(null);

export const MyContextProvider = ({ children }) => {
    let [mapComponents, setMapComponents] = useState({})

    useEffect(() => {
        MapStore.loadMap().then(data => {
            setMapComponents(data)
        })
    }, []);

    return (
        <MyContext.Provider value={{ mapComponents }}>
            {children}
        </MyContext.Provider>
    );
};