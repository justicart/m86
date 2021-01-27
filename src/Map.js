import GoogleMapReact from 'google-map-react';
 

export default function Map({centerTuple, locator}) {
  if (centerTuple == null) return null;
  const center = {
    lat: centerTuple[0],
    lng: centerTuple[1]
  };
  const zoom= 13;
  const AnyReactComponent = () => <div className="locator" />;
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: /* YOUR KEY HERE */'' }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <AnyReactComponent
        lat={locator.Latitude}
        lng={locator.Longitude}
      />
    </GoogleMapReact>
  )
}