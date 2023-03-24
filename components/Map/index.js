import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function Map() {
  const center = [53.5729, 10.0192];
  const zoom = 10;

  return (
    <div class="center-image">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default Map;
