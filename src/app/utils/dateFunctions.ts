export const convertDate = (date: Date): string => {
  const parseDate = Date.parse(date) - new Date().getTimezoneOffset()*60000;
  const convertDateToString = new Date(parseDate).toISOString().slice(0,10);
  return convertDateToString;
}