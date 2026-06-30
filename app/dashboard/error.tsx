"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Dashboard Error</h2>
        <p className="text-muted-foreground">{error.message}</p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}
