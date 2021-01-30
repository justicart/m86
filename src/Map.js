import {useEffect, useRef, useState} from 'react';
import ReactMap, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// import { Map, Marker, Overlay } from 'pigeon-maps';
import logo from './logo.svg';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function MapComp({center, locator}) {
  // if (center == null) return null;
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(center[1]);
  const [lat, setLat] = useState(center[0]);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-79.38, 43.65],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const zoom = [15];
  const reversedCenter = [center[1], center[0]];
  const reversedMarkerCoord = locator ? [locator.Longitude, locator.Latitude] : null;

  const fit = locator != null ? [reversedCenter, reversedMarkerCoord] : [reversedCenter, reversedCenter];
  const pad = 35;

  return (
    <div className='map-container' ref={mapContainerRef} style={{height: '100%'}} />
    // <Mapbox
    //   // eslint-disable-next-line
    //   style="mapbox://styles/mapbox/dark-v10?optimize=true"
    //   containerStyle={{
    //     height: '100%',
    //     width: '100%'
    //   }}
    //   // fitBounds={fit}
    //   // fitBoundsOptions={{
    //   //   maxZoom: zoom,
    //   //   padding: {top: pad, bottom: pad, left: pad, right: pad}
    //   //   }}
    // >
    //   {/* <Layer type="symbol" id="stop" layout={{ 'icon-image': 'dot-11' }}>
    //     <Feature coordinates={reversedCenter} />
    //   </Layer>
    //   {locator != null && <Layer type="symbol" id="bus" layout={{ 'icon-image': 'bus' }}>
    //     <Feature coordinates={reversedMarkerCoord} />
    //   </Layer>} */}
    // </Mapbox>
    // PIGEON
    // <Map defaultCenter={center} defaultZoom={zoom}>
    //   <Marker anchor={center} payload={1} onClick={({ event, anchor, payload }) => {}} />
      
    //   {locator != null && <Overlay anchor={[locator.Latitude, locator.Longitude]} offset={[0, 0]}>
    //     <img src={logo} width={240} height={158} alt='' />
    //   </Overlay>}
    // </Map>
  )
}