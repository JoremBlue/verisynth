import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Terminal } from "lucide-react";

const statusColors = {
  setup:   "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  backend: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  ml:      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  xai:     "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  docker:  "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
};

export default function ArchPhaseCard({ phase, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
          {index + 1}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-foreground">{phase.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[phase.status]}`}>
              {phase.phase}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{phase.description}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
              <div className="space-y-2">
                {phase.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className={step.startsWith("✅") ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-900 rounded-xl p-4 flex items-start gap-2">
                <Terminal className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <code className="text-xs text-slate-300 break-all">{phase.verify}</code>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}