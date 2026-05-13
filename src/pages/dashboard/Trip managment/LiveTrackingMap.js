import { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

import { Axios } from "../../../api/axios";
import { TRIPS_TRACKING_ACTIVE, GOOGLE_MAPS_API_KEY} from "../../../api/api"; 

export default function LiveTripsMap() {


const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
});

  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [summary, setSummary] = useState({
    active_count: 0,
    delayed_count: 0,
  });

  const fetchTrips = useCallback(async () => {
    try {
      const res = await Axios.get(TRIPS_TRACKING_ACTIVE);

      const data = res.data.data;

      setTrips(data.items || []);
      setSummary(data.summary || {});
    } catch (err) {
      console.error("Tracking error:", err);
    }
  }, []);

 
  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTrips();
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchTrips]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div
        style={{
          width: 260,
          background: "#111827",
          color: "white",
          padding: 16,
          borderRadius: 12,
          height: "70vh",
        }}
      >
        <h3>🚗 Live Trips</h3>

        <div style={{ marginTop: 20 }}>
          <p>Active: {summary.active_count}</p>
          <p>Delayed: {summary.delayed_count}</p>
        </div>

        <hr style={{ margin: "15px 0", opacity: 0.2 }} />

        {trips.map((t) => (
          <div
            key={t.trip_id}
            onClick={() => setSelectedTrip(t)}
            style={{
              padding: 10,
              marginBottom: 10,
              background: "#1f2937",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{t.driver_name}</div>

            <div style={{ color: t.status.color }}>
              {t.status.name}
            </div>

            <div style={{ fontSize: 12 }}>
              Progress: {t.progress_percent}%
            </div>
          </div>
        ))}
      </div>

      {/*MAP */}
      <div style={{ flex: 1, height: "70vh", borderRadius: 16, overflow: "hidden" }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{ lat: 33.5, lng: 36.3 }}
          zoom={7}
        >

          {/* MARKERS */}
          {trips.map((trip) => (
            <Marker
              key={trip.trip_id}
              position={{
                lat: trip.current_position.latitude,
                lng: trip.current_position.longitude,
              }}
              label={{
                text: trip.driver_name,
                color: "white",
              }}
              onClick={() => setSelectedTrip(trip)}
            />
          ))}

          {/*ROUTES */}
          {trips.map((trip) => (
            <Polyline
              key={trip.trip_id}
              path={trip.route.points.map((p) => ({
                lat: p.latitude,
                lng: p.longitude,
              }))}
              options={{
                strokeColor: trip.status.color,
                strokeWeight: 4,
              }}
            />
          ))}

          {/*  INFO WINDOW */}
          {selectedTrip && (
            <InfoWindow
              position={{
                lat: selectedTrip.current_position.latitude,
                lng: selectedTrip.current_position.longitude,
              }}
              onCloseClick={() => setSelectedTrip(null)}
            >
              <div style={{ color: "black" }}>
                <h4>Trip #{selectedTrip.trip_id}</h4>
                <p>Driver: {selectedTrip.driver_name}</p>
                <p>Status: {selectedTrip.status.name}</p>
                <p>Progress: {selectedTrip.progress_percent}%</p>

                {selectedTrip.delay?.is_delayed && (
                  <p style={{ color: "red" }}>
                    Delay: {selectedTrip.delay.minutes} min
                  </p>
                )}
              </div>
            </InfoWindow>
          )}

        </GoogleMap>
      </div>
    </div>
  );
}