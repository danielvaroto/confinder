import { QualisIndex } from './QualisIndex';
import { SortField, SortOrder } from './SortField';

export type ConferenceListFilter = {
  sort?: {
    order: SortOrder;
    field: SortField;
  };
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
