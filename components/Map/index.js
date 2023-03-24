import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function Map() {
  const center = [51.505, -0.09];
  const zoom = 13;

  return (
    <MapContainer center={center} zoom={zoom}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}

export default Map;
