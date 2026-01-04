import { create } from 'zustand';
import {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';

interface CanvasStore {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node) => void;
}

// Sample demo nodes to showcase the premium design
const demoNodes: Node[] = [
  {
    id: '1',
    type: 'premium',
    position: { x: 250, y: 100 },
    data: {
      label: 'AI Agent',
      description: 'GPT-4 powered intelligent assistant for code generation',
      tags: ['GPT-4', 'Active'],
      status: 'active',
    },
  },
  {
    id: '2',
    type: 'premium',
    position: { x: 600, y: 100 },
    data: {
      label: 'Data Pipeline',
      description: 'Process and transform data streams in real-time',
      tags: ['Processing', 'Idle'],
      status: 'idle',
    },
  },
];

const demoEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'premium',
  },
];

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  nodes: demoNodes,
  edges: demoEdges,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  addNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
}));
