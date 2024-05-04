import axios from 'axios';
import { useQuery } from 'react-query';

import { ConferenceListFilter } from '../types/ConferenceListFilter';
import { ConferenceListResponse } from '../types/ConferenceListResponse';
import { formatRequestDate } from '../utils/formatRequestDate';

const fetchConferenceList = async (
  filter: ConferenceListFilter,
): Promise<ConferenceListResponse> => {
  const res = await axios.get<ConferenceListResponse>(
    (process.env.REACT_APP_API_URL as string) + 'conferences',
    {
      params: {
        ...filter,
        sort: undefined,
        minEventDate: formatRequestDate(filter.minEventDate),
        maxEventDate: formatRequestDate(filter.maxEventDate),
        minSubmissionDeadline: formatRequestDate(filter.minSubmissionDeadline),
        maxSubmissionDeadline: formatRequestDate(filter.maxSubmissionDeadline),
        sortField: filter.sort?.field ?? undefined,
        sortOrder: filter.sort?.order ?? undefined,
      },
    },
  );
  return res.data;
};

export const useConferenceList = (filter: ConferenceListFilter) => {
  return useQuery<ConferenceListResponse>(['conferenceList', filter], () =>
    fetchConferenceList(filter),
  );
};
