import React from "react";
import GoogleMapReact from "google-map-react";

const Map2 = ({ map2 }) => <div>{map2}</div>;

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDYi39mrFQalcoY-omtS2OSeY1MwSo6paQ" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Map2 lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
