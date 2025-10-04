import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const CardLoadingSkeleton = () => (
  <div className="flex items-center justify-center h-full min-h-[200px]">
    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
  </div>
);

interface CardErrorProps {
  message: string;
  retryCount?: number;
}

export const CardError = ({ message }: CardErrorProps) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-3">
    <div className="text-center">
      <p className="text-red-500 text-sm font-medium">{message}</p>
    </div>
  </div>
);
