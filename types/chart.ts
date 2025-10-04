type GHGChartProps = {
  loading: boolean;
  error: string | null;
  data: any[];
  branches: Company[];
  onChartClick: (e: any) => void;
  onDotClick: (branchId: string, month: string) => void;
};

type FuelLineChartProps = {
  loading: boolean;
  error: string | null;
  data: any[];
  countryName?: string;
};

type FuelPieChartProps = {
  loading: boolean;
  error: string | null;
  data: Array<{ name: string; value: number; color: string }>;
  title: string;
};
