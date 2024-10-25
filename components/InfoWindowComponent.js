import React from 'react';
import { InfoWindow } from '@vis.gl/react-google-maps';
import Link from "next/link";

export default function InfoWindowComponent({selectedMarker, handleInfoWindowCloseClick, selectedMarkerInfo}) {
    const {data} = selectedMarkerInfo[0];
    // console.log(data);
    return (
        <InfoWindow
            anchor={selectedMarker}
            onCloseClick={handleInfoWindowCloseClick}>
            <h5 className="font-bold">{data.title}</h5>
            <p className='max-w-60'>{data.address}</p>
            <Link href={data.link} className="font-medium italic after:content-['↗'] after:pr-2" aria-label={''} target={'_blank'}>Get direction</Link>
        </InfoWindow>
    );
}