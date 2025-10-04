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
import { CardLoadingSkeleton, CardError } from "../Loading";

export function FuelLineChart({
  loading,
  error,
  data,
  countryName,
}: FuelLineChartProps) {
  const fuelColors = {
    gasoline: "#2563EB",
    lpg: "#3B82F6",
    diesel: "#60A5FA",
    natural_gas: "#93C5FD",
    coal: "#BFDBFE",
    others: "#1E3A8A",
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Monthly Fuel Emissions - {countryName}
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
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {Object.entries(fuelColors).map(([fuel, color]) => (
                <Line
                  key={fuel}
                  type="monotone"
                  dataKey={fuel}
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
