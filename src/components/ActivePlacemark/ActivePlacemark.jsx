import React from 'react';
import {Placemark} from '@pbe/react-yandex-maps';
import ReactDOMServer from 'react-dom/server';
import MapStore from "../Map/store/map.store";
import transparent from '../../assets/img/transparent.png';

const makeLayout = (layoutFactory, component) => {
    let generatedHTML = ReactDOMServer.renderToStaticMarkup(component)

    const Layout = layoutFactory.createClass(generatedHTML, {
        build: function () {
            Layout.superclass.build.call(this);

            const backgroundElement = this.getParentElement().getElementsByClassName(
                'scale-marker',
            )[0];

            this.getData().geoObject.events.add('mouseenter', (e) => {
                backgroundElement.style.transform = `scale(1.2)`;
            });
            this.getData().geoObject.events.add('mouseleave', (e) => {
                backgroundElement.style.transform = `scale(1)`;
            });
        },
        clear: function () {
            Layout.superclass.clear.call(this);
        },
    });

    return Layout;
};

const ActivePlacemark = (props) => {
    if (!MapStore.ymaps) return null

    let balloonLayout = makeLayout(
        MapStore.ymaps.templateLayoutFactory,
        props.component,
    );

    return (
        <Placemark
            {...props}
            options={{
                iconLayout: "default#imageWithContent",
                iconImageHref: transparent,
                iconContentLayout: balloonLayout,
                balloonPanelMaxMapArea: 0,
                ...props.options,
            }}
        />
    )
}

export default ActivePlacemark;