import { Zap, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "The Future of AI Automation in 2026",
    excerpt: "Discover how AI agents are transforming the way we build and scale businesses.",
    date: "March 10, 2026",
    author: "Alex Rivera",
    category: "AI Trends",
    slug: "future-of-ai-automation",
    image: "https://picsum.photos/seed/ai/800/400"
  },
  {
    id: 2,
    title: "10 Workflows to Save 20 Hours a Week",
    excerpt: "Learn the most effective automation patterns used by high-performance teams.",
    date: "March 8, 2026",
    author: "Sarah Chen",
    category: "Productivity",
    slug: "save-20-hours-a-week",
    image: "https://picsum.photos/seed/productivity/800/400"
  },
  {
    id: 3,
    title: "Building Your First AI Agent: A Guide",
    excerpt: "A step-by-step tutorial on creating and deploying your first custom AI agent.",
    date: "March 5, 2026",
    author: "James Wilson",
    category: "Tutorials",
    slug: "building-first-ai-agent",
    image: "https://picsum.photos/seed/tutorial/800/400"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <nav className="border-b border-white/5 h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Zap className="text-emerald-500 w-6 h-6" />
          AutoFlow
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-neutral-400 hover:text-white">Home</Link>
          <Link to="/auth" className="bg-emerald-500 text-neutral-950 px-4 py-2 rounded-lg text-sm font-bold">Sign Up</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">Insights on AI & <span className="text-emerald-500">Automation.</span></h1>
          <p className="text-neutral-400 text-xl leading-relaxed">
            Expert advice, tutorials, and industry trends to help you master the art of automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((p) => (
            <article key={p.id} className="group cursor-pointer">
              <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-6 border border-white/5">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">
                <span>{p.category}</span>
                <span className="w-1 h-1 bg-neutral-700 rounded-full"></span>
                <span className="text-neutral-500">{p.date}</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 group-hover:text-emerald-500 transition-colors leading-snug">
                {p.title}
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-6 line-clamp-2">
                {p.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <User className="w-4 h-4" />
                  {p.author}
                </div>
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
