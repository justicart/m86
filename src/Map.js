import ReactMap, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { Map, Marker, Overlay } from 'pigeon-maps';
import logo from './logo.svg';

const Mapbox = ReactMap({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

export default function MapComp({center, locator}) {
  if (center == null) return null;
  const zoom = [15];
  const reversedCenter = [center[1], center[0]];
  const reversedMarkerCoord = locator ? [locator.Longitude, locator.Latitude] : null;

  const fit = locator != null ? [reversedCenter, reversedMarkerCoord] : [reversedCenter, reversedCenter];
  const pad = 35;

  return (
    <Mapbox
      // eslint-disable-next-line
      style="mapbox://styles/mapbox/dark-v10?optimize=true"
      containerStyle={{
        height: '100%',
        width: '100%'
      }}
      // fitBounds={fit}
      // fitBoundsOptions={{
      //   maxZoom: zoom,
      //   padding: {top: pad, bottom: pad, left: pad, right: pad}
      //   }}
    >
      {/* <Layer type="symbol" id="stop" layout={{ 'icon-image': 'dot-11' }}>
        <Feature coordinates={reversedCenter} />
      </Layer>
      {locator != null && <Layer type="symbol" id="bus" layout={{ 'icon-image': 'bus' }}>
        <Feature coordinates={reversedMarkerCoord} />
      </Layer>} */}
    </Mapbox>
    // PIGEON
    // <Map defaultCenter={center} defaultZoom={zoom}>
    //   <Marker anchor={center} payload={1} onClick={({ event, anchor, payload }) => {}} />
      
    //   {locator != null && <Overlay anchor={[locator.Latitude, locator.Longitude]} offset={[0, 0]}>
    //     <img src={logo} width={240} height={158} alt='' />
    //   </Overlay>}
    // </Map>
  )
}