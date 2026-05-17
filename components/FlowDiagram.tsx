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
      <Handle type="target" position={Position.Left}   id="target-left"   style={HANDLE} />
      <Handle type="source" position={Position.Left}   id="source-left"   style={HANDLE} />
      <Handle type="target" position={Position.Right}  id="target-right"  style={HANDLE} />
      <Handle type="source" position={Position.Right}  id="source-right"  style={HANDLE} />
      <Handle type="target" position={Position.Top}    id="target-top"    style={HANDLE} />
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

function NoteNode({ data }: { data: { text: string } }) {
  return (
    <>
      <Handle type="source" position={Position.Right}  id="right"  style={HANDLE} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={HANDLE} />
      <div
        style={{
          background: "#faf9f7",
          border: "1px solid #e0ddd7",
          borderRadius: "4px",
          padding: "8px 11px",
          maxWidth: 165,
          boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-fauna)",
            fontSize: "0.44rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#a8a49e",
            marginBottom: 5,
          }}
        >
          Note
        </div>
        <div
          style={{
            fontFamily: "var(--font-fauna)",
            fontSize: "0.62rem",
            lineHeight: 1.55,
            color: "#5c574f",
          }}
        >
          {data.text}
        </div>
      </div>
    </>
  );
}

const nodeTypes: NodeTypes = {
  group:   GroupNode,
  service: ServiceNode,
  hub:     HubNode,
  note:    NoteNode,
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
      // Notes
      {
        id: "note-raz",
        type: "note",
        position: { x: -205, y: 148 },
        data: { text: "Each webhook is HMAC-SHA256 verified before any order update fires." },
      },
      {
        id: "note-hub",
        type: "note",
        position: { x: 218, y: -100 },
        data: { text: "11 active workflows — every event resolved in under 30 seconds." },
      },
      {
        id: "note-woo",
        type: "note",
        position: { x: -205, y: 50 },
        data: { text: "Stock synced at Supabase count minus a safety buffer — prevents overselling during update lag." },
      },
      {
        id: "note-data",
        type: "note",
        position: { x: 660, y: 390 },
        data: { text: "Daily cron cross-checks every Razorpay transaction against the ops sheet. Missing entries are auto-flagged." },
      },
    ],
    edges: [
      // Annotation edges (dashed, no arrow)
      {
        id: "e-note-raz",
        source: "note-raz", sourceHandle: "right",
        target: "RAZ",      targetHandle: "target-left",
        type: "straight",
        style: { stroke: "#3a3f4a", strokeWidth: 1, strokeDasharray: "4 4" },
        markerEnd: undefined,
      },
      {
        id: "e-note-hub",
        source: "note-hub", sourceHandle: "bottom",
        target: "N8N",      targetHandle: "target-top",
        type: "straight",
        style: { stroke: "#3a3f4a", strokeWidth: 1, strokeDasharray: "4 4" },
        markerEnd: undefined,
      },
      {
        id: "e-note-woo",
        source: "note-woo", sourceHandle: "right",
        target: "WOO",      targetHandle: "target-left",
        type: "straight",
        style: { stroke: "#3a3f4a", strokeWidth: 1, strokeDasharray: "4 4" },
        markerEnd: undefined,
      },
      {
        id: "e-note-data",
        source: "note-data", sourceHandle: "right",
        target: "SHEETS",   targetHandle: "target-right",
        type: "straight",
        style: { stroke: "#3a3f4a", strokeWidth: 1, strokeDasharray: "4 4" },
        markerEnd: undefined,
      },
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

  "order-lifecycle": {
    nodes: [
      { id: 'stage1', type: 'group', data: { label: 'Stage 1 — Order Placed' }, position: { x: 50, y: 50 }, style: { width: 700, height: 160, background: '#0d1117', border: '1px dashed #21262d', borderRadius: '8px' } },
      { id: 'stage2', type: 'group', data: { label: 'Stage 2 — Payment' }, position: { x: 50, y: 270 }, style: { width: 700, height: 230, background: '#0d1117', border: '1px dashed #21262d', borderRadius: '8px' } },
      { id: 'stage3', type: 'group', data: { label: 'Stage 3 — COD Confirmation (prepaid orders skip this)' }, position: { x: 50, y: 560 }, style: { width: 700, height: 220, background: '#0d1117', border: '1px dashed #21262d', borderRadius: '8px' } },
      { id: 'stage4', type: 'group', data: { label: 'Stage 4 — Fulfillment' }, position: { x: 50, y: 840 }, style: { width: 700, height: 270, background: '#0d1117', border: '1px dashed #21262d', borderRadius: '8px' } },
      { id: 'stage5', type: 'group', data: { label: 'Stage 5 — Daily Reconciliation (runs automatically every night)' }, position: { x: 50, y: 1170 }, style: { width: 700, height: 160, background: '#0d1117', border: '1px dashed #21262d', borderRadius: '8px' } },
      // Stage 1
      { id: 'A1', parentId: 'stage1', extent: 'parent', data: { label: 'WooCommerce\nOrder Placed' }, position: { x: 30, y: 55 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'B1', parentId: 'stage1', extent: 'parent', data: { label: 'n8n\nOrchestration Layer' }, position: { x: 260, y: 50 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 180, padding: '12px', textAlign: 'center', borderRadius: 4, fontSize: '12px' } },
      { id: 'C1', parentId: 'stage1', extent: 'parent', data: { label: 'Tag customer\nLog to Ops Sheet' }, position: { x: 490, y: 55 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      // Stage 2
      { id: 'A2', parentId: 'stage2', extent: 'parent', data: { label: 'Razorpay\nPayment Webhook' }, position: { x: 30, y: 80 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'B2', parentId: 'stage2', extent: 'parent', data: { label: 'n8n\nVerify + Calculate' }, position: { x: 260, y: 75 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 180, padding: '12px', textAlign: 'center', borderRadius: 4, fontSize: '12px' } },
      { id: 'C2_pass', parentId: 'stage2', extent: 'parent', data: { label: 'Log fees + Send\nWhatsApp confirmation' }, position: { x: 490, y: 50 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'C2_fail', parentId: 'stage2', extent: 'parent', data: { label: 'WhatsApp\nRetry Message' }, position: { x: 490, y: 145 }, style: { background: '#2d1a22', border: '1px solid #f43f5e', color: '#fda4af', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      // Stage 3
      { id: 'A3', parentId: 'stage3', extent: 'parent', data: { label: 'n8n sends\nWhatsApp confirm link' }, position: { x: 30, y: 75 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'B3', parentId: 'stage3', extent: 'parent', data: { label: 'n8n runs\n4 security checks' }, position: { x: 260, y: 75 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'C3_pass', parentId: 'stage3', extent: 'parent', data: { label: 'Confirmed\n→ To Fulfillment' }, position: { x: 490, y: 45 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'C3_fail', parentId: 'stage3', extent: 'parent', data: { label: 'No response / fail\nAuto-cancel after 3 days' }, position: { x: 490, y: 140 }, style: { background: '#2d1a22', border: '1px solid #f43f5e', color: '#fda4af', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      // Stage 4
      { id: 'A4', parentId: 'stage4', extent: 'parent', data: { label: 'Shiprocket\nStatus Webhooks' }, position: { x: 30, y: 100 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'B4', parentId: 'stage4', extent: 'parent', data: { label: 'n8n\nStatus Router' }, position: { x: 260, y: 95 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 180, padding: '12px', textAlign: 'center', borderRadius: 4, fontSize: '12px' } },
      { id: 'C4_pickup', parentId: 'stage4', extent: 'parent', data: { label: 'WhatsApp\nPickup notification' }, position: { x: 490, y: 30 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'C4_delivery', parentId: 'stage4', extent: 'parent', data: { label: 'WhatsApp\nOut for delivery' }, position: { x: 490, y: 100 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'C4_delivered', parentId: 'stage4', extent: 'parent', data: { label: 'Mark COD paid\n+ Schedule review' }, position: { x: 490, y: 170 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'C4_rto', parentId: 'stage4', extent: 'parent', data: { label: 'Telegram\nInstant RTO alert' }, position: { x: 490, y: 210 }, style: { background: '#2d1a22', border: '1px solid #f43f5e', color: '#fda4af', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      // Stage 5
      { id: 'A5', parentId: 'stage5', extent: 'parent', data: { label: 'Cron trigger\nDaily schedule' }, position: { x: 30, y: 55 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'B5', parentId: 'stage5', extent: 'parent', data: { label: 'n8n pulls Razorpay\nvs Sheets ledger' }, position: { x: 260, y: 50 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
      { id: 'C5', parentId: 'stage5', extent: 'parent', data: { label: 'Flag gaps\nfor admin review' }, position: { x: 490, y: 55 }, style: { background: '#2d1a22', border: '1px solid #f43f5e', color: '#fda4af', width: 180, textAlign: 'center', borderRadius: 4, padding: '8px 12px', fontSize: '12px' } },
    ],
    edges: [
      { id: 'e-A1-B1', source: 'A1', target: 'B1', label: 'order.created', style: { stroke: '#8b949e' }, labelStyle: { fill: '#8b949e', fontSize: 10 } },
      { id: 'e-B1-C1', source: 'B1', target: 'C1', style: { stroke: '#8b949e' } },
      { id: 'e-A2-B2', source: 'A2', target: 'B2', label: 'HMAC verified', style: { stroke: '#8b949e' }, labelStyle: { fill: '#8b949e', fontSize: 10 } },
      { id: 'e-B2-C2pass', source: 'B2', target: 'C2_pass', label: 'Pass', style: { stroke: '#8b949e' }, labelStyle: { fill: '#8b949e', fontSize: 10 } },
      { id: 'e-B2-C2fail', source: 'B2', target: 'C2_fail', label: 'Fail', style: { stroke: '#f43f5e' }, labelStyle: { fill: '#f43f5e', fontSize: 10 } },
      { id: 'e-A3-B3', source: 'A3', target: 'B3', label: 'customer taps link', style: { stroke: '#8b949e' }, labelStyle: { fill: '#8b949e', fontSize: 10 } },
      { id: 'e-B3-C3pass', source: 'B3', target: 'C3_pass', label: 'All 4 pass', style: { stroke: '#8b949e' }, labelStyle: { fill: '#8b949e', fontSize: 10 } },
      { id: 'e-B3-C3fail', source: 'B3', target: 'C3_fail', label: 'Any fail', style: { stroke: '#f43f5e' }, labelStyle: { fill: '#f43f5e', fontSize: 10 } },
      { id: 'e-A4-B4', source: 'A4', target: 'B4', label: 'status event', style: { stroke: '#8b949e' }, labelStyle: { fill: '#8b949e', fontSize: 10 } },
      { id: 'e-B4-pickup', source: 'B4', target: 'C4_pickup', label: 'Pickup', style: { stroke: '#8b949e' }, labelStyle: { fill: '#8b949e', fontSize: 10 } },
      { id: 'e-B4-delivery', source: 'B4', target: 'C4_delivery', label: 'Out for delivery', style: { stroke: '#8b949e' }, labelStyle: { fill: '#8b949e', fontSize: 10 } },
      { id: 'e-B4-delivered', source: 'B4', target: 'C4_delivered', label: 'Delivered', style: { stroke: '#8b949e' }, labelStyle: { fill: '#8b949e', fontSize: 10 } },
      { id: 'e-B4-rto', source: 'B4', target: 'C4_rto', label: 'RTO', style: { stroke: '#f43f5e' }, labelStyle: { fill: '#f43f5e', fontSize: 10 } },
      { id: 'e-A5-B5', source: 'A5', target: 'B5', style: { stroke: '#8b949e' } },
      { id: 'e-B5-C5', source: 'B5', target: 'C5', label: 'gap found', style: { stroke: '#f43f5e' }, labelStyle: { fill: '#f43f5e', fontSize: 10 } },
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
    <div style={{ height: 480, background: "#13161c", position: "relative", zIndex: 10000, isolation: "isolate" }}>
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
