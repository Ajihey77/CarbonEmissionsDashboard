"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormLoadingSkeleton } from "@/components/reports/FormLoadingSkeleton";
import { FormError } from "@/components/reports/FormError";
import { FormHeader } from "@/components/reports/FormHeader";
import { FormInput } from "@/components/reports/FormInput";
import { FormButtons } from "@/components/reports/FormButton";
import { useReportForm } from "@/hooks/useRepostForm";
import { FormTextarea } from "@/components/reports/FormTextarea";

export default function ReportFormPage() {
  const {
    isEdit,
    loading,
    error,
    saving,
    formData,
    errors,
    currentReport,
    handleChange,
    handleSubmit,
    router,
  } = useReportForm();

  // 로딩 상태
  if (loading) {
    return (
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8 max-w-4xl mx-auto">
          <FormHeader
            title={isEdit ? "Edit Report" : "Create New Report"}
            onBack={() => router.back()}
          />
          <Card>
            <CardHeader>
              <CardTitle>Report Information</CardTitle>
            </CardHeader>
            <CardContent>
              <FormLoadingSkeleton />
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // Not Found
  if (isEdit && !currentReport) {
    return (
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8 max-w-4xl mx-auto">
          <Card>
            <CardContent>
              <FormError
                message="Report not found"
                onBack={() => router.push("/reports")}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8 max-w-4xl mx-auto">
        <FormHeader
          title={isEdit ? "Edit Report" : "Create New Report"}
          onBack={() => router.back()}
        />

        <Card>
          <CardHeader>
            <CardTitle>Report Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Report Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
                placeholder="Enter report title"
                required
              />

              <FormInput
                label="Date"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                error={errors.dateTime}
                placeholder="YYYY-MM"
                helpText="Format: YYYY-MM (e.g., 2025-10)"
                required
              />

              <FormTextarea
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                error={errors.content}
                placeholder="Enter report content..."
                required
              />
              <FormButtons
                isEdit={isEdit}
                saving={saving}
                onCancel={() => router.back()}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
