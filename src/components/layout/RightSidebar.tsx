'use client';

import { useState } from 'react';
import { Trash2, Info } from 'lucide-react';
import { useCanvasStore } from '@/store/useCanvasStore';

export function RightSidebar() {
  const { nodes } = useCanvasStore();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // In a real app, you'd get the selected node from the store
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  if (!selectedNode) {
    return null; // Hide right sidebar when nothing is selected
  }

  return (
    <aside className="w-[280px] bg-[#0f0f0f] border-l border-zinc-800/40 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800/40">
        <h2 className="text-xs font-semibold text-white">Properties</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Node Type Badge */}
        <div>
          <label className="text-[10px] text-zinc-500 mb-1.5 block uppercase tracking-wider">Type</label>
          <span className="inline-flex items-center px-2.5 py-1 rounded bg-zinc-900/50 border border-zinc-800/40 text-xs text-zinc-300">
            {selectedNode.type || 'default'}
          </span>
        </div>

        {/* Editable Name */}
        <div>
          <label className="text-[10px] text-zinc-500 mb-1.5 block uppercase tracking-wider">Name</label>
          <input
            type="text"
            defaultValue={selectedNode.data?.label || 'Untitled'}
            className="w-full px-2.5 py-1.5 bg-zinc-900/30 border border-zinc-800/40 rounded text-xs text-white focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>

        {/* Position */}
        <div>
          <label className="text-[10px] text-zinc-500 mb-1.5 block uppercase tracking-wider">Position</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-zinc-600 mb-1 block">X</label>
              <input
                type="number"
                value={Math.round(selectedNode.position.x)}
                readOnly
                className="w-full px-2.5 py-1.5 bg-zinc-900/30 border border-zinc-800/40 rounded text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-600 mb-1 block">Y</label>
              <input
                type="number"
                value={Math.round(selectedNode.position.y)}
                readOnly
                className="w-full px-2.5 py-1.5 bg-zinc-900/30 border border-zinc-800/40 rounded text-xs text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <div className="p-4 border-t border-zinc-800/40">
        <button className="w-full px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded text-xs text-red-400 font-medium transition-colors flex items-center justify-center gap-2">
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </aside>
  );
}

