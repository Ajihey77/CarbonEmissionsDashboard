import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CardLoadingSkeleton, CardError } from "./Loading";

export function Reports({
  loading,
  error,
  reports,
  companies,
  onSeeAll,
}: ReportsTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="w-full font-bold">Reports</div>
        <button
          className="px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800"
          onClick={onSeeAll}
        >
          SeeAll
        </button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <CardLoadingSkeleton />
        ) : error ? (
          <CardError message={error} />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-600">
                  Country
                </th>
                <th className="text-left py-2 font-medium text-gray-600">
                  Report Title
                </th>
                <th className="text-left py-2 font-medium text-gray-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {reports?.slice(0, 5).map((post) => {
                const company = companies?.find(
                  (c) => c.id === post.resourceUid
                );
                return (
                  <tr key={post.id} className="border-b border-gray-100">
                    <td className="py-3 text-gray-900">
                      {company?.country || "-"}
                    </td>
                    <td className="py-3 text-gray-600">{post.title}</td>
                    <td className="py-3 text-gray-500">{post.dateTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
