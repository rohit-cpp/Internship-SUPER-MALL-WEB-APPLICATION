// src/components/ErrorBoundary.tsx
import React, { type ErrorInfo } from "react";
import { Button } from "@/components/ui/button";

interface State {
  hasError: boolean;
  error?: Error;
}

interface Props {
  children?: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 text-red-800 rounded">
          <h2 className="text-xl font-semibold">Something went wrong.</h2>
          <pre className="mt-2 text-sm">{this.state.error?.message}</pre>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
