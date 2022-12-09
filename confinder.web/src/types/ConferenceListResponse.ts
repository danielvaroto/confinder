import { ConferenceListItemResponse } from './ConferenceListItemResponse';

export type ConferenceListResponse = {
  perPage: number;
  pageCount: number;
  totalCount: number;
  records: ConferenceListItemResponse[];
};
