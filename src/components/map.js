"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const CENTER = { lat: 46.04415925350012, lng: -73.71189315777166 };

// Created once per page load, shared across mounts
let librariesPromise = null;
function loadLibraries() {
  if (!librariesPromise) {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
      version: "weekly",
    });
    librariesPromise = Promise.all([
      loader.importLibrary("maps"),
      loader.importLibrary("marker"),
    ]).catch((err) => {
      librariesPromise = null; // allow a retry on next mount
      throw err;
    });
  }
  return librariesPromise;
}

const ContactMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let marker = null;

    loadLibraries()
      .then(([{ Map: GoogleMap }, { AdvancedMarkerElement }]) => {
        if (cancelled || !mapRef.current) return;

        const mapInstance = new GoogleMap(mapRef.current, {
          center: CENTER,
          zoom: 15,
          disableDefaultUI: true,
          mapId: "982fb575d51b7a455bdeebb",
        });

        marker = new AdvancedMarkerElement({
          position: CENTER,
          map: mapInstance,
          title: "dojang",
        });
      })
      .catch((err) => {
        console.error("Google Maps failed to load:", err);
      });

    return () => {
      cancelled = true;
      if (marker) marker.map = null;
    };
  }, []);

  return (
    <div className="mapBack">
      <div
        ref={mapRef}
        className="map"
        style={{ height: "300px", width: "100%" }}
      >
        we are here
      </div>
    </div>
  );
};

export default ContactMap;
