import { useQuery } from 'react-query';

import { LocationListResponse } from '../types/LocationListResponse';

const fetchLocationList = async () => {
  const url = new URL('http://localhost:7077/api/locations');
  const res = await fetch(url);
  return res.json();
};

export const useLocationList = () => {
  return useQuery<LocationListResponse>(['locationList'], fetchLocationList);
};
