import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = ({ center = [53.5674, 10.034], zoom = 11 }) => {
  const locationMap = useRef(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const myMap = L.map(locationMap.current).setView(center, zoom);

    myMap.on("click", (event) => {
      const { lat, lng } = event.latlng;
      setMarkers([...markers, { lat, lng }]);
    });

    myMap.on("dblclick", (event) => {
      myMap.zoomOut();
    });

    return () => {
      myMap.remove();
    };
  }, [center, zoom, markers]);

  const handleMarkerEdit = (index, newLat, newLng) => {
    const newMarkers = [...markers];
    newMarkers[index] = { lat: newLat, lng: newLng };
    setMarkers(newMarkers);
  };

  const handleMarkerDelete = (index) => {
    const newMarkers = [...markers];
    newMarkers.splice(index, 1);
    setMarkers(newMarkers);
  };

  return (
    <div className="map-container" ref={locationMap}>
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

        {markers.map(({ lat, lng }, index) => {
          let markerRef = null;
          return (
            <Marker
              key={index}
              position={[lat, lng]}
              ref={(ref) => (markerRef = ref)}
            >
              <Popup
                onOpen={() => {
                  const popupContent = (
                    <div>
                      <p>Latitude: {lat}</p>
                      <p>Longitude: {lng}</p>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          const newLat = event.target.lat.value;
                          const newLng = event.target.lng.value;
                          handleMarkerEdit(index, newLat, newLng);
                        }}
                      >
                        <label htmlFor="lat">Latitude:</label>
                        <input type="text" name="lat" defaultValue={lat} />
                        <br />
                        <label htmlFor="lng">Longitude:</label>
                        <input type="text" name="lng" defaultValue={lng} />
                        <br />
                        <button type="submit">Save</button>
                        <button
                          type="button"
                          onClick={() => {
                            handleMarkerDelete(index);
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  );
                  const popupOptions = {
                    maxWidth: "auto",
                    minWidth: "auto",
                    maxHeight: "auto",
                    closeOnClick: false,
                    closeButton: true,
                  };
                  markerRef.getPopup().setContent(popupContent);
                  markerRef.openPopup();
                }}
              >
                User added marker
              </Popup>
            </Marker>
          );
        })}

        <Marker position={center}>
          <Popup>Hello world</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
