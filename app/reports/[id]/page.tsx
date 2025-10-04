"use client";
import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Edit,
  Trash2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { fetchPosts } from "@/lib/api";
import { defaultFetch } from "@/api/defaultFetch";

// 상세 페이지 로딩 스켈레톤
const DetailLoadingSkeleton = () => (
  <div className="animate-pulse">
    {/* Header Skeleton */}
    <div className="mb-6">
      <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded w-20"></div>
          <div className="h-10 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>

    {/* Content Skeleton */}
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function ReportDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const country = searchParams.get("country");

  const {
    data: reports,
    loading: reportsLoading,
    error,
  } = defaultFetch<Reports[]>(fetchPosts);

  const report = reports?.find((i) => i.id === params.id);

  const handleEdit = () => {
    router.push(`/reports/${params.id}/edit`);
  };

  return (
    <main className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8 max-w-4xl mx-auto">
        {/* 로딩 상태 */}
        {reportsLoading ? (
          <>
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            </div>
            <DetailLoadingSkeleton />
          </>
        ) : (
          /* 정상 데이터 표시 */
          <>
            <div className="mb-6">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Reports
              </button>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {report?.title}
                  </h1>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {country}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {report?.dateTime}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <Card>
              <CardContent>
                <div className="prose max-w-none min-h-[300px] pt-5">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                    {report?.content}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}
