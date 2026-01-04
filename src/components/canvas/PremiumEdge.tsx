'use client';

import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

export default function PremiumEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  style = {},
}: EdgeProps) {
  // Calculate cubic Bezier path with control points at +/-100px
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8E96E8" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {/* Main Edge Path */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={selected ? 3 : 2.5}
        stroke={`url(#gradient-${id})`}
        fill="none"
        style={{
          strokeLinecap: 'round',
          filter: selected 
            ? 'drop-shadow(0 0 8px rgba(94, 106, 210, 0.6))' 
            : 'drop-shadow(0 0 4px rgba(94, 106, 210, 0.3))',
          transition: 'all 0.2s ease',
          ...style,
        }}
      />
      
      {/* Animated Flow Effect (Marching Ants) */}
      {selected && (
        <path
          d={edgePath}
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 8"
          style={{
            strokeLinecap: 'round',
            animation: 'dash-flow 20s linear infinite',
          }}
        />
      )}
    </>
  );
}

