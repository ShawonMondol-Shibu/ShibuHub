"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorPage({ message = "Something went wrong", onRetry }: ErrorPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
        <h2 className="text-2xl font-bold">{message}</h2>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
