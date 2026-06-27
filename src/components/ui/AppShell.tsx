"use client";

import type { ReactNode } from "react";
import LoadingScreen from "./LoadingScreen";
import ErrorBoundary from "./ErrorBoundary";
import Navbar from "./Navbar";
import CursorGlow from "./CursorGlow";
import FloatingOrbs from "./FloatingOrbs";
import AuroraBackground from "@/components/three/AuroraBackground";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <AuroraBackground />
      <LoadingScreen />
      <FloatingOrbs />
      <div>
        <CursorGlow />
        <Navbar />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>
    </>
  );
}
