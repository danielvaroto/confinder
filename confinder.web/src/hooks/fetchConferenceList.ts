import { useQuery } from 'react-query';

import { ConferenceListRequest } from '../types/ConferenceListRequest';
import { ConferenceListResponse } from '../types/ConferenceListResponse';

const fetchConferenceList = (request: ConferenceListRequest) => {
  const url = new URL('https://localhost:7077/api/conferences');
  const searchParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(request)) {
    searchParams[key] = value.toString();
  }
  url.search = new URLSearchParams(searchParams).toString();
  return fetch(url).then((res) => res.json());
};

export const useConferenceList = (request: ConferenceListRequest) => {
  return useQuery<ConferenceListResponse>(['conferenceList', request], () =>
    fetchConferenceList(request),
  );
};
