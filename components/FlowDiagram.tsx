"use client";

import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Handle,
  Position,
  Background,
  BackgroundVariant,
  MarkerType,
  type NodeTypes,
  type Node,
  type Edge,
  type DefaultEdgeOptions,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// ── Shared styles ────────────────────────────────────────────────────────────

const SERVICE_NODE_STYLE: React.CSSProperties = {
  background: "#1e222b",
  border: "1px solid #30363d",
  borderRadius: "4px",
  color: "#e6edf3",
  fontFamily: "var(--font-fauna)",
  fontSize: "0.72rem",
  padding: "7px 13px",
  whiteSpace: "nowrap",
};

const HANDLE: React.CSSProperties = {
  background: "transparent",
  border: "none",
  width: 6,
  height: 6,
};

const GROUP_STYLE: React.CSSProperties = {
  background: "rgba(30,34,43,0.45)",
  border: "1px dashed #2e3440",
  borderRadius: "8px",
};

// ── Custom node components ────────────────────────────────────────────────────

function GroupNode({ data }: { data: { label: string } }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", pointerEvents: "none" }}>
      <span
        style={{
          position: "absolute",
          top: 8,
          left: 11,
          fontFamily: "var(--font-fauna)",
          fontSize: "0.46rem",
          letterSpacing: "0.18em",
          color: "#4a5568",
          textTransform: "uppercase",
        }}
      >
        {data.label}
      </span>
    </div>
  );
}

function ServiceNode({ data }: { data: { label: string } }) {
  return (
    <>
      <Handle type="source" position={Position.Right} id="source-right" style={HANDLE} />
      <Handle type="source" position={Position.Left}  id="source-left"  style={HANDLE} />
      <Handle type="target" position={Position.Left}  id="target-left"  style={HANDLE} />
      <Handle type="target" position={Position.Right} id="target-right" style={HANDLE} />
      <div style={SERVICE_NODE_STYLE}>{data.label}</div>
    </>
  );
}

function HubNode({ data }: { data: { label: string } }) {
  return (
    <>
      <Handle type="target" position={Position.Left}  id="target-left"  style={HANDLE} />
      <Handle type="source" position={Position.Left}  id="source-left"  style={HANDLE} />
      <Handle type="target" position={Position.Right} id="target-right" style={HANDLE} />
      <Handle type="source" position={Position.Right} id="source-right" style={HANDLE} />
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: "#d97706",
          border: "2px solid #f59e0b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.88rem",
          fontFamily: "var(--font-fauna)",
          letterSpacing: "0.05em",
        }}
      >
        {data.label}
      </div>
    </>
  );
}

const nodeTypes: NodeTypes = {
  group:   GroupNode,
  service: ServiceNode,
  hub:     HubNode,
};

// ── Edge defaults ─────────────────────────────────────────────────────────────

const defaultEdgeOptions: DefaultEdgeOptions = {
  style: { stroke: "#3d4451", strokeWidth: 1.5 },
  markerEnd: { type: MarkerType.ArrowClosed, color: "#4a5568", width: 14, height: 14 },
  labelStyle: { fontFamily: "var(--font-fauna)", fontSize: "9px", fill: "#6b7280" },
  labelBgStyle: { fill: "#13161c", fillOpacity: 0.95 },
  labelBgPadding: [4, 6] as [number, number],
  labelBgBorderRadius: 3,
};

// ── Diagram registry ──────────────────────────────────────────────────────────

type DiagramDef = { nodes: Node[]; edges: Edge[] };

