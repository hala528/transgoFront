// LiveMap.js
import { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const DUMMY_API_URL = "https://your-backend.com/api";

export default function LiveMap({ apiUrl = DUMMY_API_URL }) {
  const [trips, setTrips] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyACSWABcipQQCG6r95SkwrUjctdU5dFo0A",
  });

  useEffect(() => {
    const fetchTrips = () => {
      const dummyTrips = [
        { id: 1, driver: "Ali", lat: 33.5, lng: 36.3, from: "Damascus", to: "Aleppo" },
        { id: 2, driver: "Sara", lat: 33.6, lng: 36.35, from: "Homs", to: "Hama" },
      ];
      setTrips(dummyTrips);
    };

    fetchTrips();
    const interval = setInterval(fetchTrips, 1000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  if (!isLoaded) return <div>Loading Google Map...</div>;

  return (
    <div
      style={{
        width: "520%",
        height: "70vh",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        border: "1px solid #e5e5e5",
      }}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: 33.5, lng: 36.3 }}
        zoom={6}
      >
        {trips.map((trip) => (
          <Marker
            key={trip.id}
            position={{ lat: trip.lat, lng: trip.lng }}
            label={trip.driver}
            title={`#${trip.id} ${trip.driver} | ${trip.from} → ${trip.to}`}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
