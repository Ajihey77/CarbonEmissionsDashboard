// 기업 (Companies, 월별 배출량 포함)
type Company = {
  id: string;
  name: string;
  country: string; // Country.code
  emissions: GhgEmission[];
};

// 배출량 (Emission)
type GhgEmission = {
  yearMonth: string; // "2025-01", "2025-02", "2025-03"
  source: string; // gasoline, lpg, diesel 등
  emissions: number; // CO2 환산 톤수
};

// 게시글 (Posts, 회사 + 월 연결됨)
type Reports = {
  id: string;
  title: string;
  resourceUid: string; // Company.id
  dateTime: string; // 예: "2024-02"
  content: string;
};

type ReportsTableProps = {
  loading: boolean;
  error: string | null;
  reports?: Reports[];
  companies?: Company[];
  onSeeAll: () => void;
};

type UseEmissionsCalculationsProps = {
  branches: Company[];
  currentCompany?: Company;
};

type UseChartDataProps = {
  companies?: Company[];
  currentCompany?: Company;
  companyName: string;
  selectedCompanyId: string | null;
  selectedMonth: string | null;
};

interface TrendCardsSectionProps {
  loading: boolean;
  error: string | null;
  totalEmissions: number;
  thisMonthTotal: number;
  thisMonthChange: string;
  ourMonthEmissions: number;
  ourMonthChange: string;
}
