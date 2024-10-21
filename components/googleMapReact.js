'use client'
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {APIProvider, Map, Pin} from '@vis.gl/react-google-maps';
import MarkerComponent from "@/components/MarkerComponent";
import InfoWindowComponent from "@/components/InfoWindowComponent";
import {Polygon} from "@/components/polygon";
import {MoomarkLocation} from '@/components/geoJson/moomarkLocation'


const Z_INDEX_SELECTED = 4;
const Z_INDEX_HOVER = 5;

export default function GoogleMapReact() {
    const [markers] = useState(LocationMarkers);
    const [hoverId, setHoverId] = useState(0);
    const [selectedId, setSelectedId] = useState(0);
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const onMouseEnter = useCallback((id) => setHoverId(id), []);
    const onMouseLeave = useCallback(() => setHoverId(null), []);

    const onMarkerClick = useCallback((id, marker) => {
        setSelectedId(id);
        if(marker){
            setSelectedMarker(marker);
        }
        if (id !== selectedId) {
            setInfoWindowOpen(true);
        } else {
            setInfoWindowOpen(isOpen => !isOpen);
        }
    }, [selectedId]);

    const selectedMarkerInfo = useMemo(() =>(
        markers && selectedId
        ?
            markers.filter((marker) => marker.id === selectedId)
        :
            null
    ), [markers, selectedId]);


    const onMapClick = useCallback(() => {
        setSelectedId(0);
        setSelectedMarker(null)
        setInfoWindowOpen(false);
    }, []);

    const handleInfoWindowCloseClick = useCallback(() => {
        setInfoWindowOpen(false)
    }, []);

    useEffect(() => {
        console.log(selectedId);
        console.log(selectedMarker);
        console.log(infoWindowOpen);
    }, [selectedId, infoWindowOpen, selectedMarker]);

    const convertCoordinates = (coordinates) => {
        return coordinates.map(ring =>
            ring.map(c => ({lat: c[1], lng: c[0]}))
        );
    };

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['marker']}>
            <Map
                mapId={'bf51a910020fa25a'}
                className={'w-full h-screen [filter:brightness(100%)_contrast(100%)_saturate(0%)_blur(0px)_hue-rotate(0deg)]'}
                defaultZoom={5}
                defaultCenter={{ lat: 21.1610858, lng: 79.0725101 }}
                gestureHandling={'greedy'}
                onClick={onMapClick}
                clickableIcons={false}
                disableDefaultUI>
                {markers.map(({id, zIndex: zIndexDefault, position, type, data}) => {

                    let zIndex= zIndexDefault

                    if (hoverId === id) {
                        zIndex = Z_INDEX_HOVER;
                    }

                    if (selectedId === id) {
                        zIndex = Z_INDEX_SELECTED;
                    }

                    if(type === 'active'){
                        return(
                        <>
                            <MarkerComponent
                                key={id}
                                onMarkerClick={(marker) => onMarkerClick(id, marker)}
                                onMouseEnter={() => onMouseEnter(id)}
                                onMouseLeave={onMouseLeave}
                                zIndex={zIndex}
                                className={""}
                                style={{
                                    transform: `scale(${[hoverId, selectedId].includes(id) ? 1.4 : 1})`
                                }}
                                position={position}
                            >
                                <Pin
                                    background={selectedId === id ? '#1D1D54' : '#1D1D54'}
                                    borderColor={selectedId === id ? '#595ECD' : '#595ECD'}
                                    glyphColor={selectedId === id ? '#FFFFFF' : '#FFFFFF'}
                                />
                            </MarkerComponent>
                        </>
                        )
                    }
                    if(type === 'planned'){
                        return(
                            <>
                                <MarkerComponent
                                    key={id}
                                    onMarkerClick={(marker) => onMarkerClick(id, marker)}
                                    onMouseEnter={() => onMouseEnter(id)}
                                    onMouseLeave={onMouseLeave}
                                    zIndex={zIndex}
                                    className={""}
                                    style={{
                                        transform: `scale(${[hoverId, selectedId].includes(id) ? 1.4 : 1})`
                                    }}
                                    position={position}
                                >
                                    <Pin
                                        background={selectedId === id ? '#FD003A' : '#FD003A'}
                                        borderColor={selectedId === id ? '#BF0000' : '#BF0000'}
                                        glyphColor={selectedId === id ? '#FFFFFF' : '#FFFFFF'}
                                    />
                                </MarkerComponent>
                            </>
                        )
                    }
                })}
                {infoWindowOpen && selectedMarker && (
                    <InfoWindowComponent
                        selectedId={selectedId}
                        selectedMarker={selectedMarker}
                        selectedMarkerInfo={selectedMarkerInfo}
                        handleInfoWindowCloseClick={handleInfoWindowCloseClick}
                    />
                )}

                {MoomarkLocation.features.map((feature, index) => (
                    <Polygon
                        key={index}
                        paths={feature.geometry.coordinates}
                        options={{
                            strokeColor: '#1D1D54',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#1D1D54',
                            fillOpacity: 0.5
                        }}
                    />
                ))}
            </Map>
        </APIProvider>
    );
}

export const LocationMarkers = [
    {
        id: 1,
        position: { lat: 12.891438, lng: 77.641499 },
        type: 'active',
        zIndex: 0,
        data: {
            title: 'title A',
            address: 'address A lorem ipsum dolor sit lorem ipsum dolor sit',
            link: 'https://maps.app.goo.gl/Ts6Jopq5FtcLf9gE9',
        }
    },
    {
        id: 2,
        position: { lat: 25.3763728, lng: 83.0490821 },
        type: 'active',
        zIndex: 1,
        data: {
            title: 'title B',
            address: 'address B lorem ipsum dolor sit lorem ipsum dolor sit',
            link: 'https://maps.app.goo.gl/Ts6Jopq5FtcLf9gE9',
        }
    },
    {
        id: 3,
        position: { lat: 19.488157, lng: 80.558399 },
        type: 'planned',
        zIndex: 2,
        data: {
            title: 'title C',
            address: 'address C lorem ipsum dolor sit lorem ipsum dolor sit',
            link: 'https://maps.app.goo.gl/Ts6Jopq5FtcLf9gE9',
        }
    },
    {
        id: 4,
        position: { lat: 16.4009528, lng: 74.155086 },
        type: 'planned',
        zIndex: 3,
        data: {
            title: 'title D',
            address: 'address D lorem ipsum dolor sit lorem ipsum dolor sit',
            link: 'https://maps.app.goo.gl/Ts6Jopq5FtcLf9gE9',
        }
    },
];