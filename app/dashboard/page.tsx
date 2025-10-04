"use client";
import React, { useState, useMemo } from "react";
import { LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCompanyStore } from "@/store/company";

// Custom Hooks
import { useDashboardData } from "@/hooks/useDashboardData";
import { useEmissionsCalculations } from "@/hooks/useEmissionsCalculations";
import { useChartData } from "@/hooks/useChartData";

// UI Components
import { TrendCardsSection } from "@/components/dashboard/TrendCardsSection";
import { GHGChart } from "@/components/dashboard/chart/GHGChart";
import { FuelPieChart } from "@/components/dashboard/chart/FuelPieChart";
import { FuelLineChart } from "@/components/dashboard/chart/FuelLineChart";
import { Reports } from "@/components/dashboard/Reports";
import { fetchPosts } from "@/lib/api";
import { defaultFetch } from "@/api/defaultFetch";

export default function Dashboard() {
  const router = useRouter();
  const { companyId, companyName } = useCompanyStore();

  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    companyId
  );
  const [selectedMonth, setSelectedMonth] = useState<string | null>("2025-10");

  // Data fetching
  const { companies, currentCompany, branches, loading, error } =
    useDashboardData(companyName, companyId);

  const {
    data: reports,
    loading: reportsLoading,
    error: reportsErrors,
  } = defaultFetch<Reports[]>(fetchPosts);

  // 총량 계산
  const emissionsData = useEmissionsCalculations({
    branches,
    currentCompany,
  });

  // Chart data
  const { ghgChartData, fuelChartData, pieChartData } = useChartData({
    companies,
    currentCompany,
    companyName,
    selectedCompanyId,
    selectedMonth,
  });

  // 게시판 우리회사 게시글만 불러오기
  const displayPosts = reports?.filter(
    (p) => p.resourceUid[0] === companyId[0]
  );

  // 차트 클릭시 이벤트
  const handleChartClick = (e: any) => {
    if (!e?.activeLabel || !e.activePayload?.length) return;

    const monthValue = e.activeLabel;
    const fullMonth = `2025-${monthValue}`;
    const countryCode = e.activePayload[0].dataKey;

    const branch = companies?.find(
      (c) => c.name === companyName && c.country === countryCode
    );

    if (branch) {
      setSelectedCompanyId(branch.id);
      setSelectedMonth(fullMonth);
    }
  };

  const handleDotClick = (branchId: string, month: string) => {
    setSelectedCompanyId(branchId);
    setSelectedMonth(month);
  };

  const pieChartTitle =
    selectedCompanyId && selectedMonth
      ? `Fuel Emissions – ${
          companies?.find((c) => c.id === selectedCompanyId)?.country
        } ${selectedMonth.slice(5)}`
      : "Fuel Emissions";

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-8">
        {/* companyName */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard - {companyName}</span>
        </div>

        {/* Trend Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <TrendCardsSection
            loading={loading}
            error={error}
            {...emissionsData}
          />
        </div>

        {/* GHG  + Pie Chart */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <GHGChart
            loading={loading}
            error={error}
            data={ghgChartData}
            branches={branches}
            onChartClick={handleChartClick}
            onDotClick={handleDotClick}
          />
          <FuelPieChart
            loading={loading}
            error={error}
            data={pieChartData}
            title={pieChartTitle}
          />
        </div>

        {/*  Fuel  + Reports  */}
        <div className="grid grid-cols-3 gap-6">
          <FuelLineChart
            loading={loading}
            error={error}
            data={fuelChartData}
            countryName={currentCompany?.country}
          />
          <Reports
            loading={reportsLoading}
            error={reportsErrors}
            reports={displayPosts}
            companies={companies}
            onSeeAll={() => router.push("/reports")}
          />
        </div>
      </div>
    </main>
  );
}
