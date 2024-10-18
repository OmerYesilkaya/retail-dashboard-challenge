import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// TODO(omer): Skeleton UI? + Better error UI
export function FallbackWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong...</div>}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </ErrorBoundary>
  );
}
