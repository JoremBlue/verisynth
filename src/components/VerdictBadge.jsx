export default function VerdictBadge({ label, size = "md" }) {
  if (!label) return null;
  const isFake = label === "FAKE";
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-6 py-2.5 text-lg font-bold tracking-wide",
  };
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizes[size]} ${
      isFake
        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
        : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
    }`}>
      {isFake ? "⚠ FAKE" : "✓ REAL"}
    </span>
  );
}