interface FormErrorProps {
  message: string;
  onBack: () => void;
}

export const FormError = ({ message, onBack }: FormErrorProps) => (
  <div className="text-center py-12">
    <p className="text-red-500 font-medium">{message}</p>
    <button
      onClick={onBack}
      className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
    >
      Go Back
    </button>
  </div>
);
