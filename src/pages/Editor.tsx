import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Save, Play, ArrowLeft, Plus, Trash2, Settings } from "lucide-react";

const initialNodes: any[] = [];
const initialEdges: any[] = [];

const nodeTypes = {
  // custom node types would go here
};

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [name, setName] = useState("Untitled Workflow");
  const [saving, setSaving] = useState(false);
  const [executing, setExecuting] = useState(false);

  useEffect(() => {
    fetchWorkflow();
  }, [id]);

  const fetchWorkflow = async () => {
    try {
      const res = await fetch(`/api/workflows`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const workflows = await res.json();
      const workflow = workflows.find((w: any) => w.id === id);
      if (workflow) {
        setName(workflow.name);
        setNodes(workflow.nodes.map((n: any) => ({
          id: n.id,
          type: n.type,
          position: { x: n.positionX, y: n.positionY },
          data: JSON.parse(n.data),
        })));
        setEdges(workflow.edges.map((e: any) => ({
          id: e.id,
          source: e.source,
          target: e.target,
        })));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const saveWorkflow = async () => {
    setSaving(true);
    try {
      // In a real app, this would be a PUT request to update
      // For this demo, we'll just simulate it
      console.log("Saving workflow:", { nodes, edges });
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const executeWorkflow = async () => {
    setExecuting(true);
    try {
      const res = await fetch(`/api/execute/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      alert(`Workflow executed! Result: ${JSON.stringify(data.results)}`);
    } catch (e) {
      console.error(e);
    } finally {
      setExecuting(false);
    }
  };

  const addNode = (type: string) => {
    const newNode = {
      id: `node_${Date.now()}`,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: type, prompt: "" },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="h-screen w-screen bg-neutral-950 flex flex-col">
      {/* Editor Header */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-neutral-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4 text-neutral-400" />
          </button>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-none font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={saveWorkflow}
            disabled={saving}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={executeWorkflow}
            disabled={executing}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-neutral-950 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-all"
          >
            <Play className="w-4 h-4" />
            {executing ? "Running..." : "Run"}
          </button>
        </div>
      </header>

      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          colorMode="dark"
        >
          <Background color="#333" gap={20} />
          <Controls />
          <MiniMap nodeStrokeColor="#10b981" nodeColor="#10b98122" maskColor="#00000088" />
          
          <Panel position="top-right" className="bg-neutral-900/80 border border-white/5 p-4 rounded-xl backdrop-blur-md w-64">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">Add Nodes</h3>
            <div className="grid grid-cols-1 gap-2">
              <NodeButton onClick={() => addNode("webhook")} label="Webhook Trigger" />
              <NodeButton onClick={() => addNode("aiPrompt")} label="AI Prompt" />
              <NodeButton onClick={() => addNode("httpRequest")} label="HTTP Request" />
              <NodeButton onClick={() => addNode("delay")} label="Delay" />
              <NodeButton onClick={() => addNode("condition")} label="Condition" />
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

function NodeButton({ onClick, label }: { onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 bg-neutral-800 border border-white/5 rounded-lg text-xs font-medium hover:border-emerald-500/50 transition-all text-left"
    >
      <Plus className="w-3 h-3 text-emerald-500" />
      {label}
    </button>
  );
}
