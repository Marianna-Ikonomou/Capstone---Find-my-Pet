import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = ({ center = [53.5674, 10.034], zoom = 11 }) => {
  const [markers, setMarkers] = useState(() => {
    const storedMarkers = localStorage.getItem("markers");
    return storedMarkers ? JSON.parse(storedMarkers) : [];
  });

  useEffect(() => {
    localStorage.setItem("markers", JSON.stringify(markers));
  }, [markers]);

  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });

  const addMarker = (e) => {
    setMarkers((markers) => [...markers, e.latlng]);
  };
  const [popupContent, setPopupContent] = useState("");

  const Markers = () =>
    markers.map((position, idx) => (
      <Marker key={`marker-${idx}`} position={position} icon={customIcon}>
        <Popup>
          <textarea
            value={popupContent}
            onChange={(e) => setPopupContent(e.target.value)}
            placeholder="text"
          />
          <br />
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteMarker(idx);
            }}
          >
            Delete
          </button>{" "}
          <button
            onClick={(e) => {
              e.stopPropagation();
              saveMarker(idx);
            }}
          >
            Save
          </button>
        </Popup>
      </Marker>
    ));

  const saveMarker = (idx) => {
    setMarkers((markers) => {
      const newMarkers = [...markers];
      newMarkers[idx] = { ...newMarkers[idx], popupContent };
      localStorage.setItem("markers", JSON.stringify(newMarkers));
      return newMarkers;
    });
  };

  const deleteMarker = (idx) => {
    setMarkers((markers) => markers.filter((_, i) => i !== idx));
  };

  const LocationMarker = () => {
    useMapEvents({
      click: addMarker,
    });

    return null;
  };

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <Markers />
      </MapContainer>
    </div>
  );
};

export default Map;
