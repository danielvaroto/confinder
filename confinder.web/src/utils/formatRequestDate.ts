export const formatRequestDate = (date?: Date) => {
  return date?.toISOString().substring(0, 10);
};
