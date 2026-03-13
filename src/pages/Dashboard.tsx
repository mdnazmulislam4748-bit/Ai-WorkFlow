import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Play, Settings, History, Bot, Zap, LayoutDashboard, LogOut, ChevronRight } from "lucide-react";

export default function Dashboard({ user }: { user: any }) {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const res = await fetch("/api/workflows", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setWorkflows(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const createWorkflow = async () => {
    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: "Untitled Workflow",
          description: "New automation workflow",
          nodes: [],
          edges: [],
        }),
      });
      const data = await res.json();
      navigate(`/editor/${data.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col">
        <div className="p-6 flex items-center gap-2 font-bold text-xl">
          <Zap className="text-emerald-500 w-6 h-6" />
          AutoFlow
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <SidebarLink icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active />
          <SidebarLink icon={<Bot className="w-4 h-4" />} label="AI Agents" />
          <SidebarLink icon={<History className="w-4 h-4" />} label="Executions" />
          <SidebarLink icon={<Settings className="w-4 h-4" />} label="Settings" />
        </nav>
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8">
          <h2 className="font-bold text-lg">Welcome back, {user?.name}</h2>
          <button
            onClick={createWorkflow}
            className="bg-emerald-500 text-neutral-950 px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Workflow
          </button>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard label="Total Workflows" value={workflows.length.toString()} icon={<Zap className="text-emerald-500" />} />
            <StatCard label="Total Executions" value="1,284" icon={<Play className="text-blue-500" />} />
            <StatCard label="Active Agents" value="2" icon={<Bot className="text-purple-500" />} />
          </div>

          <h3 className="text-xl font-bold mb-6">Your Workflows</h3>
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : workflows.length === 0 ? (
            <div className="text-center py-20 bg-neutral-900/50 rounded-2xl border border-dashed border-white/10">
              <Zap className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
              <p className="text-neutral-400">No workflows yet. Create your first one to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.map((w) => (
                <Link
                  key={w.id}
                  to={`/editor/${w.id}`}
                  className="group p-6 bg-neutral-900 border border-white/5 rounded-2xl hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-500" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold mb-1">{w.name}</h4>
                  <p className="text-sm text-neutral-500 line-clamp-2">{w.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center gap-3 px-4 py-2 w-full text-sm rounded-lg transition-all ${active ? 'bg-emerald-500/10 text-emerald-500' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}>
      {icon}
      {label}
    </button>
  );
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="p-6 bg-neutral-900 border border-white/5 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-neutral-400">{label}</span>
        <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
