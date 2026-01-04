'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

type Tab = 'canvas' | 'copilot' | 'compose';

export function TopBar() {
  const [activeTab, setActiveTab] = useState<Tab>('canvas');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'canvas', label: 'Canvas' },
    { id: 'copilot', label: 'Copilot' },
    { id: 'compose', label: 'Compose' },
  ];

  return (
    <header className="h-[60px] bg-[#1a1a1a] border-b border-zinc-800/50 flex items-center justify-between px-4">
      {/* Left: Menu + Workspace */}
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 flex items-center justify-center hover:bg-zinc-800/50 rounded-lg transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-400">
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <button className="hover:text-white transition-colors">Workspace</button>
          <span>/</span>
          <button className="hover:text-white transition-colors">Untitled</button>
        </div>
      </div>

      {/* Center Tabs */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-zinc-900/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-1.5 rounded-md text-sm font-medium transition-all
              ${
                activeTab === tab.id
                  ? 'text-white bg-zinc-800'
                  : 'text-zinc-400 hover:text-white'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Right: Avatar + Share */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors">
          <Plus className="w-4 h-4 text-zinc-400" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-xs font-medium text-white">U</span>
        </div>
        <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Share
        </button>
      </div>
    </header>
  );
}

