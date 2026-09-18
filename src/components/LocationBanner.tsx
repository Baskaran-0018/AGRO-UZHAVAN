import React from 'react';
import { LocationSelector } from './LocationSelector';
import { LocationDetails } from '../hooks/useUserLocation';

interface LocationBannerProps {
  onLocationChange?: (details: LocationDetails) => void;
  className?: string;
  compact?: boolean;
}

export const LocationBanner: React.FC<LocationBannerProps> = ({
  onLocationChange,
  className = '',
  compact = false
}) => {
  return <LocationSelector onLocationChange={onLocationChange} className={className} compact={compact} />;
};
export default LocationBanner;
