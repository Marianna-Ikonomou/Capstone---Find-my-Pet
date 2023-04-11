import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = ({ center = [53.5674, 10.034], zoom = 11 }) => {
  const locationMap = useRef(null);

  useEffect(() => {
    const myMap = L.map(locationMap.current).setView([0, 0], 11);

    return () => {
      myMap.remove();
    };
  }, []);

  return (
    <div className="map-container" ref={locationMap}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>Hello world</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
