export const getLastQuarterDates = (): {
  startDate: string;
  endDate: string;
} => {
  const currentDate = new Date();
  const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3);
  const currentYear = currentDate.getFullYear();

  const lastQuarter = currentQuarter - 1 || 4;
  const year = currentQuarter === 1 ? currentYear - 1 : currentYear;

  const startDate = new Date(year, (lastQuarter - 1) * 3, 1);
  const endDate = new Date(year, lastQuarter * 3, 0);

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
};
