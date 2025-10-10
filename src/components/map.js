import React, { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

let MAP_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const Map = () => {
  const [map, setTheMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: MAP_API_KEY,
          version: "weekly",
          libraries: ["places", "marker"],
        });

        const [{ Map }, { AdvancedMarkerElement }, { PlacesService }] =
          await Promise.all([
            loader.importLibrary("maps"),
            loader.importLibrary("marker"),
            loader.importLibrary("places"),
          ]);

        let stLouis = { lat: 46.04415925350012, lng: -73.71189315777166 };

        let mapElement = document.getElementById("map");
        let mapInstance = new Map(mapElement, {
          center: stLouis,
          zoom: 15,
          disableDefaultUI: true,
          mapId: "982fb575d51b7a455bdeebb",
        });

        new AdvancedMarkerElement({
          position: stLouis,
          map: mapInstance,
          title: "dojang",
        });

        setTheMap(mapInstance);
      } catch (error) {
        return error;
      }
    };
    initMap();
  }, []);

  return (
    <div className="mapBack">
      <div id="map" className="map" style={{ height: "300px", width: "100%" }}>
        we are here
      </div>
    </div>
  );
};

export default Map;
