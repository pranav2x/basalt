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
    <header 
      className="h-[60px] flex items-center justify-between px-4"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: 'inset 0 -1px 0 0 rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* Left: Menu + Workspace */}
      <div className="flex items-center gap-3">
        <button 
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--text-secondary)' }}>
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <div 
          className="flex items-center gap-2 text-sm" 
          style={{ color: 'var(--text-secondary)' }}
        >
          <button 
            className="hover:text-white transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            Workspace
          </button>
          <span>/</span>
          <button 
            className="hover:text-white transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            Untitled
          </button>
        </div>
      </div>

      {/* Center Tabs */}
      <nav 
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full p-1"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Right: Avatar + Share */}
      <div className="flex items-center gap-2">
        <button 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <Plus className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
        </button>
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #5E6AD2 0%, #8E96E8 100%)',
          }}
        >
          <span className="text-xs font-medium text-white">U</span>
        </div>
        <button 
          className="px-4 py-1.5 text-white text-sm font-medium rounded-lg transition-colors"
          style={{
            background: 'var(--indigo-500)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--indigo-400)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--indigo-500)';
          }}
        >
          Share
        </button>
      </div>
    </header>
  );
}

