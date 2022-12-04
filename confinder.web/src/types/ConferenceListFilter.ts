import { QualisIndex } from './QualisIndex';

export type ConferenceListFilter = {
  page: number;
  name?: string;
  location?: string;
  minQualisIndex?: QualisIndex;
  maxQualisIndex?: QualisIndex;
  minEventDate?: Date;
  maxEventDate?: Date;
  minSubmissionDeadline?: Date;
  maxSubmissionDeadline?: Date;
};
