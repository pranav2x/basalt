'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
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
    <aside 
      className="w-[280px] flex flex-col"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: 'inset 1px 0 0 0 rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* Header */}
      <div 
        className="px-4 py-3"
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <h2 
          className="text-xs font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          Properties
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Node Type Badge */}
        <div>
          <label 
            className="text-[10px] mb-1.5 block uppercase tracking-wider"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Type
          </label>
          <span 
            className="inline-flex items-center px-2.5 py-1 rounded text-xs"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--text-secondary)',
            }}
          >
            {selectedNode.type || 'default'}
          </span>
        </div>

        {/* Editable Name */}
        <div>
          <label 
            className="text-[10px] mb-1.5 block uppercase tracking-wider"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Name
          </label>
          <input
            type="text"
            defaultValue={selectedNode.data?.label || 'Untitled'}
            className="w-full px-2.5 py-1.5 rounded text-xs outline-none transition-colors"
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

        {/* Position */}
        <div>
          <label 
            className="text-[10px] mb-1.5 block uppercase tracking-wider"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Position
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label 
                className="text-[10px] mb-1 block"
                style={{ color: 'var(--text-tertiary)' }}
              >
                X
              </label>
              <input
                type="number"
                value={Math.round(selectedNode.position.x)}
                readOnly
                className="w-full px-2.5 py-1.5 rounded text-xs outline-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
            <div>
              <label 
                className="text-[10px] mb-1 block"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Y
              </label>
              <input
                type="number"
                value={Math.round(selectedNode.position.y)}
                readOnly
                className="w-full px-2.5 py-1.5 rounded text-xs outline-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <div 
        className="p-4"
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <button 
          className="w-full px-3 py-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-2"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#EF4444',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
          }}
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </aside>
  );
}

