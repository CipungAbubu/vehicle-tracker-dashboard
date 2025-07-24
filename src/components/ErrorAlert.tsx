import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";

interface ErrorAlertProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorAlert = ({ error, onRetry }: ErrorAlertProps) => {
  return (
    <Alert
      variant="destructive"
      className="flex items-start gap-4 rounded-xl border border-[#FADCD9] bg-[#FFF7F5] text-[#8C3D3D] px-6 py-4 shadow-sm"
    >
      <div className="flex-shrink-0 mt-1">
        <AlertTriangle className="h-5 w-5 text-[#F97362]" />
      </div>
      <div className="flex-1">
        <AlertTitle className="text-base font-semibold text-[#A43F3F]">
          An error occured.
        </AlertTitle>
        <AlertDescription className="mt-1 text-sm text-[#8C3D3D]">
          {error}
          {onRetry && (
            <div className="mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onRetry}
                className="bg-[#F97362] hover:bg-[#E55C50] text-white font-medium rounded-md"
              >
                Try again
              </Button>
            </div>
          )}
        </AlertDescription>
      </div>
    </Alert>
  );
};
