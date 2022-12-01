import { QualisIndex } from './QualisIndex';

export type ConferenceListItemResponse = {
  id: number;
  name: string;
  location: string;
  qualisIndex: QualisIndex;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
};
