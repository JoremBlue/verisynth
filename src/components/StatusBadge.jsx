import { Loader2, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const config = {
  pending:    { label: "Pending",    icon: Clock,         class: "bg-muted text-muted-foreground" },
  processing: { label: "Processing", icon: Loader2,       class: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", spin: true },
  done:       { label: "Done",       icon: CheckCircle2,  class: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" },
  failed:     { label: "Failed",     icon: AlertCircle,   class: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" },
};

export default function StatusBadge({ status }) {
  const c = config[status] || config.pending;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.class}`}>
      <Icon className={`w-3 h-3 ${c.spin ? "animate-spin" : ""}`} />
      {c.label}
    </span>
  );
}