"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface AppShellProps {
  children: React.ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AppShell({ children, user }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header user={user} />
        <main className="px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
