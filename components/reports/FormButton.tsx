import { Save, Loader2 } from "lucide-react";

interface FormButtonsProps {
  isEdit: boolean;
  saving: boolean;
  onCancel: () => void;
}

export const FormButtons = ({ isEdit, saving, onCancel }: FormButtonsProps) => (
  <div className="flex gap-3 pt-4">
    <button
      type="submit"
      disabled={saving}
      className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {saving ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="w-4 h-4" />
          {isEdit ? "Update Report" : "Create Report"}
        </>
      )}
    </button>
    <button
      type="button"
      onClick={onCancel}
      disabled={saving}
      className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
    >
      Cancel
    </button>
  </div>
);
