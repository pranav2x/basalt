'use client';

import { useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  NodeTypes,
} from 'reactflow';
import { Maximize, Sparkles, Image, Wand2 } from 'lucide-react';
import { useCanvasStore } from '@/store/useCanvasStore';
import 'reactflow/dist/style.css';

const nodeTypes: NodeTypes = {
  // Add custom node types here later
};

export default function BasaltCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();
  const [commandInput, setCommandInput] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const connectionLineStyle = {
    stroke: '#fff',
    strokeWidth: 2,
  };

  const defaultEdgeOptions = {
    style: { stroke: '#fff', strokeWidth: 2 },
    type: 'smoothstep',
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
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        className="bg-[#0a0a0a]"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="#1a1a1a"
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
        />
      </ReactFlow>

      {/* Center Empty State */}
      {nodes.length === 0 && !isCreating && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <p className="text-sm text-zinc-600">Enter a prompt below or drag & drop your media</p>
        </div>
      )}

      {/* Toolbar Top Right */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button className="p-2 bg-zinc-900/50 hover:bg-zinc-900/70 border border-zinc-800/50 rounded-lg transition-colors">
          <Maximize className="w-4 h-4 text-zinc-400" />
        </button>
        <button className="p-2 bg-zinc-900/50 hover:bg-zinc-900/70 border border-zinc-800/50 rounded-lg transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-400">
            <rect x="3" y="3" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="9" y="3" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
        <button className="p-2 bg-zinc-900/50 hover:bg-zinc-900/70 border border-zinc-800/50 rounded-lg transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-400">
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 8h2M12 8h2M8 2v2M8 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Bottom Left Help Button */}
      <div className="absolute bottom-6 left-6 z-10">
        <button className="w-10 h-10 bg-zinc-900/80 backdrop-blur-md hover:bg-zinc-900 rounded-full flex items-center justify-center transition-colors">
          <span className="text-sm text-white font-semibold">?</span>
        </button>
      </div>

      {/* Bottom Right Transform & Zoom */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
        <span className="text-xs text-zinc-400">Transform</span>
        <span className="text-xs text-zinc-400">100%</span>
      </div>

      {/* Bottom Command Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-2xl px-4">
        <form onSubmit={handleCommandSubmit}>
          <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/40 rounded-xl shadow-2xl overflow-hidden">
            {/* Input Area */}
            <div className="flex items-start gap-3 px-4 py-3">
              <button
                type="button"
                className="mt-1 p-1.5 hover:bg-zinc-800/50 rounded transition-colors flex-shrink-0"
              >
                <Image className="w-4 h-4 text-zinc-500" />
              </button>
              
              {isCreating ? (
                <div className="flex items-center gap-3 flex-1 py-1">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-zinc-500">Creating...</span>
                </div>
              ) : (
                <textarea
                  id="command-input"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Enter a prompt below or drag & drop your media"
                  rows={1}
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-zinc-600 outline-none resize-none py-1"
                  style={{ minHeight: '24px', maxHeight: '120px' }}
                />
              )}
            </div>

            {/* Bottom Controls Row */}
            <div className="border-t border-zinc-800/40 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Aspect Ratio Button */}
                <button
                  type="button"
                  className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  4:3
                </button>

                {/* Model Dropdown */}
                <button
                  type="button"
                  className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Model
                </button>

                {/* More Options */}
                <button
                  type="button"
                  className="px-2 py-1 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  ...
                </button>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!commandInput.trim() || isCreating}
                className="w-7 h-7 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
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

