
// import { useEffect, useRef } from 'react';

// interface AdvancedMarkerProps {
//   position: { lat: number; lng: number };
//   map: google.maps.Map | null;
//   title?: string;
//   onClick?: () => void;
// }

// export const AdvancedMarker: React.FC<AdvancedMarkerProps> = ({
//   position,
//   map,
//   title,
//   onClick
// }) => {
//   const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

//   useEffect(() => {
//     if (!map || !window.google?.maps?.marker?.AdvancedMarkerElement) return;

//     // Create advanced marker
//     markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
//       map,
//       position,
//       title,
//     });

//     // Add click listener
//     if (onClick) {
//       markerRef.current.addListener('click', onClick);
//     }

//     // Cleanup
//     return () => {
//       if (markerRef.current) {
//         markerRef.current.map = null;
//       }
//     };
//   }, [map, position, title, onClick]);

//   return null;
// };

import { useEffect, useRef, memo } from 'react';

interface AdvancedMarkerProps {
  position: { lat: number; lng: number };
  map: google.maps.Map | null;
  title?: string;
  onClick?: () => void;
  label?: string;
  isSelected?: boolean;
}

export const AdvancedMarker = memo<AdvancedMarkerProps>(
  ({ position, map, title, onClick, label, isSelected = false }) => {
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

    useEffect(() => {
      if (!map || !window.google?.maps?.marker?.AdvancedMarkerElement) return;

      const content = document.createElement('div');
      content.textContent = label || '';
      content.style.cssText = `
        padding:4px 12px;
        background:${isSelected ? '#dc2626' : '#fff'};
        color:${isSelected ? '#fff' : '#111'};
        border:2px solid ${isSelected ? '#dc2626' : '#e5e7eb'};
        border-radius:8px;
        font-size:11px;
        font-weight:bold;
        cursor:pointer;
        box-shadow:0 2px 8px rgba(0,0,0,0.15);
        white-space:nowrap;
      `;

      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position,
        title,
        content,
      });

      const handler = onClick ? markerRef.current.addListener('click', onClick) : null;

      return () => {
        if (handler) google.maps.event.removeListener(handler);
        if (markerRef.current) markerRef.current.map = null;
      };
    }, [map]);

    useEffect(() => {
      if (markerRef.current) markerRef.current.position = position;
    }, [position.lat, position.lng]);

    useEffect(() => {
      if (markerRef.current?.content instanceof HTMLElement) {
        markerRef.current.content.textContent = label || '';
        markerRef.current.content.style.background = isSelected ? '#dc2626' : '#fff';
        markerRef.current.content.style.color = isSelected ? '#fff' : '#111';
        markerRef.current.content.style.borderColor = isSelected ? '#dc2626' : '#e5e7eb';
      }
    }, [label, isSelected]);

    return null;
  },
  (prev, next) =>
    prev.map === next.map &&
    prev.position.lat === next.position.lat &&
    prev.position.lng === next.position.lng &&
    prev.label === next.label &&
    prev.isSelected === next.isSelected
);

AdvancedMarker.displayName = 'AdvancedMarker';
