'use client';

import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Sparkles } from 'lucide-react';

interface PremiumNodeData {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  tags?: string[];
  status?: 'active' | 'idle' | 'error';
}

export default function PremiumNode({ data, selected }: NodeProps<PremiumNodeData>) {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    active: '#4ADE80',
    idle: '#71717A',
    error: '#EF4444',
  };

  const statusColor = statusColors[data.status || 'idle'];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="premium-node-wrapper gpu-accelerate will-change-transform"
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
      }}
    >
      {/* Animated Selection Glow */}
      {selected && (
        <div
          className="selection-glow"
          style={{
            position: 'absolute',
            inset: '-24px',
            background: `conic-gradient(
              from 0deg,
              rgba(94, 106, 210, 0.4),
              rgba(142, 150, 232, 0.6),
              rgba(94, 106, 210, 0.4)
            )`,
            filter: 'blur(32px)',
            opacity: 0.8,
            animation: 'rotate-glow 8s linear infinite',
            zIndex: -1,
            pointerEvents: 'none',
            borderRadius: '14px',
          }}
        />
      )}
      
      {/* Premium Node Container with 7-Layer Glassmorphism */}
      <div
        className={`premium-node ${selected ? 'selected' : ''}`}
        style={{
          position: 'relative',
          minWidth: '280px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: selected 
            ? '1px solid rgba(94, 106, 210, 0.6)' 
            : '1px solid var(--glass-border)',
          borderRadius: '14px',
          overflow: 'hidden',
          cursor: 'move',
          boxShadow: selected
            ? `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
               inset 0 0 0 1px rgba(94, 106, 210, 0.3),
               0 0 0 2px rgba(94, 106, 210, 0.4),
               0 16px 48px rgba(0, 0, 0, 0.6)`
            : isHovered
            ? `inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
               inset 0 0 0 1px rgba(255, 255, 255, 0.08),
               0 12px 40px rgba(0, 0, 0, 0.5)`
            : `inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
               inset 0 0 0 1px rgba(255, 255, 255, 0.05),
               0 8px 32px rgba(0, 0, 0, 0.4)`,
          backgroundImage: `linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.02) 100%
          )`,
          backgroundBlendMode: 'overlay',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Node Header */}
        <div
          className="node-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 24px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Icon */}
          <div
            className="node-icon"
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(94, 106, 210, 0.15)',
              border: '1px solid rgba(94, 106, 210, 0.25)',
              borderRadius: '8px',
              color: 'var(--indigo-400)',
            }}
          >
            {data.icon || <Sparkles className="w-5 h-5" />}
          </div>
          
          {/* Title */}
          <span
            className="node-title"
            style={{
              flex: 1,
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            {data.label}
          </span>
          
          {/* Status Indicator */}
          <div
            className="node-status"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: statusColor,
              boxShadow: `0 0 8px ${statusColor}80`,
              animation: data.status === 'active' ? 'pulse-status 2s ease-in-out infinite' : 'none',
            }}
          />
        </div>
        
        {/* Node Body */}
        <div
          className="node-body"
          style={{
            padding: '24px',
          }}
        >
          {/* Description */}
          {data.description && (
            <p
              className="node-description"
              style={{
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                letterSpacing: '0.01em',
                marginBottom: data.tags && data.tags.length > 0 ? '16px' : 0,
              }}
            >
              {data.description}
            </p>
          )}
          
          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div
              className="node-meta"
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="node-tag"
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'var(--indigo-300)',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    padding: '4px 8px',
                    background: 'rgba(94, 106, 210, 0.1)',
                    border: '1px solid rgba(94, 106, 210, 0.2)',
                    borderRadius: '4px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Connection Handles - Invisible by default */}
        <Handle
          type="target"
          position={Position.Left}
          className={`premium-handle ${isHovered || selected ? 'visible' : ''}`}
          style={{
            left: '-5px',
            width: '10px',
            height: '10px',
            background: 'var(--indigo-500)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            opacity: isHovered || selected ? 1 : 0,
            transform: isHovered || selected ? 'scale(1)' : 'scale(0.5)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isHovered || selected ? '0 0 0 4px rgba(94, 106, 210, 0.2)' : 'none',
          }}
        />
        <Handle
          type="source"
          position={Position.Right}
          className={`premium-handle ${isHovered || selected ? 'visible' : ''}`}
          style={{
            right: '-5px',
            width: '10px',
            height: '10px',
            background: 'var(--indigo-500)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            opacity: isHovered || selected ? 1 : 0,
            transform: isHovered || selected ? 'scale(1)' : 'scale(0.5)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isHovered || selected ? '0 0 0 4px rgba(94, 106, 210, 0.2)' : 'none',
          }}
        />
      </div>
    </div>
  );
}

