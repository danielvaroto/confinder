import { useQuery } from 'react-query';

import { ConferenceListFilter } from '../types/ConferenceListFilter';
import { ConferenceListResponse } from '../types/ConferenceListResponse';

const fetchConferenceList = async (request: ConferenceListFilter) => {
  const url = new URL('https://localhost:7077/api/conferences');
  const searchParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(request)) {
    if (value) searchParams[key] = value.toString();
  }
  url.search = new URLSearchParams(searchParams).toString();
  const res = await fetch(url);
  return res.json();
};

export const useConferenceList = (request: ConferenceListFilter) => {
  return useQuery<ConferenceListResponse>(['conferenceList', request], () =>
    fetchConferenceList(request),
  );
};
