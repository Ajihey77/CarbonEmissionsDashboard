import TrendCard from "@/components/dashboard/TrendCard";
import { Card, CardContent } from "@/components/ui/card";
import { CardLoadingSkeleton, CardError } from "./Loading";

export function TrendCardsSection({
  loading,
  error,
  totalEmissions,
  thisMonthTotal,
  thisMonthChange,
  ourMonthEmissions,
  ourMonthChange,
}: TrendCardsSectionProps) {
  if (loading) {
    return (
      <>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <CardLoadingSkeleton />
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  if (error) {
    return (
      <>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <CardError message={error} />
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      <TrendCard
        title="Total Emissions – All Branches"
        value={totalEmissions}
      />
      <TrendCard
        title="This Month's Total Emissions"
        value={thisMonthTotal}
        change={thisMonthChange}
      />
      <TrendCard
        title="Our Branch Emissions"
        value={ourMonthEmissions}
        change={ourMonthChange}
      />
    </>
  );
}
