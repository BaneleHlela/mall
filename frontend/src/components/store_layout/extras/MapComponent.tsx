import React, { useEffect, useRef, useState } from 'react';
import { getBackgroundStyles } from '../../../utils/stylingFunctions';

interface MapComponentProps {
  lat: number;
  lng: number;
  name: string;
  image?: {
    url: string[];
    background: {
      height: string;
      width: string;
    }
  }, 
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

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, name, image, style }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Safely access image properties with defaults
  const imageUrl = image?.url?.[0] || '';
  const imageHeight = image?.background?.height || '50px';
  const imageWidth = image?.background?.width || '50px';

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

    // Build image HTML only if imageUrl exists
    const imageHtml = imageUrl ? `
      <img 
        src="${imageUrl}"
        alt="${name}"
        style="
          width:${imageWidth};
          height:${imageHeight};
          object-fit:cover;
          border-radius:4px;
          margin-bottom:6px;
        "
      />
    ` : '';

    const infowindow = new window.google.maps.InfoWindow({
      content: `
        <div style="display:flex; flex-direction:column; align-items:center; max-width:180px;">
          ${imageHtml}
          <div style="
            font-weight:bold;
            text-align:center;
            font-size:14px;
          ">
            ${name}
          </div>
        </div>
      `,
    });
    

    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });

    // Auto-open the info window
    infowindow.open(map, marker);

    setIsLoading(false);
  }, [lat, lng, name, imageUrl, imageHeight, imageWidth]);

  return (
    <div 
      style={{ 
          ...getBackgroundStyles(style),
      }} 
    >
      {isLoading && (
        <div style={{ 
          width: style.width?.desktop || '100%', 
          height: style.height?.desktop || '300px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f3f4f6'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #0b032d',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      )}
      <div 
        ref={mapRef} 
        style={{ 
            ...getBackgroundStyles(style),
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
        }} 
      />
    </div>
  );
};

export default MapComponent;
