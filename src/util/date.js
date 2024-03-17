const monthDayYearOption = {
  month: "long",
  day: "numeric",
  year: "numeric"
};

export const convertToLocaleDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, monthDayYearOption);
};
