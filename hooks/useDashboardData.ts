import { useMemo } from "react";
import { defaultFetch } from "@/api/defaultFetch";
import { fetchCompanies } from "@/lib/api";

// 데이터 패치 + 데이터가공 (우리지사 데이터 , 우리회사 데이터)
export function useDashboardData(companyName: string, companyId: string) {
  const {
    data: companies,
    loading,
    error,
  } = defaultFetch<Company[]>(fetchCompanies);

  const currentCompany = useMemo(
    () => companies?.find((c) => c.id === companyId),
    [companies, companyId]
  );

  const branches = useMemo(
    () => companies?.filter((c) => c.name === companyName) ?? [],
    [companies, companyName]
  );

  return {
    companies,
    currentCompany,
    branches,
    loading,
    error,
  };
}
