import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import type { RootState } from '../../app/store';
import { closeRangeModal, setRange } from '../../features/rangeSlice';
import { fetchStoresInRange } from '../../features/stores/storeSlice';

interface RangeModalProps {
  open: boolean;
  onClose: () => void;
}

const RangeModal: React.FC<RangeModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { range } = useSelector((state: RootState) => state.range);
  const user = useSelector((state: RootState) => state.user.user);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);

  const userLocation = user?.locations?.[0];

  const handleRangeChange = (newRange: number) => {
    dispatch(setRange(newRange));
  };

  const handleConfirm = () => {
    // Use user's first location for range filtering
    if (userLocation && userLocation.lat && userLocation.lng) {
      dispatch(fetchStoresInRange({
        lat: userLocation.lat,
        lng: userLocation.lng,
        range
      }));
    }
    onClose();
  };

  // Initialize map
  useEffect(() => {
    if (open && mapRef.current && !mapInstance.current && userLocation) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: {
          lat: userLocation.lat,
          lng: userLocation.lng,
        },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
      });

      markerRef.current = new google.maps.Marker({
        position: {
          lat: userLocation.lat,
          lng: userLocation.lng,
        },
        map: mapInstance.current,
      });
    }
  }, [open, userLocation]);

  // Update circle when range changes
  useEffect(() => {
    if (!mapInstance.current || !userLocation) return;

    // Remove existing circle
    if (circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }

    // Create new circle
    circleRef.current = new google.maps.Circle({
      strokeColor: '#02baf2',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#02baf2',
      fillOpacity: 0.35,
      map: mapInstance.current,
      center: { lat: userLocation.lat, lng: userLocation.lng },
      radius: range * 1000,
    });
  }, [range, userLocation]);

  // Trigger resize when modal opens
  useEffect(() => {
    if (open && mapInstance.current) {
      setTimeout(() => {
        google.maps.event.trigger(mapInstance.current!, 'resize');
        if (userLocation) {
          mapInstance.current!.setCenter({
            lat: userLocation.lat,
            lng: userLocation.lng
          });
        }
      }, 100);
    }
  }, [open, userLocation]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-150">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full mx-[2vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-[1.8vh] border-b">
          <h2 className="text-[2vh] font-semibold text-stone-800">Set Search Range</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors"
          >
            <FaTimes className="text-[2.2vh]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-[1.5vh] font-medium text-stone-700 mb-3">
              Search Radius: {range} km
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={range}
              onChange={(e) => handleRangeChange(Number(e.target.value))}
              className="w-full h-[0.8vh] rounded-full appearance-none bg-gray-200 cursor-pointer accent-[#0b032d]
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-[2vh]
                [&::-webkit-slider-thumb]:h-[2vh]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#0b032d]"
            />
            <div className="flex justify-between text-xs text-stone-500 mt-1">
              <span>1 km</span>
              <span>100 km</span>
            </div>
          </div>

          {/* Map display */}
          {userLocation && (
            <div className="mb-6">
              <label className="block text-[1.5vh] font-semibold text-stone-700 mb-2">
                Search Area Preview
              </label>
              <div ref={mapRef} className="w-full h-[25vh] border rounded-lg" />
              <p className="text-sm text-stone-600 mt-2">
                The blue circle shows your search area. Stores within this radius will be displayed.
              </p>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={handleConfirm}
              className="flex-1 bg-black hover:bg-black text-white py-[.8vh] px-[1.7vh] rounded transition-colors font-medium"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-stone-300 hover:bg-stone-400 text-stone-700 py-2 px-4 rounded transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeModal;