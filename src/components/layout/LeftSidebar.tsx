'use client';

import { useState } from 'react';
import { Search, Layers, Grid3x3 } from 'lucide-react';
import { useCanvasStore } from '@/store/useCanvasStore';

type SidebarTab = 'layers' | 'assets';

export function LeftSidebar() {
  const [activeTab, setActiveTab] = useState<SidebarTab>('layers');
  const [searchQuery, setSearchQuery] = useState('');
  const { nodes } = useCanvasStore();

  const filteredNodes = nodes.filter((node) =>
    node.data?.label?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside 
      className="w-[240px] flex flex-col"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: 'inset -1px 0 0 0 rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* Tabs */}
      <div 
        className="flex items-center px-3"
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <button
          onClick={() => setActiveTab('layers')}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-3 text-xs font-medium transition-colors relative"
          style={{
            color: activeTab === 'layers' ? 'var(--text-primary)' : 'var(--text-secondary)',
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'layers') {
              e.currentTarget.style.color = 'var(--text-primary)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'layers') {
              e.currentTarget.style.color = 'var(--text-secondary)';
            }
          }}
        >
          <Layers className="w-3.5 h-3.5" />
          Layers
          {activeTab === 'layers' && (
            <span 
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '2px',
                background: 'var(--indigo-500)',
              }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('assets')}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-3 text-xs font-medium transition-colors relative"
          style={{
            color: activeTab === 'assets' ? 'var(--text-primary)' : 'var(--text-secondary)',
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'assets') {
              e.currentTarget.style.color = 'var(--text-primary)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'assets') {
              e.currentTarget.style.color = 'var(--text-secondary)';
            }
          }}
        >
          <Grid3x3 className="w-3.5 h-3.5" />
          Assets
          {activeTab === 'assets' && (
            <span 
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '2px',
                background: 'var(--indigo-500)',
              }}
            />
          )}
        </button>
        <button 
          className="p-2 rounded transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--text-tertiary)' }}>
            <rect x="3" y="3" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="9" y="3" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="3" y="9" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="9" y="9" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>

      {/* Search */}
      <div 
        className="p-3"
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="relative">
          <Search 
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" 
            style={{ color: 'var(--text-tertiary)' }}
          />
          <input
            type="text"
            placeholder="Search layers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 rounded text-xs outline-none transition-colors"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--text-primary)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }}
          />
        </div>
      </div>

      {/* New Artboard Button */}
      <div className="p-3">
        <button 
          className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: 'var(--text-secondary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--text-tertiary)' }}>
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          New artboard
        </button>
      </div>

      {/* Layers List */}
      <div className="flex-1 overflow-y-auto px-3">
        {filteredNodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              No layers yet
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredNodes.map((node) => (
              <button
                key={node.id}
                className="w-full px-2 py-1.5 rounded transition-colors text-left flex items-center gap-2"
                style={{
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                    {node.type?.charAt(0).toUpperCase() || 'N'}
                  </span>
                </div>
                <span className="text-xs truncate flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {node.data?.label || 'Untitled'}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

