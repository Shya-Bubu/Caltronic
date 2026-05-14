'use client';

import { useEffect, useState } from 'react';
import { ReactFlow, Node, Edge, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

// Dark theme node styling
const nodeStyle = {
  background: '#1e293b',
  color: '#e2e8f0',
  border: '2px solid #475569',
  borderRadius: '8px',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: '600',
  minWidth: '80px',
  textAlign: 'center' as const,
};

// Define the feedback control loop nodes
const initialNodes: Node[] = [
  { id: 'r', data: { label: 'R(s)' }, position: { x: 0, y: 0 }, style: nodeStyle },
  { id: 'sum', data: { label: 'Σ' }, position: { x: 0, y: 0 }, style: nodeStyle },
  { id: 'g', data: { label: 'G(s)' }, position: { x: 0, y: 0 }, style: nodeStyle },
  { id: 'p', data: { label: 'P(s)' }, position: { x: 0, y: 0 }, style: nodeStyle },
  { id: 'y', data: { label: 'Y(s)' }, position: { x: 0, y: 0 }, style: nodeStyle },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1', 
    source: 'r', 
    target: 'sum', 
    label: '+',
    style: { stroke: '#4ade80', strokeWidth: 2 },
    labelStyle: { fill: '#e2e8f0', fontSize: 12 },
  },
  { 
    id: 'e2', 
    source: 'sum', 
    target: 'g',
    style: { stroke: '#4ade80', strokeWidth: 2 },
  },
  { 
    id: 'e3', 
    source: 'g', 
    target: 'p',
    style: { stroke: '#4ade80', strokeWidth: 2 },
  },
  { 
    id: 'e4', 
    source: 'p', 
    target: 'y',
    style: { stroke: '#4ade80', strokeWidth: 2 },
  },
  { 
    id: 'e5', 
    source: 'y', 
    target: 'sum', 
    label: '−', 
    animated: true,
    style: { stroke: '#fbbf24', strokeWidth: 2 },
    labelStyle: { fill: '#e2e8f0', fontSize: 12 },
  },
];

export default function ReactFlowSection() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [error, setError] = useState<string | null>(null);
  const [layouted, setLayouted] = useState(false);

  useEffect(() => {
    async function layoutGraph() {
      try {
        const graph = {
          id: 'root',
          layoutOptions: {
            'elk.algorithm': 'layered',
            'elk.direction': 'RIGHT',
            'elk.spacing.nodeNode': '80',
            'elk.layered.spacing.nodeNodeBetweenLayers': '100',
          },
          children: initialNodes.map(node => ({
            id: node.id,
            width: 80,
            height: 40,
          })),
          edges: initialEdges.map(edge => ({
            id: edge.id,
            sources: [edge.source],
            targets: [edge.target],
          })),
        };

        const layout = await elk.layout(graph);

        const layoutedNodes = initialNodes.map(node => {
          const elkNode = layout.children?.find(n => n.id === node.id);
          return {
            ...node,
            position: {
              x: elkNode?.x ?? 0,
              y: elkNode?.y ?? 0,
            },
          };
        });

        setNodes(layoutedNodes);
        setLayouted(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to layout graph');
        console.error('ELK layout error:', err);
      }
    }

    layoutGraph();
  }, [setNodes]);

  if (error) {
    return (
      <div style={{ color: '#ef4444', padding: '2rem', textAlign: 'center' }}>
        <p>❌ Failed to layout graph</p>
        <p style={{ fontSize: '0.9rem', color: '#a3a3a3', marginTop: '0.5rem', fontFamily: 'monospace' }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div 
        style={{ 
          width: '100%', 
          height: '400px', 
          background: '#0f172a', 
          borderRadius: '8px',
          border: '1px solid #1e293b'
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          proOptions={{ hideAttribution: true }}
          style={{ background: '#0f172a' }}
        />
      </div>
      {layouted && (
        <p style={{ color: '#34d399', marginTop: '1rem', fontSize: '0.9rem' }}>
          ✓ React Flow + elkjs with dark theme
        </p>
      )}
    </div>
  );
}
