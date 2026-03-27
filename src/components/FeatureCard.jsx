import { motion } from "framer-motion";

const colorMap = {
  blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

export default function FeatureCard({ icon: Icon, title, subtitle, description, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
    >
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="font-bold text-foreground text-lg mb-0.5">{title}</p>
      <p className="text-xs text-muted-foreground font-mono mb-3">{subtitle}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}