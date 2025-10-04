import { useMemo } from "react";

export function useChartData({
  companies,
  currentCompany,
  companyName,
  selectedCompanyId,
  selectedMonth,
}: UseChartDataProps) {
  const getMonths = (year: number) => {
    return Array.from(
      { length: 12 },
      (_, i) => `${year}-${String(i + 1).padStart(2, "0")}`
    );
  };

  const months = useMemo(() => getMonths(2025), []);

  // GHG Chart Data
  const ghgChartData = useMemo(() => {
    if (!companies) return [];
    return months.map((month) => {
      const dataPoint: any = { month: month.slice(5) };
      companies
        .filter((c) => c.name === companyName)
        .forEach((branch) => {
          const monthTotal = branch.emissions
            .filter((e) => e.yearMonth === month)
            .reduce((sum, e) => sum + e.emissions, 0);
          dataPoint[branch.country] = monthTotal;
        });
      return dataPoint;
    });
  }, [companies, companyName, months]);

  // Fuel Chart Data
  const fuelChartData = useMemo(() => {
    if (!currentCompany) return [];
    const sources = [
      "gasoline",
      "lpg",
      "diesel",
      "natural_gas",
      "coal",
      "others",
    ];

    return months.map((month) => {
      const dataPoint: any = { month: month.slice(5) };
      sources.forEach((source) => {
        const emission = currentCompany.emissions.find(
          (e) => e.yearMonth === month && e.source === source
        );
        dataPoint[source] = emission?.emissions || 0;
      });
      return dataPoint;
    });
  }, [currentCompany, months]);

  // Pie Chart Data
  const pieChartData = useMemo(() => {
    const branch = selectedCompanyId
      ? companies?.find((c) => c.id === selectedCompanyId)
      : currentCompany;

    const month = selectedMonth || "2025-06";
    if (!branch) return [];

    const sources = [
      "gasoline",
      "lpg",
      "diesel",
      "natural_gas",
      "coal",
      "others",
    ];
    const colors = [
      "#1E3A8A",
      "#2563EB",
      "#3B82F6",
      "#60A5FA",
      "#93C5FD",
      "#BFDBFE",
    ];

    const fuelData = sources
      .map((source, index) => {
        const emission = branch.emissions.find(
          (e) => e.yearMonth === month && e.source === source
        );
        return {
          name:
            source.charAt(0).toUpperCase() + source.slice(1).replace("_", " "),
          value: emission?.emissions || 0,
          color: colors[index],
        };
      })
      .filter((item) => item.value > 0);

    return fuelData.length > 0 ? fuelData : [];
  }, [selectedCompanyId, selectedMonth, currentCompany, companies]);

  return {
    ghgChartData,
    fuelChartData,
    pieChartData,
  };
}
