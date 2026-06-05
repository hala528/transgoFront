import { useJsApiLoader, GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import {  GOOGLE_MAPS_API_KEY} from "../../../api/api"; 
export default function LiveMap({
  center = { lat: 33.5, lng: 36.3 },
  zoom = 6,
  markers = [],
  path = [],
}) {
 
 

 
 
 const { isLoaded } = useJsApiLoader({
   googleMapsApiKey: GOOGLE_MAPS_API_KEY,
 });

  if (!isLoaded) return <div>Loading Google Map...</div>;

  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
      >

        {/*  MARKERS */}
        {markers.map((m) => (
          <Marker
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            label={m.label}
          />
        ))}

        {/*  ROUTE LINE */}
        {path.length > 0 && (
          <Polyline
            path={path}
            options={{
              strokeColor: "#4f46e5",
              strokeWeight: 4,
            }}
          />
        )}

      </GoogleMap>
    </div>
  );
}
