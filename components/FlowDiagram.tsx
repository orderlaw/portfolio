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
      // Stage containers (group type so they render as containers)
      { id: 'stage1', type: 'group', data: { label: 'Stage 1: Order Placed' }, position: { x: 50, y: 50 }, style: { width: 850, height: 200, background: '#0d1117', border: '1px dashed #21262d', borderRadius: '8px' } },
      { id: 'stage2', type: 'group', data: { label: 'Stage 2: Payment' }, position: { x: 50, y: 300 }, style: { width: 850, height: 260, background: '#0d1117', border: '1px dashed #21262d', borderRadius: '8px' } },
      { id: 'stage3', type: 'group', data: { label: 'Stage 3: COD Confirmation' }, position: { x: 50, y: 610 }, style: { width: 850, height: 260, background: '#0d1117', border: '1px dashed #21262d', borderRadius: '8px' } },
      { id: 'stage4', type: 'group', data: { label: 'Stage 4: Fulfillment Systems' }, position: { x: 50, y: 920 }, style: { width: 850, height: 290, background: '#0d1117', border: '1px dashed #21262d', borderRadius: '8px' } },
      { id: 'background_stage', type: 'group', data: { label: 'Stage 5 & 6: Infrastructure & Reconciliation' }, position: { x: 50, y: 1260 }, style: { width: 850, height: 200, background: '#0d1117', border: '1px dashed #21262d', borderRadius: '8px' } },
      // Stage 1 children
      { id: 'A1', parentId: 'stage1', extent: 'parent', data: { label: 'WooCommerce: Order Placed' }, position: { x: 30, y: 70 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'B1', parentId: 'stage1', extent: 'parent', data: { label: 'n8n Orchestration Layer' }, position: { x: 320, y: 65 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 200, padding: '12px', fontSize: '12px', borderRadius: 4 } },
      { id: 'C1', parentId: 'stage1', extent: 'parent', data: { label: 'Identify: New vs Returning' }, position: { x: 600, y: 40 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'D1', parentId: 'stage1', extent: 'parent', data: { label: 'Google Sheets: Ops Database' }, position: { x: 600, y: 110 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      // Stage 2 children
      { id: 'A2', parentId: 'stage2', extent: 'parent', data: { label: 'Razorpay: Payment Webhook' }, position: { x: 30, y: 60 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'B2', parentId: 'stage2', extent: 'parent', data: { label: 'n8n Security & Calculation' }, position: { x: 320, y: 55 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 200, padding: '12px', fontSize: '12px', borderRadius: 4 } },
      { id: 'C2', parentId: 'stage2', extent: 'parent', data: { label: 'Calculate: Platform Fees & GST' }, position: { x: 600, y: 30 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'D2', parentId: 'stage2', extent: 'parent', data: { label: 'Google Sheets: Settlements Sheet' }, position: { x: 600, y: 95 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'E2', parentId: 'stage2', extent: 'parent', data: { label: 'WhatsApp: Send Confirmation' }, position: { x: 600, y: 160 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'F2', parentId: 'stage2', extent: 'parent', data: { label: 'Payment Status Check' }, position: { x: 320, y: 175 }, style: { background: '#2d1a22', border: '1px solid #f43f5e', color: '#fda4af', width: 200, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'G2', parentId: 'stage2', extent: 'parent', data: { label: 'WhatsApp: Immediate Retry Message' }, position: { x: 30, y: 175 }, style: { background: '#2d1a22', border: '1px solid #f43f5e', color: '#fda4af', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      // Stage 3 children
      { id: 'A3', parentId: 'stage3', extent: 'parent', data: { label: 'n8n: Dispatch Verification Link' }, position: { x: 30, y: 50 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'B3', parentId: 'stage3', extent: 'parent', data: { label: 'WhatsApp: Confirm / Cancel Buttons' }, position: { x: 320, y: 50 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 200, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'C3', parentId: 'stage3', extent: 'parent', data: { label: 'n8n: Security Screening Engine' }, position: { x: 600, y: 50 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'D3', parentId: 'stage3', extent: 'parent', data: { label: '1. Duplicate Check · 2. Expiry Token · 3. Token Match · 4. Phone Auth' }, position: { x: 600, y: 130 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '11px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'E3', parentId: 'stage3', extent: 'parent', data: { label: 'Status: Confirmed → To Fulfillment' }, position: { x: 320, y: 190 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 200, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'F3', parentId: 'stage3', extent: 'parent', data: { label: 'Auto-Cancel after 3 Days' }, position: { x: 30, y: 190 }, style: { background: '#2d1a22', border: '1px solid #f43f5e', color: '#fda4af', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      // Stage 4 children
      { id: 'A4', parentId: 'stage4', extent: 'parent', data: { label: 'Shiprocket Logistics Webhooks' }, position: { x: 30, y: 110 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'B4', parentId: 'stage4', extent: 'parent', data: { label: 'n8n: Status Router' }, position: { x: 320, y: 105 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 200, padding: '12px', fontSize: '12px', borderRadius: 4 } },
      { id: 'C4', parentId: 'stage4', extent: 'parent', data: { label: 'WhatsApp: Dispatched Alert' }, position: { x: 600, y: 30 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'D4', parentId: 'stage4', extent: 'parent', data: { label: 'WhatsApp: Out for Delivery Alert' }, position: { x: 600, y: 90 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'E4', parentId: 'stage4', extent: 'parent', data: { label: 'Mark COD Paid + Review Request (3d)' }, position: { x: 600, y: 150 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'F4', parentId: 'stage4', extent: 'parent', data: { label: 'Telegram: Instant Admin Alert' }, position: { x: 600, y: 210 }, style: { background: '#2d1a22', border: '1px solid #f43f5e', color: '#fda4af', width: 220, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      // Stage 5 & 6 children
      { id: 'I1', parentId: 'background_stage', extent: 'parent', data: { label: 'Redis Cache' }, position: { x: 30, y: 50 }, style: { background: '#16202c', border: '1px solid #0ea5e9', color: '#7dd3fc', width: 150, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'I2', parentId: 'background_stage', extent: 'parent', data: { label: 'Supabase DB' }, position: { x: 30, y: 120 }, style: { background: '#16202c', border: '1px solid #0ea5e9', color: '#7dd3fc', width: 150, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'R1', parentId: 'background_stage', extent: 'parent', data: { label: 'Cron Trigger: Daily Schedule' }, position: { x: 240, y: 80 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 160, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'R2', parentId: 'background_stage', extent: 'parent', data: { label: 'n8n: Reconciliation Engine' }, position: { x: 440, y: 75 }, style: { background: '#1e1e24', border: '1.5px solid #d97706', color: '#f59e0b', fontWeight: 'bold', width: 160, fontSize: '12px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'R3', parentId: 'background_stage', extent: 'parent', data: { label: 'Razorpay Transaction Logs' }, position: { x: 660, y: 35 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 160, fontSize: '11px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'R4', parentId: 'background_stage', extent: 'parent', data: { label: 'Google Sheets Ledger' }, position: { x: 660, y: 90 }, style: { background: '#14171c', border: '1px solid #30363d', color: '#e6edf3', width: 160, fontSize: '11px', borderRadius: 4, padding: '8px 12px' } },
      { id: 'R5', parentId: 'background_stage', extent: 'parent', data: { label: 'Flag Records For Admin Review' }, position: { x: 660, y: 145 }, style: { background: '#2d1a22', border: '1px solid #f43f5e', color: '#fda4af', width: 160, fontSize: '11px', borderRadius: 4, padding: '8px 12px' } },
    ],
    edges: [
      { id: 'e-A1-B1', source: 'A1', target: 'B1', label: 'order.created webhook', style: { stroke: '#8b949e' } },
      { id: 'e-B1-C1', source: 'B1', target: 'C1', label: '1. Check Tag', style: { stroke: '#8b949e' } },
      { id: 'e-B1-D1', source: 'B1', target: 'D1', label: '2. Log Order', style: { stroke: '#8b949e' } },
      { id: 'e-A2-B2', source: 'A2', target: 'B2', label: 'HMAC-SHA256 Sig', style: { stroke: '#8b949e' } },
      { id: 'e-B2-C2', source: 'B2', target: 'C2', label: 'Pass', style: { stroke: '#8b949e' } },
      { id: 'e-C2-D2', source: 'C2', target: 'D2', style: { stroke: '#8b949e' } },
      { id: 'e-D2-E2', source: 'D2', target: 'E2', label: 'Trigger API', style: { stroke: '#8b949e' } },
      { id: 'e-B2-F2', source: 'B2', target: 'F2', label: 'Fail', style: { stroke: '#f43f5e' } },
      { id: 'e-F2-G2', source: 'F2', target: 'G2', label: 'Failed', style: { stroke: '#f43f5e' } },
      { id: 'e-B1-A3', source: 'B1', target: 'A3', label: 'If COD', animated: true, style: { stroke: '#d97706', strokeDasharray: '5 5' } },
      { id: 'e-A3-B3', source: 'A3', target: 'B3', label: 'Interactive Link', style: { stroke: '#8b949e' } },
      { id: 'e-B3-C3', source: 'B3', target: 'C3', label: 'User Action', style: { stroke: '#8b949e' } },
      { id: 'e-C3-D3', source: 'C3', target: 'D3', label: 'Run Screening', style: { stroke: '#8b949e' } },
      { id: 'e-D3-E3', source: 'D3', target: 'E3', label: 'Pass', style: { stroke: '#8b949e' } },
      { id: 'e-D3-F3', source: 'D3', target: 'F3', label: 'Fail / No Response', style: { stroke: '#f43f5e' } },
      { id: 'e-E3-A4', source: 'E3', target: 'A4', style: { stroke: '#8b949e' } },
      { id: 'e-E2-A4', source: 'E2', target: 'A4', style: { stroke: '#8b949e' } },
      { id: 'e-A4-B4', source: 'A4', target: 'B4', label: 'Shipping Events', style: { stroke: '#8b949e' } },
      { id: 'e-B4-C4', source: 'B4', target: 'C4', label: 'Pickup', style: { stroke: '#8b949e' } },
      { id: 'e-B4-D4', source: 'B4', target: 'D4', label: 'Out For Delivery', style: { stroke: '#8b949e' } },
      { id: 'e-B4-E4', source: 'B4', target: 'E4', label: 'Delivered', style: { stroke: '#8b949e' } },
      { id: 'e-B4-F4', source: 'B4', target: 'F4', label: 'RTO / Return', style: { stroke: '#f43f5e' } },
      { id: 'e-I1-I2', source: 'I1', target: 'I2', label: 'Deduplication', style: { stroke: '#0ea5e9' } },
      { id: 'e-I2-B4', source: 'I2', target: 'B4', label: 'Idempotency Lock', animated: true, style: { stroke: '#0ea5e9' } },
      { id: 'e-R1-R2', source: 'R1', target: 'R2', style: { stroke: '#8b949e' } },
      { id: 'e-R2-R3', source: 'R2', target: 'R3', label: 'Pull Receipts', style: { stroke: '#8b949e' } },
      { id: 'e-R2-R4', source: 'R2', target: 'R4', label: 'Cross Check', style: { stroke: '#8b949e' } },
      { id: 'e-R2-R5', source: 'R2', target: 'R5', label: 'Discrepancy', style: { stroke: '#f43f5e' } },
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
