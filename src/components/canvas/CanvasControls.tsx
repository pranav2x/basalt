'use client';

import React, { useState } from 'react';
import { Hand, MousePointer2, Plus, Link2 } from 'lucide-react';

type ToolType = 'select' | 'hand' | 'add' | 'connect';

interface CanvasControlsProps {
  activeTool?: ToolType;
  onToolChange?: (tool: ToolType) => void;
  zoom?: number;
}

export default function CanvasControls({ 
  activeTool = 'select', 
  onToolChange,
  zoom = 100 
}: CanvasControlsProps) {
  const [currentTool, setCurrentTool] = useState<ToolType>(activeTool);

  const handleToolChange = (tool: ToolType) => {
    setCurrentTool(tool);
    onToolChange?.(tool);
  };

  const tools: { id: ToolType; icon: React.ReactNode; title: string }[] = [
    { id: 'select', icon: <MousePointer2 className="w-4 h-4" />, title: 'Select (V)' },
    { id: 'hand', icon: <Hand className="w-4 h-4" />, title: 'Hand Tool (H)' },
    { id: 'add', icon: <Plus className="w-4 h-4" />, title: 'Add Node (A)' },
    { id: 'connect', icon: <Link2 className="w-4 h-4" />, title: 'Connect (C)' },
  ];

  return (
    <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
      {/* Tool Control Panel */}
      <div
        className="control-panel glass-element"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px',
          borderRadius: '12px',
        }}
      >
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleToolChange(tool.id)}
            title={tool.title}
            className={`control-btn ${currentTool === tool.id ? 'active' : ''}`}
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: currentTool === tool.id
                ? 'rgba(94, 106, 210, 0.2)'
                : 'rgba(255, 255, 255, 0.05)',
              border: currentTool === tool.id
                ? '1px solid rgba(94, 106, 210, 0.4)'
                : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              color: currentTool === tool.id
                ? 'var(--indigo-400)'
                : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (currentTool !== tool.id) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentTool !== tool.id) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = currentTool === tool.id ? 'scale(1)' : 'scale(1.05)';
            }}
          >
            {tool.icon}
          </button>
        ))}
      </div>

      {/* Zoom Indicator */}
      <div
        className="zoom-indicator glass-element"
        style={{
          padding: '10px 16px',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          minWidth: '70px',
          textAlign: 'center',
        }}
      >
        {Math.round(zoom)}%
      </div>
    </div>
  );
}

