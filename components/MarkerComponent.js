import React from 'react';
import {AdvancedMarker, useAdvancedMarkerRef} from "@vis.gl/react-google-maps";

export default function MarkerComponent({children, onMarkerClick, ...advancedMarkerProps}) {
    const [markerRef, marker] = useAdvancedMarkerRef();


    return (
        <AdvancedMarker
            ref={markerRef}
            onClick={() => {
                if (marker) {
                    onMarkerClick(marker);
                }
            }}
            {...advancedMarkerProps}>
            {children}
        </AdvancedMarker>
    );
}