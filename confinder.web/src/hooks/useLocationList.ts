import { useQuery } from 'react-query';

import { LocationListResponse } from '../types/LocationListResponse';

const fetchLocationList = async () => {
  const url = new URL((process.env.REACT_APP_API_URL as string) + 'locations');
  const res = await fetch(url);
  return res.json();
};

export const useLocationList = () => {
  return useQuery<LocationListResponse>(['locationList'], fetchLocationList);
};
