import React from "react";
import { Card, CardContent } from "../ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

type TrendCardProps = {
  title: string;
  value: number;
  change?: number | string;
};

export default function TrendCard({ title, value, change }: TrendCardProps) {
  const numericChange =
    typeof change === "string" ? parseFloat(change) : change ?? 0;
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <span>{title}</span>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 ${
                numericChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {numericChange >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span className="text-xs font-medium">{change}%</span>
            </div>
          )}
        </div>
        <div className="text-3xl font-semibold text-gray-900">
          {value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
