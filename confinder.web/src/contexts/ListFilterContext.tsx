/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { ConferenceListFilter } from '../types/ConferenceListFilter';
import { QualisIndex } from '../types/QualisIndex';
import { SortField, SortOrder } from '../types/SortField';

type ListFilterContextProps = {
  filter: ConferenceListFilter;
  setPage: (page: number) => void;
  setName: (name?: string) => void;
  setLocation: (location?: string) => void;
  setQualisIndex: (minQualisIndex?: QualisIndex, maxQualisIndex?: QualisIndex) => void;
  setEventDate: (minEventDate?: Date, maxEventDate?: Date) => void;
  setSubmissionDeadline: (minSubmissionDeadline?: Date, maxSubmissionDeadline?: Date) => void;
  setSort: (field: SortField, order: SortOrder) => void;
};

const ListFilterContext = createContext<ListFilterContextProps>({
  filter: {
    page: 1,
  },
  setPage: () => {},
  setName: () => {},
  setLocation: () => {},
  setQualisIndex: () => {},
  setEventDate: () => {},
  setSubmissionDeadline: () => {},
  setSort: () => {},
});

export const useListFilter = () => {
  return useContext(ListFilterContext);
};

export const ListFilterContextProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<ConferenceListFilter>({ page: 1 });

  const setPage = (page: number) => {
    setFilter({ ...filter, page });
  };

  const setName = (name?: string) => {
    setFilter({ ...filter, name });
  };

  const setLocation = (location?: string) => {
    setFilter({ ...filter, location });
  };

  const setQualisIndex = (minQualisIndex?: QualisIndex, maxQualisIndex?: QualisIndex) => {
    setFilter({ ...filter, minQualisIndex, maxQualisIndex });
  };

  const setEventDate = (minEventDate?: Date, maxEventDate?: Date) => {
    setFilter({ ...filter, minEventDate, maxEventDate });
  };

  const setSubmissionDeadline = (minSubmissionDeadline?: Date, maxSubmissionDeadline?: Date) => {
    setFilter({ ...filter, minSubmissionDeadline, maxSubmissionDeadline });
  };

  const setSort = (field: SortField, order: SortOrder) => {
    setFilter({ ...filter, sort: { field, order } });
  };

  const value = useMemo(
    () => ({
      filter,
      setPage,
      setName,
      setLocation,
      setQualisIndex,
      setEventDate,
      setSubmissionDeadline,
      setSort,
    }),
    [filter],
  );

  return <ListFilterContext.Provider value={value}>{children}</ListFilterContext.Provider>;
};
