import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { defaultFetch } from "@/api/defaultFetch";
import { fetchPosts, createOrUpdatePost } from "@/lib/api";
import { useCompanyStore } from "@/store/company";

export function useReportForm() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params?.id;

  const { data: reports, loading, error } = defaultFetch<Reports[]>(fetchPosts);
  const { companyId } = useCompanyStore();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    dateTime: "",
    resourceUid: companyId,
    content: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 수정 모드일 때 데이터 로드
  useEffect(() => {
    if (isEdit && reports && params.id) {
      const currentReport = reports.find((r) => r.id === params.id);
      if (currentReport) {
        setFormData({
          title: currentReport.title,
          dateTime: currentReport.dateTime,
          resourceUid: currentReport.resourceUid,
          content: currentReport.content,
        });
      }
    }
  }, [isEdit, reports, params.id]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.dateTime) {
      newErrors.dateTime = "Date is required";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Resource content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);
    try {
      const payload = isEdit
        ? { ...formData, id: params.id as string }
        : formData;

      await createOrUpdatePost(payload);
      router.push("/reports");
    } catch (error) {
      alert(
        `${
          isEdit
            ? "보고서를 수정하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            : "새 보고서를 등록하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }`
      );
    } finally {
      setSaving(false);
    }
  };

  const currentReport = reports?.find((r) => r.id === params.id);

  return {
    isEdit,
    loading,
    error,
    saving,
    formData,
    errors,
    reports,
    currentReport,
    handleChange,
    handleSubmit,
    router,
  };
}
