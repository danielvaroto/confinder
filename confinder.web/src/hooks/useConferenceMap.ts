import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { ConferenceMapResponse } from '../types/ConferenceMapResponse';

const fetchConferenceMap = async (): Promise<ConferenceMapResponse> => {
  const res = await axios.get<ConferenceMapResponse>(
    (process.env.REACT_APP_API_URL as string) + 'conferences/map',
  );
  return res.data;
};

export const useConferenceMap = (): UseQueryResult<ConferenceMapResponse, unknown> => {
  return useQuery<ConferenceMapResponse>(['conferenceMap'], fetchConferenceMap);
};
