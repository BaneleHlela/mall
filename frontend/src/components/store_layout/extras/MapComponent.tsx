import React, { useEffect, useRef } from 'react';

interface MapComponentProps {
  lat: number;
  lng: number;
  name: string;
  style: {
    height: {
        mobile: string;
        desktop: string;
    };
    width: {
        mobile: string;
        desktop: string;
    };
  };
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, name, style }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 17,
    });

    const marker = new window.google.maps.Marker({
      position: { lat, lng },
      map,
    });

    const infowindow = new window.google.maps.InfoWindow({
      content: `<div style="padding: 8px; font-weight: bold">${name}</div>`,
    });

    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });

    // Auto-open the info window
    infowindow.open(map, marker);
  }, [lat, lng, name]);

  return <div ref={mapRef} 
    style={{ 
        height: window.innerWidth >= 1024 ? style.height.desktop : style.height.mobile, 
        width: window.innerWidth >= 1024? style.width.desktop : style.width.mobile,  
    }} 
  />;
};

export default MapComponent;
