import axios from 'axios';
import { useQuery } from 'react-query';

import { ConferenceDetailsResponse } from '../types/ConferenceDetailsResponse';

const fetchConferenceDetails = async (conferenceId: number): Promise<ConferenceDetailsResponse> => {
  const res = await axios.get<ConferenceDetailsResponse>(
    `${process.env.REACT_APP_API_URL}conferences/${conferenceId}`,
  );
  return res.data;
};

export const useConferenceDetails = (conferenceId: number) => {
  return useQuery<ConferenceDetailsResponse>({
    queryKey: ['conferenceDetails', conferenceId],
    queryFn: () => fetchConferenceDetails(conferenceId),
    enabled: Boolean(conferenceId),
  });
};
