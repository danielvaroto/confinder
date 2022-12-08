export const formatRequestDate = (d?: Date): string | undefined => {
  return d
    ? new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().substring(0, 10)
    : undefined;
};
