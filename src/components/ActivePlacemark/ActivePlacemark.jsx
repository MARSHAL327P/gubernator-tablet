import React from 'react';
import {Placemark} from '@pbe/react-yandex-maps';
import ReactDOMServer from 'react-dom/server';

const makeLayout = (layoutFactory, component) => {
    let generatedHTML = ReactDOMServer.renderToStaticMarkup(component)

    const Layout = layoutFactory.createClass(generatedHTML, {
        build: function () {
            Layout.superclass.build.call(this);
        },
        clear: function () {
            Layout.superclass.clear.call(this);
        },
    });

    return Layout;
};

const ActivePlacemark = (props) => {
    let balloonLayout = makeLayout(
        props.yMapObject.templateLayoutFactory,
        props.component
    );

    return (
        <Placemark
            {...props}
            options={{
                iconLayout: balloonLayout,
                balloonPanelMaxMapArea: 0,
                ...props.options,
            }}
        />
    )
}

export default ActivePlacemark;