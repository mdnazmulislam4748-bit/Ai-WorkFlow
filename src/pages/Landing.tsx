import { motion } from "motion/react";
import { ArrowRight, Zap, Bot, Globe, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="text-neutral-950 w-5 h-5" />
            </div>
            AutoFlow AI
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-sm font-medium hover:text-white transition-colors">Log in</Link>
            <Link to="/auth" className="bg-emerald-500 text-neutral-950 px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold tracking-wider uppercase mb-6 border border-emerald-500/20">
              The Future of Work is Automated
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Build AI Agents & <br />
              <span className="text-emerald-500">Automate Everything.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              The all-in-one platform to build, deploy, and scale AI-powered workflows. Connect your favorite tools and let AI do the heavy lifting.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth" className="w-full sm:w-auto bg-emerald-500 text-neutral-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group">
                Start Building Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                View Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="w-6 h-6 text-emerald-500" />}
              title="AI Agent Builder"
              description="Create custom AI agents with specific personalities and knowledge bases to handle complex tasks."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-emerald-500" />}
              title="Visual Workflows"
              description="Drag and drop nodes to create powerful automation chains without writing a single line of code."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-emerald-500" />}
              title="API Integrations"
              description="Connect to thousands of apps via webhooks and native integrations to sync data across your stack."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-neutral-400">Choose the plan that fits your automation needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              plan="Free"
              price="0"
              features={["3 Workflows", "100 Executions/mo", "Basic AI Nodes", "Community Support"]}
            />
            <PricingCard
              plan="Pro"
              price="49"
              featured
              features={["Unlimited Workflows", "10,000 Executions/mo", "Advanced AI Agents", "Priority Support", "Custom Webhooks"]}
            />
            <PricingCard
              plan="Business"
              price="199"
              features={["Everything in Pro", "Unlimited Executions", "Team Collaboration", "API Access", "Dedicated Account Manager"]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Zap className="text-emerald-500 w-6 h-6" />
            AutoFlow AI
          </div>
          <div className="flex gap-8 text-sm text-neutral-500">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">GitHub</a>
          </div>
          <p className="text-sm text-neutral-600">© 2026 AutoFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-neutral-900 border border-white/5 hover:border-emerald-500/30 transition-colors">
      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}

function PricingCard({ plan, price, features, featured = false }: { plan: string, price: string, features: string[], featured?: boolean }) {
  return (
    <div className={`p-8 rounded-2xl border ${featured ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/5 bg-neutral-900'} relative overflow-hidden`}>
      {featured && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-neutral-950 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{plan}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-neutral-500 text-sm">/month</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-neutral-300">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        to="/auth"
        className={`w-full block text-center py-3 rounded-xl font-bold transition-all ${
          featured ? 'bg-emerald-500 text-neutral-950 hover:bg-emerald-400' : 'bg-white/5 hover:bg-white/10'
        }`}
      >
        Get Started
      </Link>
    </div>
  );
}
