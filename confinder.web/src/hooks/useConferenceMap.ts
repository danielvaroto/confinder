import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { ConferenceListFilter } from '../types/ConferenceListFilter';
import { ConferenceMapResponse } from '../types/ConferenceMapResponse';
import { formatRequestDate } from '../utils/formatRequestDate';

const fetchConferenceMap = async (filter: ConferenceListFilter): Promise<ConferenceMapResponse> => {
  const res = await axios.get<ConferenceMapResponse>(
    (process.env.REACT_APP_API_URL as string) + 'conferences/map',
    {
      params: {
        ...filter,
        minEventDate: formatRequestDate(filter.minEventDate),
        maxEventDate: formatRequestDate(filter.maxEventDate),
        minSubmissionDeadline: formatRequestDate(filter.minSubmissionDeadline),
        maxSubmissionDeadline: formatRequestDate(filter.maxSubmissionDeadline),
      },
    },
  );
  return res.data;
};

export const useConferenceMap = (
  filter: ConferenceListFilter,
): UseQueryResult<ConferenceMapResponse, unknown> => {
  return useQuery<ConferenceMapResponse>(['conferenceMap', filter], () =>
    fetchConferenceMap(filter),
  );
};
