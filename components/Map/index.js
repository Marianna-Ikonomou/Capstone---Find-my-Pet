import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Popup } from "react-leaflet";
import { Marker } from "react-leaflet";

function Map() {
  if (typeof window !== "undefined") {
    const center = [53.5674, 10.034];
    const zoom = 10;

    return (
      <div className="center-image">
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>Hello world</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
  return null;
}

export default Map;
