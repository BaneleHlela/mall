import { useEffect, useRef, useState } from 'react';

const centerFallback = {
  lat: -27.7507512,
  lng: 30.070856, // Johannesburg fallback
};

export default function LocationPicker({ onLocationSelect }: any) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<any>(null);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  const [location, setLocation] = useState(centerFallback);

  useEffect(() => {
    const initMap = async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      const { Autocomplete } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

      // Init Map
      mapInstance.current = new Map(mapRef.current!, {
        center: location,
        zoom: 15,
        mapId: 'DEMO_MAP_ID', 
      });

      // Init Marker
      markerRef.current = new AdvancedMarkerElement({
        position: location,
        map: mapInstance.current,
      });

      // Init Autocomplete
      const autocomplete = new Autocomplete(autocompleteInputRef.current!);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry?.location) {
          const newLoc = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setLocation(newLoc);
          mapInstance.current!.setCenter(newLoc);
          markerRef.current.position = newLoc;
          onLocationSelect({
            lat: newLoc.lat,
            lng: newLoc.lng,
            address: place.formatted_address,
          });
        }
      });

      // Map click
      mapInstance.current!.addListener("click", async (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const clicked = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          setLocation(clicked);
          markerRef.current.position = clicked;
          const address = await reverseGeocode(clicked.lat, clicked.lng);
          onLocationSelect({ ...clicked, address });
        }
      });
    };

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setLocation(coords);
      initMap();
      }, initMap);
    }, []);

  const reverseGeocode = async (lat: number, lng: number) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );
    const data = await res.json();
    return data.results[0]?.formatted_address || 'Unknown location';
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-[1.2vh] py-[.3vh] border bg-white space-y-[1.2vh] rounded">
      <div>
        <label className="text-md font-semibold text-gray-600 block mb-2">
          Search for a location
        </label>
        <input
          ref={autocompleteInputRef}
          type="text"
          placeholder="e.g. 123 Main Street, Madadeni"
          className="w-full p-[.8vh] pl-[1.2vh] border shadow-sm bg-stone-50 focus:ring-[.2vh] focus:ring-blue-500 focus:outline-none rounded"
        />
      </div>

      <div ref={mapRef} className="w-full h-[35vh] lg:h-[300px]" />
    </div>
  );
}
