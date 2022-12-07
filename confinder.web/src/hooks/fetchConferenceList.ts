import axios from 'axios';
import { useQuery } from 'react-query';

import { ConferenceListFilter } from '../types/ConferenceListFilter';
import { ConferenceListResponse } from '../types/ConferenceListResponse';
import { formatRequestDate } from '../utils/formatRequestDate';

const fetchConferenceList = async (
  request: ConferenceListFilter,
): Promise<ConferenceListResponse> => {
  const res = await axios.get<ConferenceListResponse>('https://localhost:7077/api/conferences', {
    params: {
      ...request,
      minEventDate: formatRequestDate(request.minEventDate),
      maxEventDate: formatRequestDate(request.maxEventDate),
      minSubmissionDeadline: formatRequestDate(request.minSubmissionDeadline),
      maxSubmissionDeadline: formatRequestDate(request.maxSubmissionDeadline),
    },
  });
  return res.data;
};

export const useConferenceList = (request: ConferenceListFilter) => {
  return useQuery<ConferenceListResponse>(['conferenceList', request], () =>
    fetchConferenceList(request),
  );
};
