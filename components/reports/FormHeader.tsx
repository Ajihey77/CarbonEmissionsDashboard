import { ArrowLeft } from "lucide-react";

interface FormHeaderProps {
  title: string;
  onBack: () => void;
}

export const FormHeader = ({ title, onBack }: FormHeaderProps) => (
  <div className="mb-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Reports
    </button>
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
  </div>
);
