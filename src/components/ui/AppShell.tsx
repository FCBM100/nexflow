"use client";

import { useState, type ReactNode } from "react";
import LoadingScreen from "./LoadingScreen";
import ErrorBoundary from "./ErrorBoundary";
import Navbar from "./Navbar";
import CursorGlow from "./CursorGlow";
import FloatingOrbs from "./FloatingOrbs";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <FloatingOrbs />

      <div
        style={{ opacity: loading ? 0 : 1 }}
        className="transition-opacity duration-500"
      >
        <CursorGlow />
        <Navbar />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>
    </>
  );
}
