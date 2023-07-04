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

            const markerWrapper = this.getParentElement().getElementsByClassName('marker-wrapper')[0];
            const scaleMarker = markerWrapper.querySelector('.scale-marker');
            const hoverMarker = markerWrapper.querySelector('.hover-marker');

            this.getData().geoObject.events.add('mouseenter', (e) => {
                if (scaleMarker)
                    scaleMarker.classList.add("scale-marker_active")

                if (hoverMarker)
                    hoverMarker.classList.add("hover-marker_active")
            });
            this.getData().geoObject.events.add('mouseleave', (e) => {
                if (scaleMarker)
                    scaleMarker.classList.remove("scale-marker_active")

                if (hoverMarker)
                    hoverMarker.classList.remove("hover-marker_active")
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
        <div className={"marker-wrapper font-sans"}>{props.component}</div>,
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