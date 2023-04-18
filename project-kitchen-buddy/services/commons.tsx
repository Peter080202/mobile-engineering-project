export const getFormattedDate = (date: Date) => {
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${day}.${month}.${date.getFullYear()}`;
};