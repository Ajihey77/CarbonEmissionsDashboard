"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useCompanyStore } from "@/store/company";
import { useRouter } from "next/navigation";
import { defaultFetch } from "@/api/defaultFetch";
import { fetchCompanies, fetchPosts } from "@/lib/api";

const ITEMS_PER_PAGE = 9;

// 테이블 로딩 스켈레톤
const TableLoadingSkeleton = () => (
  <>
    {[...Array(9)].map((_, index) => (
      <tr key={index} className="border-b border-gray-100 animate-pulse">
        <td className="py-4 px-6">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </td>
        <td className="py-4 px-6">
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </td>
        <td className="py-4 px-6 text-right">
          <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
        </td>
      </tr>
    ))}
  </>
);

// 빈 데이터 메시지
const EmptyState = () => (
  <tr>
    <td colSpan={3} className="py-12">
      <div className="flex flex-col items-center justify-center gap-2">
        <BarChart3 className="w-12 h-12 text-gray-300" />
        <p className="text-gray-500 text-sm">No reports available</p>
      </div>
    </td>
  </tr>
);

export default function ReportsPage() {
  const {
    data: reports,
    loading: reportsLoading,
    error: reportsError,
  } = defaultFetch<Reports[]>(fetchPosts);
  const { data: companies, loading: companiesLoading } =
    defaultFetch<Company[]>(fetchCompanies);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { companyId } = useCompanyStore();

  const displayPosts = (
    reports?.filter((p) => p.resourceUid[0] === companyId[0]) ?? []
  ).sort((a, b) => {
    return b.dateTime.localeCompare(a.dateTime);
  });
  const totalPages = Math.ceil(displayPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentReports = displayPosts.slice(startIndex, endIndex);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  const loading = reportsLoading || companiesLoading;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <BarChart3 className="w-4 h-4" />
          <span>Reports</span>
        </div>
        <button
          onClick={() => router.push("/reports/new")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Report
        </button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">
                    Country
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">
                    Report Title
                  </th>
                  <th className="text-right py-3 px-6 font-medium text-gray-700 text-sm">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <TableLoadingSkeleton />
                ) : currentReports.length === 0 ? (
                  <EmptyState />
                ) : (
                  currentReports.map((post, index) => {
                    const company = companies?.find(
                      (c) => c.id === post.resourceUid
                    );
                    return (
                      <tr
                        key={post.id}
                        onClick={() =>
                          router.push(
                            `/reports/${post.id}?country=${company?.country}`
                          )
                        }
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                          index === currentReports.length - 1
                            ? "border-b-0"
                            : ""
                        }`}
                      >
                        <td className="py-4 px-6 text-sm text-gray-900">
                          {company?.country || "-"}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900">
                          {post.title}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900 text-right">
                          {post.dateTime}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {loading && displayPosts.length > 0 && (
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-200">
              <span className="text-sm text-gray-600 mr-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
