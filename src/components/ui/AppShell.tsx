"use client";

import { useState, type ReactNode } from "react";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <div
        style={{ opacity: loading ? 0 : 1 }}
        className="transition-opacity duration-500"
      >
        <Navbar />
        {children}
      </div>
    </>
  );
}