const DIAGRAMS: Record<string, DiagramDef> = {
  "n8n-stack": {
    nodes: [
      // Parent groups — must appear before their children
      {
        id: "g-commerce",
        type: "group",
        position: { x: 0, y: 75 },
        data: { label: "Commerce" },
        style: { ...GROUP_STYLE, width: 185, height: 168 },
      },
      {
        id: "g-logistics",
        type: "group",
        position: { x: 450, y: 0 },
        data: { label: "Logistics & Comms" },
        style: { ...GROUP_STYLE, width: 185, height: 228 },
      },
      {
        id: "g-data",
        type: "group",
        position: { x: 450, y: 288 },
        data: { label: "Data & Infrastructure" },
        style: { ...GROUP_STYLE, width: 200, height: 228 },
      },
      // Commerce children (positions are relative to parent)
      { id: "WOO",   type: "service", parentId: "g-commerce",  extent: "parent", position: { x: 12, y: 40  }, data: { label: "WooCommerce"  } },
      { id: "RAZ",   type: "service", parentId: "g-commerce",  extent: "parent", position: { x: 12, y: 102 }, data: { label: "Razorpay"     } },
      // Logistics children
      { id: "SHIP",  type: "service", parentId: "g-logistics", extent: "parent", position: { x: 12, y: 40  }, data: { label: "Shiprocket"   } },
      { id: "WHATS", type: "service", parentId: "g-logistics", extent: "parent", position: { x: 12, y: 100 }, data: { label: "WhatsApp"     } },
      { id: "TELE",  type: "service", parentId: "g-logistics", extent: "parent", position: { x: 12, y: 160 }, data: { label: "Telegram"     } },
      // Data children
      { id: "SUPA",   type: "service", parentId: "g-data", extent: "parent", position: { x: 12, y: 40  }, data: { label: "Supabase"      } },
      { id: "REDIS",  type: "service", parentId: "g-data", extent: "parent", position: { x: 12, y: 100 }, data: { label: "Redis"         } },
      { id: "SHEETS", type: "service", parentId: "g-data", extent: "parent", position: { x: 12, y: 160 }, data: { label: "Google Sheets" } },
      // Hub
      { id: "N8N", type: "hub", position: { x: 255, y: 162 }, data: { label: "n8n" } },
    ],
    edges: [
      { id: "e-woo-n8n",   source: "WOO",   sourceHandle: "source-right", target: "N8N",   targetHandle: "target-left",  label: "order events"    },
      { id: "e-raz-n8n",   source: "RAZ",   sourceHandle: "source-right", target: "N8N",   targetHandle: "target-left",  label: "HMAC webhook"    },
      { id: "e-ship-n8n",  source: "SHIP",  sourceHandle: "source-left",  target: "N8N",   targetHandle: "target-right", label: "status webhooks" },
      { id: "e-n8n-woo",   source: "N8N",   sourceHandle: "source-left",  target: "WOO",   targetHandle: "target-right", label: "stock sync"      },
      { id: "e-n8n-whats", source: "N8N",   sourceHandle: "source-right", target: "WHATS", targetHandle: "target-left",  label: "notifications"   },
      { id: "e-n8n-tele",  source: "N8N",   sourceHandle: "source-right", target: "TELE",  targetHandle: "target-left",  label: "RTO alerts"      },
      { id: "e-n8n-supa",  source: "N8N",   sourceHandle: "source-right", target: "SUPA",  targetHandle: "target-left"  },
      { id: "e-n8n-redis", source: "N8N",   sourceHandle: "source-right", target: "REDIS", targetHandle: "target-left"  },
      { id: "e-n8n-sheets",source: "N8N",   sourceHandle: "source-right", target: "SHEETS",targetHandle: "target-left"  },
    ],
  },
};

// ── Controls bar ──────────────────────────────────────────────────────────────

function ControlBar() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const btn: React.CSSProperties = {
    fontFamily: "var(--font-fauna)",
    fontSize: "0.6rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#78746c",
    background: "transparent",
    border: "1px solid #e8e8e8",
    borderRadius: "9999px",
    padding: "0.25rem 0.75rem",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        background: "#faf9f7",
        borderTop: "1px solid #e8e8e8",
        padding: "0.6rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-fauna)",
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          color: "#a8a49e",
          textTransform: "uppercase",
        }}
      >
        Scroll to zoom · Drag to pan
      </span>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button style={btn} onClick={() => zoomOut()}>−</button>
        <button style={btn} onClick={() => fitView({ duration: 300 })}>Reset</button>
        <button style={btn} onClick={() => zoomIn()}>+</button>
      </div>
    </div>
  );
}

// ── Canvas ────────────────────────────────────────────────────────────────────

function FlowCanvas({ id }: { id: string }) {
  const diagram = DIAGRAMS[id];
  const [nodes, , onNodesChange] = useNodesState(diagram?.nodes ?? []);
  const [edges, , onEdgesChange] = useEdgesState(diagram?.edges ?? []);

  return (
    <div style={{ height: 480, background: "#13161c" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
        proOptions={{ hideAttribution: true }}
        style={{ background: "#13161c" }}
      >
        <Background variant={BackgroundVariant.Dots} color="#1e222b" gap={24} size={1} />
      </ReactFlow>
    </div>
  );
}

// ── Public component ──────────────────────────────────────────────────────────

export default function FlowDiagram({ id }: { id: string }) {
  return (
    <div className="my-10" style={{ border: "1px solid #e8e8e8" }}>
      <ReactFlowProvider>
        <FlowCanvas id={id} />
        <ControlBar />
      </ReactFlowProvider>
    </div>
  );
}
