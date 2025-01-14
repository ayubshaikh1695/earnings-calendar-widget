export const getLastQuarterDates = () => {
  const currentDate = new Date();
  const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3); // Quarters: 1-4
  const currentYear = currentDate.getFullYear();

  // Calculate the last quarter
  const lastQuarter = currentQuarter - 1 || 4; // Wrap around to Q4 if currentQuarter is Q1
  const year = currentQuarter === 1 ? currentYear - 1 : currentYear; // Adjust year if wrapping to Q4

  const startDate = new Date(year, (lastQuarter - 1) * 3, 1); // First day of the last quarter
  const endDate = new Date(year, lastQuarter * 3, 0); // Last day of the last quarter

  return {
    startDate: startDate.toISOString().split("T")[0], // YYYY-MM-DD
    endDate: endDate.toISOString().split("T")[0], // YYYY-MM-DD
  };
};
