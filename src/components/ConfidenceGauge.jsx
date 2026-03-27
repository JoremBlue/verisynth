import { motion } from "framer-motion";

export default function ConfidenceGauge({ score, label }) {
  const pct = (score || 0) * 100;
  const isFake = label === "FAKE";
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
        <motion.circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={isFake ? "#ef4444" : "#10b981"}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-medium text-muted-foreground">Score</span>
        <span className={`text-2xl font-bold ${isFake ? "text-red-500" : "text-emerald-500"}`}>
          {pct.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}