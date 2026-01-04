'use client';

import { TopBar } from './TopBar';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div 
      className="h-screen w-screen overflow-hidden"
      style={{ 
        backgroundColor: 'var(--canvas-base)',
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(94, 106, 210, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(142, 150, 232, 0.02) 0%, transparent 50%)
        `,
      }}
    >
      {/* CSS Grid Layout */}
      <div className="h-full grid grid-rows-[60px_1fr]">
        {/* Top Bar */}
        <TopBar />

        {/* Main Content Area with Sidebars */}
        <div className="grid grid-cols-[240px_1fr_auto] overflow-hidden">
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Main Canvas Area */}
          <main 
            className="relative overflow-hidden" 
            style={{ backgroundColor: 'var(--canvas-base)' }}
          >
            {children}
          </main>

          {/* Right Sidebar - conditionally rendered */}
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

