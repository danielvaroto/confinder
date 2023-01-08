import { ConferenceListItemResponse } from './ConferenceListItemResponse';

export type ConferenceMapItemResponse = {
  location: string;
  latitude: number;
  longitude: number;
  conferences: ConferenceListItemResponse[];
};
