import { Zap, Download, Search, Filter } from "lucide-react";

const templates = [
  { id: 1, name: "YouTube Automation", description: "Automatically generate scripts and titles for your videos.", category: "Content" },
  { id: 2, name: "Lead Generation", description: "Scrape websites and send personalized emails to leads.", category: "Sales" },
  { id: 3, name: "Social Media Manager", description: "Schedule posts across Twitter, LinkedIn, and Instagram.", category: "Marketing" },
  { id: 4, name: "Customer Support Bot", description: "Handle common support queries using AI agents.", category: "Support" },
  { id: 5, name: "E-commerce Sync", description: "Sync inventory between Shopify and Amazon.", category: "Operations" },
  { id: 6, name: "News Aggregator", description: "Summarize daily news and send it to your Slack.", category: "Utility" },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <nav className="border-b border-white/5 h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Zap className="text-emerald-500 w-6 h-6" />
          AutoFlow
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-neutral-400 hover:text-white">Sign In</button>
          <button className="bg-emerald-500 text-neutral-950 px-4 py-2 rounded-lg text-sm font-bold">Get Started</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Template Marketplace</h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Jumpstart your automation with pre-built templates designed by experts.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              placeholder="Search templates..."
              className="w-full bg-neutral-900 border border-white/5 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-white/5 rounded-xl hover:bg-neutral-800 transition-colors">
            <Filter className="w-4 h-4" />
            Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((t) => (
            <div key={t.id} className="group p-8 bg-neutral-900 border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all flex flex-col">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2 block">{t.category}</span>
                <h3 className="text-xl font-bold mb-3">{t.name}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8">{t.description}</p>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all">
                <Download className="w-4 h-4" />
                Import Template
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
