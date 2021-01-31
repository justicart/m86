import ReactMap, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import logo from './logo.svg';

const Mapbox = ReactMap({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

export default function Map({center, locator, topPad}) {
  if (center == null) return null;
  const zoom = [15];
  const reversedCenter = [center[1], center[0]];
  const reversedMarkerCoord = locator ? [locator.Longitude, locator.Latitude] : null;

  const fit = locator != null ? [reversedCenter, reversedMarkerCoord] : [reversedCenter, reversedCenter];
  const pad = 45;

  return (
    <Mapbox
      // eslint-disable-next-line
      style="mapbox://styles/mapbox/dark-v10?optimize=true"
      containerStyle={{
        height: '100%',
        width: '100%'
      }}
      fitBounds={fit}
      fitBoundsOptions={{
        maxZoom: zoom,
        padding: {top: topPad, bottom: pad, left: pad, right: pad}
        }}
    >
      <Layer type="symbol" id="stop" layout={{ 'icon-image': 'dot-11' }}>
        <Feature coordinates={reversedCenter} />
      </Layer>
      {locator != null && <Layer type="symbol" id="bus" layout={{ 'icon-image': 'bus' }}>
        <Feature coordinates={reversedMarkerCoord} />
      </Layer>}
    </Mapbox>
  )
}