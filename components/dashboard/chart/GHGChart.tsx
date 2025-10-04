import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CardError, CardLoadingSkeleton } from "../Loading";

export function GHGChart({
  loading,
  error,
  data,
  branches,
  onChartClick,
  onDotClick,
}: GHGChartProps) {
  const colors = [
    "#1E3A8A",
    "#2563EB",
    "#3B82F6",
    "#60A5FA",
    "#93C5FD",
    "#BFDBFE",
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Monthly GHG Emissions by Branch
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <CardLoadingSkeleton />
        ) : error ? (
          <CardError message={error} />
        ) : !data || data.length === 0 ? (
          <CardError message="데이터가 없습니다" />
        ) : (
          <ResponsiveContainer width="100%" height={420}>
            <LineChart data={data} onClick={onChartClick}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                domain={[20000, 100000]}
              />
              <Tooltip cursor={{ stroke: "#3b82f6", strokeWidth: 2 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {branches?.map((branch, index) => (
                <Line
                  key={branch.id}
                  type="monotone"
                  dataKey={branch.country}
                  name={branch.country}
                  stroke={colors[index % 6]}
                  strokeWidth={3}
                  dot={{ r: 4, cursor: "pointer" }}
                  activeDot={{
                    r: 6,
                    cursor: "pointer",
                    onClick: (e: any, payload: any) => {
                      if (payload?.payload) {
                        const monthValue = payload.payload.month;
                        const fullMonth = `2025-${monthValue}`;
                        onDotClick(branch.id, fullMonth);
                      }
                    },
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
