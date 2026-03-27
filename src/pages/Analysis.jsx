import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, AlertTriangle, Film, Mic, Eye, Info, Download, RefreshCw } from "lucide-react";
import ModalityCard from "../components/ModalityCard";
import VerdictBadge from "../components/VerdictBadge";
import ConfidenceGauge from "../components/ConfidenceGauge";
import SpectrogramView from "../components/SpectrogramView";
import GradCamView from "../components/GradCamView";

export default function Analysis() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    loadResult();
  }, [id]);

  const loadResult = async () => {
  setLoading(true);
  try {
    const res = await fetch(`http://127.0.0.1:8000/analysis/${id}`);
    const data = await res.json();

    if (data && !data.error) {
      setResult(data);
    } else {
      setResult(null);
    }
  } catch (err) {
    console.error(err);
    setResult(null);
  }
  setLoading(false);
};

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Analysis Not Found</h2>
          <p className="text-muted-foreground mb-4">This analysis ID does not exist or has been removed.</p>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const isFake = result.label === "FAKE";
  const modalities = [
    { key: "video", label: "Video (ViT)", icon: Film, score: result.video_score, weight: "40%", color: "blue" },
    { key: "audio", label: "Audio (Wav2Vec2)", icon: Mic, score: result.audio_score, weight: "30%", color: "purple" },
    { key: "scene", label: "Scene Physics", icon: Eye, score: result.scene_score, weight: "30%", color: "emerald" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm">DeepfakeGuard</span>
          </div>
          <button
            onClick={loadResult}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* File Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-sm text-muted-foreground mb-1">Analysis ID: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{result.id}</code></p>
          <h1 className="text-2xl font-bold text-foreground">{result.file_name}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Uploaded {new Date(result.created_date).toLocaleString()}
          </p>
        </motion.div>

        {/* Verdict + Confidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className={`rounded-2xl border-2 p-8 flex flex-col items-center justify-center gap-4
            ${isFake
              ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
              : "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800"
            }`}
          >
            <VerdictBadge label={result.label} size="lg" />
            <div className="text-center">
              <p className="font-semibold text-lg text-foreground">
                {isFake ? "AI-Generated Content Detected" : "Likely Authentic Content"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isFake
                  ? "This media shows strong indicators of synthetic generation or manipulation."
                  : "This media does not show significant signs of AI generation."}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 flex flex-col items-center justify-center gap-4">
            <ConfidenceGauge score={result.confidence_score} label={result.label} />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{(result.confidence_score * 100).toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Confidence Score</p>
              <p className="text-xs text-muted-foreground mt-1">Threshold: θ = 0.68</p>
            </div>
          </div>
        </motion.div>

        {/* Modality Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-foreground">Modality Breakdown</h2>
            <div className="group relative">
              <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              <div className="absolute left-6 top-0 w-64 bg-popover border border-border rounded-lg p-3 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
                Each modality independently scores the media. Final score = 0.4×Video + 0.3×Audio + 0.3×Scene
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {modalities.map((m, i) => (
              <ModalityCard key={m.key} {...m} delay={0.1 * i} />
            ))}
          </div>
        </motion.div>

        {/* Fusion Score Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 bg-card border border-border rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-foreground mb-4">Fusion Score Decomposition</h2>
          <div className="space-y-3">
            {modalities.map((m) => (
              <div key={m.key} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-36">{m.label}</span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(m.score || 0) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={`h-full rounded-full ${
                      m.color === "blue" ? "bg-blue-500" :
                      m.color === "purple" ? "bg-purple-500" : "bg-emerald-500"
                    }`}
                  />
                </div>
                <span className="text-sm font-mono w-12 text-right text-foreground">
                  {((m.score || 0) * 100).toFixed(1)}%
                </span>
                <span className="text-xs text-muted-foreground w-8">{m.weight}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex items-center gap-4">
              <span className="text-sm font-bold text-foreground w-36">Final Score</span>
              <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(result.confidence_score || 0) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className={`h-full rounded-full ${isFake ? "bg-red-500" : "bg-emerald-500"}`}
                />
              </div>
              <span className="text-sm font-mono font-bold w-12 text-right text-foreground">
                {((result.confidence_score || 0) * 100).toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground w-8">100%</span>
            </div>
          </div>
        </motion.div>

        {/* Explainability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-foreground mb-4">Explainability Outputs (XAI)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <GradCamView imageUrl={result.gradcam_image_url} />
            <SpectrogramView imageUrl={result.spectrogram_image_url} />
          </div>
        </motion.div>

        {/* Raw JSON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Raw Analysis Data</h2>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `deepfakeguard-${result.id}.json`;
                a.click();
              }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>
          </div>
          <pre className="bg-muted rounded-xl p-4 text-xs overflow-auto max-h-64 text-muted-foreground">
            {JSON.stringify({
              id: result.id,
              file_name: result.file_name,
              label: result.label,
              confidence_score: result.confidence_score,
              video_score: result.video_score,
              audio_score: result.audio_score,
              scene_score: result.scene_score,
              processing_status: result.processing_status,
              created_date: result.created_date,
            }, null, 2)}
          </pre>
        </motion.div>
      </div>
    </div>
  );
}