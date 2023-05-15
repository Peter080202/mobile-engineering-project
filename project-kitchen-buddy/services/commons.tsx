export const getFormattedDate = (date: Date): string => {
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${day}.${month}.${date.getFullYear()}`;
};

export const getDifferenceDaysFromNow = (date: Date) =>
  (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24);

export const getDifferenceDaysFromDateAndTimestamp = (
  date1: Date,
  date2: number,
) => (date1.getTime() - date2) / (1000 * 60 * 60 * 24);
