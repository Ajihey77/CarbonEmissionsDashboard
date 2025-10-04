import { useMemo } from "react";

export function useEmissionsCalculations({
  branches,
  currentCompany,
}: UseEmissionsCalculationsProps) {
  const getCurrentYearMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const getPreviousYearMonth = () => {
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    return `${prevMonth.getFullYear()}-${String(
      prevMonth.getMonth() + 1
    ).padStart(2, "0")}`;
  };

  const calculateEmissionsByMonth = (
    branches: Company[],
    yearMonth?: string
  ) => {
    return branches.reduce((sum, branch) => {
      const filteredEmissions = yearMonth
        ? branch.emissions.filter((e) => e.yearMonth === yearMonth)
        : branch.emissions;
      return sum + filteredEmissions.reduce((s, e) => s + e.emissions, 0);
    }, 0);
  };

  // 회사 총합
  const totalEmissions = useMemo(
    () => calculateEmissionsByMonth(branches),
    [branches]
  );

  // 이번달 회사 총합
  const thisMonthTotal = useMemo(
    () => calculateEmissionsByMonth(branches, getCurrentYearMonth()),
    [branches]
  );

  // 지난달 회사 총합
  const lastMonthTotal = useMemo(
    () => calculateEmissionsByMonth(branches, getPreviousYearMonth()),
    [branches]
  );

  const thisMonthChange =
    lastMonthTotal > 0
      ? (((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(1)
      : "0.0";

  // 우리 지사 이번달 총합
  const ourMonthEmissions =
    currentCompany?.emissions
      .filter((e) => e.yearMonth === getCurrentYearMonth())
      .reduce((s, e) => s + e.emissions, 0) || 0;

  // 우리 지사 지난달 총합
  const ourLastMonthEmissions =
    currentCompany?.emissions
      .filter((e) => e.yearMonth === getPreviousYearMonth())
      .reduce((s, e) => s + e.emissions, 0) || 0;

  const ourMonthChange =
    ourLastMonthEmissions > 0
      ? (
          ((ourMonthEmissions - ourLastMonthEmissions) /
            ourLastMonthEmissions) *
          100
        ).toFixed(1)
      : "0.0";

  return {
    totalEmissions,
    thisMonthTotal,
    thisMonthChange,
    ourMonthEmissions,
    ourMonthChange,
  };
}
