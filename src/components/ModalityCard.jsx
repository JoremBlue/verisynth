import { motion } from "framer-motion";

const colorMap = {
  blue: { bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-200 dark:border-blue-800", bar: "bg-blue-500", text: "text-blue-600 dark:text-blue-400" },
  purple: { bg: "bg-purple-50 dark:bg-purple-950/20", border: "border-purple-200 dark:border-purple-800", bar: "bg-purple-500", text: "text-purple-600 dark:text-purple-400" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800", bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
};

export default function ModalityCard({ icon: Icon, label, score, weight, color, delay = 0 }) {
  const c = colorMap[color];
  const pct = score != null ? (score * 100).toFixed(1) : "—";
  const isFake = score != null && score > 0.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-2xl border-2 p-5 ${c.bg} ${c.border}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${c.text}`} />
        <span className="font-semibold text-sm text-foreground">{label}</span>
        <span className="ml-auto text-xs text-muted-foreground">{weight}</span>
      </div>
      <p className={`text-3xl font-bold mb-1 ${c.text}`}>{pct}{score != null ? "%" : ""}</p>
      <p className="text-xs text-muted-foreground mb-3">
        {score == null ? "Not processed" : isFake ? "Likely AI-generated" : "Likely authentic"}
      </p>
      {score != null && (
        <div className="h-2 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score * 100}%` }}
            transition={{ duration: 0.7, delay: delay + 0.2 }}
            className={`h-full rounded-full ${c.bar}`}
          />
        </div>
      )}
    </motion.div>
  );
}