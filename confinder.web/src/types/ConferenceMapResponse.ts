import { ConferenceMapItemResponse } from './ConferenceMapItemResponse';

export type ConferenceMapResponse = {
  conferencesCount: number;
  locationsCount: number;
  records: ConferenceMapItemResponse[];
};
