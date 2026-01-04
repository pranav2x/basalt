'use client';

import { TopBar } from './TopBar';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0f0f0f]">
      {/* CSS Grid Layout */}
      <div className="h-full grid grid-rows-[60px_1fr]">
        {/* Top Bar */}
        <TopBar />

        {/* Main Content Area with Sidebars */}
        <div className="grid grid-cols-[240px_1fr_auto] overflow-hidden">
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Main Canvas Area */}
          <main className="relative overflow-hidden bg-[#0f0f0f]">
            {children}
          </main>

          {/* Right Sidebar - conditionally rendered */}
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

