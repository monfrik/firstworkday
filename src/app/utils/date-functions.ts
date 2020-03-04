export const convertDate = (date: Date | string): string => {
  const parseDate = Date.parse(date.toString()) - new Date().getTimezoneOffset() * 60000;
  return new Date(parseDate).toISOString().slice(0, 10);
};
