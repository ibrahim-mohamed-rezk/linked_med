"use client";

import { memo, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useTranslations } from "next-intl";

const locations = [
  { name: "Egypt", lat: 26.8206, lng: 30.8025 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Jordan", lat: 31.9522, lng: 35.2332 },
  { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
  { name: "Germany", lat: 51.1657, lng: 10.4515 },
  { name: "South Africa", lat: -30.5595, lng: 22.9375 },
  { name: "Philippines", lat: 12.8797, lng: 121.7740 },
  { name: "India", lat: 20.5937, lng: 78.9629 },
  { name: "Russia", lat: 61.5240, lng: 105.3188 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
];

function MyComponent() {
  const containerStyle = {
    width: "100%",
    height: "70vh",
    maxWidth: "1920px",
    margin: "0 auto",
  };
  const  t  = useTranslations("HomePage");


  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("Google Maps API key is not set");
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

//   const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
    // setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    // setMap(null);
  }, []);

  return isLoaded ? (
    <div className="w-full mx-auto px-4 my-[50px]   ">
      <div className="flex items-center justify-center py-4">
        <h1 className="text-2xl md:text-3xl font-bold">{
            t("our_locations")}</h1>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={locations[0]}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {locations.map(({ name, lat, lng }) => (
          <Marker
            key={name}
            position={{ lat, lng }}
            title={name}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <div className="flex justify-center items-center h-64">
      <p className="text-xl">Loading...</p> 
    </div>
  );
}

export default memo(MyComponent);
