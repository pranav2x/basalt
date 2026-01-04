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
    <aside className="w-[240px] bg-[#0f0f0f] border-r border-zinc-800/40 flex flex-col">
      {/* Tabs */}
      <div className="flex items-center border-b border-zinc-800 px-3">
        <button
          onClick={() => setActiveTab('layers')}
          className={`
            flex-1 flex items-center justify-center gap-2 px-3 py-3 text-xs font-medium transition-colors relative
            ${activeTab === 'layers' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
          `}
        >
          <Layers className="w-3.5 h-3.5" />
          Layers
          {activeTab === 'layers' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('assets')}
          className={`
            flex-1 flex items-center justify-center gap-2 px-3 py-3 text-xs font-medium transition-colors relative
            ${activeTab === 'assets' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
          `}
        >
          <Grid3x3 className="w-3.5 h-3.5" />
          Assets
          {activeTab === 'assets' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
          )}
        </button>
        <button className="p-2 hover:bg-zinc-800/50 rounded transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-500">
            <rect x="3" y="3" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="9" y="3" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="3" y="9" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="9" y="9" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-zinc-800/40">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search layers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 bg-zinc-900/30 border border-zinc-800/40 rounded text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>
      </div>

      {/* New Artboard Button */}
      <div className="p-3">
        <button className="w-full flex items-center gap-2 px-3 py-2 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/40 rounded text-xs text-zinc-400 hover:text-zinc-300 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-zinc-500">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          New artboard
        </button>
      </div>

      {/* Layers List */}
      <div className="flex-1 overflow-y-auto px-3">
        {filteredNodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-xs text-zinc-600">No layers yet</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredNodes.map((node) => (
              <button
                key={node.id}
                className="w-full px-2 py-1.5 rounded hover:bg-zinc-800/50 transition-colors text-left flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] text-zinc-500">
                    {node.type?.charAt(0).toUpperCase() || 'N'}
                  </span>
                </div>
                <span className="text-xs text-zinc-300 truncate flex-1">
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

