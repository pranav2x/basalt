'use client';

import { useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  NodeTypes,
  EdgeTypes,
  useReactFlow,
} from 'reactflow';
import { Image } from 'lucide-react';
import { useCanvasStore } from '@/store/useCanvasStore';
import PremiumNode from '@/components/nodes/PremiumNode';
import PremiumEdge from './PremiumEdge';
import CanvasControls from './CanvasControls';
import PremiumMinimap from './PremiumMinimap';
import 'reactflow/dist/style.css';

const nodeTypes: NodeTypes = {
  premium: PremiumNode,
};

const edgeTypes: EdgeTypes = {
  premium: PremiumEdge,
};

export default function BasaltCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();
  const [commandInput, setCommandInput] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [zoom, setZoom] = useState(100);

  const connectionLineStyle = {
    stroke: 'url(#connection-gradient)',
    strokeWidth: 2.5,
  };

  const defaultEdgeOptions = {
    type: 'premium',
    animated: false,
  };

  // Handle keyboard shortcut ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('command-input')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    setIsCreating(true);
    // Simulate creation process
    setTimeout(() => {
      setCommandInput('');
      setIsCreating(false);
    }, 1500);
  };

  return (
    <div className="relative w-full h-full">
      {/* Atmospheric Background Gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(94, 106, 210, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(142, 150, 232, 0.03) 0%, transparent 50%)
          `,
        }}
      />
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineType={ConnectionLineType.Bezier}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        className="bg-canvas-base"
        proOptions={{ hideAttribution: true }}
        onMove={(_, viewport) => {
          setZoom(viewport.zoom * 100);
        }}
      >
        {/* Gradient Definition for Connection Line */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8E96E8" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Premium Dot Grid Background */}
        <Background
          color="rgba(255, 255, 255, 0.12)"
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          style={{
            backgroundColor: 'var(--canvas-base)',
          }}
        />
        
        {/* Premium Minimap */}
        <PremiumMinimap />
      </ReactFlow>
      
      {/* Canvas Controls */}
      <CanvasControls zoom={zoom} />

      {/* Center Empty State */}
      {nodes.length === 0 && !isCreating && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Enter a prompt below or drag & drop your media
          </p>
        </div>
      )}

      {/* Premium Command Palette */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-2xl px-4">
        <form onSubmit={handleCommandSubmit}>
          <div 
            className="glass-element"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 16px 64px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Input Area */}
            <div className="flex items-start gap-3 px-4 py-3">
              <button
                type="button"
                className="mt-1 p-1.5 hover:bg-white/5 rounded transition-colors flex-shrink-0"
              >
                <Image className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              </button>
              
              {isCreating ? (
                <div className="flex items-center gap-3 flex-1 py-1">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--text-primary)', animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--text-primary)', animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--text-primary)', animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Creating...</span>
                </div>
              ) : (
                <textarea
                  id="command-input"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Search or enter a command..."
                  rows={1}
                  className="flex-1 bg-transparent outline-none resize-none py-1"
                  style={{ 
                    minHeight: '24px', 
                    maxHeight: '120px',
                    fontSize: '15px',
                    color: 'var(--text-primary)',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                  }}
                />
              )}
            </div>

            {/* Bottom Controls Row */}
            <div 
              className="px-4 py-2.5 flex items-center justify-between"
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div className="flex items-center gap-2">
                {/* Keyboard Hint */}
                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <span>Press</span>
                  <span className="kbd">⌘</span>
                  <span className="kbd">K</span>
                  <span>to toggle</span>
                </div>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!commandInput.trim() || isCreating}
                style={{
                  width: '28px',
                  height: '28px',
                  background: !commandInput.trim() || isCreating 
                    ? 'rgba(94, 106, 210, 0.3)' 
                    : 'var(--indigo-500)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  cursor: !commandInput.trim() || isCreating ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (commandInput.trim() && !isCreating) {
                    e.currentTarget.style.background = 'var(--indigo-400)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = !commandInput.trim() || isCreating 
                    ? 'rgba(94, 106, 210, 0.3)' 
                    : 'var(--indigo-500)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M8 3l3 3M8 3L5 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

