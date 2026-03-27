import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, Search, Filter, Clock, ChevronRight, Trash2 } from "lucide-react";
import VerdictBadge from "../components/VerdictBadge";
import StatusBadge from "../components/StatusBadge";

export default function History() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadHistory();
  }, []);

const loadHistory = async () => {
  setLoading(true);
  try {
    const res = await fetch("http://127.0.0.1:8000/analyses");
    const data = await res.json();

    setResults(data);
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
};
  const filtered = results.filter((r) => {
    const matchSearch = r.file_name?.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "fake" && r.label === "FAKE") ||
      (filter === "real" && r.label === "REAL") ||
      (filter === "pending" && r.processing_status !== "done");
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm">Analysis History</span>
          </div>
          <button onClick={loadHistory} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">Analysis History</h1>
          <p className="text-muted-foreground">All past video analyses</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {["all", "fake", "real", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No analyses found</p>
            <Link to="/" className="text-primary hover:underline text-sm mt-2 inline-block">Upload a video →</Link>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link to={`/analysis/${r.id}`}>
                  <div className="bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4 hover:border-primary/30 hover:shadow-sm transition-all">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{r.file_name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(r.created_date).toLocaleString()}
                      </p>
                    </div>
                    <StatusBadge status={r.processing_status} />
                    {r.label && <VerdictBadge label={r.label} size="sm" />}
                    {r.confidence_score != null && (
                      <span className="text-sm font-mono text-muted-foreground w-12 text-right">
                        {(r.confidence_score * 100).toFixed(0)}%
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}