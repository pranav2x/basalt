'use client';

import React from 'react';
import { MiniMap } from 'reactflow';

export default function PremiumMinimap() {
  return (
    <MiniMap
      className="premium-minimap"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--glass-border)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)',
        width: '200px',
        height: '150px',
      }}
      maskColor="rgba(8, 9, 10, 0.7)"
      maskStrokeColor="rgba(94, 106, 210, 0.6)"
      maskStrokeWidth={2}
      nodeColor={(node) => {
        // Color nodes based on their type or status
        if (node.selected) {
          return 'rgba(94, 106, 210, 0.8)';
        }
        return 'rgba(94, 106, 210, 0.5)';
      }}
      nodeBorderRadius={3}
      nodeStrokeColor="rgba(94, 106, 210, 0.7)"
      nodeStrokeWidth={1}
    />
  );
}

