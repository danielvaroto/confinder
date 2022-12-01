import { ConferenceListItemResponse } from './ConferenceListItemResponse';

export type ConferenceListResponse = {
  pageCount: number;
  totalCount: number;
  records: ConferenceListItemResponse[];
};
