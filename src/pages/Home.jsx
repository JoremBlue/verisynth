import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Upload, Zap, Eye, Mic, Film, ChevronRight, AlertTriangle } from "lucide-react";
import UploadZone from "../components/UploadZone";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  const [analysisId, setAnalysisId] = useState(null);

  const handleUploadComplete = (id) => {
    setAnalysisId(id);
    setUploaded(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 25% 50%, hsl(var(--primary)) 0%, transparent 50%),
                            radial-gradient(circle at 75% 20%, hsl(217 91% 60%) 0%, transparent 40%)`
        }} />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm mb-8 backdrop-blur-sm">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Multimodal AI Detection System · Thesis Research
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-none">
              VeriSynth
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed font-light">
              Detect AI-generated video and audio using multimodal fusion of 
              Vision Transformers, Wav2Vec2, and Optical Flow analysis.
            </p>
            <p className="text-sm text-white/40 mb-12">
              Bonador, Jorem Blue · Cruz, Josh Yvan · New Era University — CCS431-18 Thesis
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#upload" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg">
                <Upload className="w-4 h-4" />
                Analyze a Video
              </a>
              <Link to="/architecture" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 backdrop-blur-sm">
                View Architecture
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold text-foreground mb-3">Three Detection Modalities</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Each modality independently scores the media, then fused via weighted decision logic</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Film}
            title="Video Analysis"
            subtitle="ViT · 40% weight"
            description="Vision Transformer processes 224×224 frames to detect facial artifacts, motion irregularities, and texture anomalies."
            color="blue"
            delay={0.1}
          />
          <FeatureCard
            icon={Mic}
            title="Audio Analysis"
            subtitle="Wav2Vec2 · 30% weight"
            description="Wav2Vec2 analyzes mel spectrograms to identify voice cloning, synthetic speech patterns, and vocoder artifacts."
            color="purple"
            delay={0.2}
          />
          <FeatureCard
            icon={Eye}
            title="Scene Physics"
            subtitle="Optical Flow · 30% weight"
            description="OpenCV Farneback optical flow measures motion consistency across frames, detecting physically implausible scene transitions."
            color="emerald"
            delay={0.3}
          />
        </div>
      </section>

      {/* Fusion Logic */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Fusion Engine</h2>
            <p className="text-muted-foreground">Weighted decision logic with θ = 0.68 classification threshold</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8 font-mono text-sm">
            <p className="text-muted-foreground mb-2"># Weighted fusion formula</p>
            <p className="text-foreground">final_score = <span className="text-blue-500">0.4</span> × video_score + <span className="text-purple-500">0.3</span> × audio_score + <span className="text-emerald-500">0.3</span> × scene_score</p>
            <br />
            <p className="text-muted-foreground"># Classification threshold</p>
            <p className="text-foreground"><span className="text-amber-500">if</span> final_score <span className="text-amber-500">&gt;</span> <span className="text-red-400">0.68</span>: label = <span className="text-red-400">"FAKE"</span></p>
            <p className="text-foreground"><span className="text-amber-500">else</span>: label = <span className="text-emerald-400">"REAL"</span></p>
          </div>
        </div>
      </section>

      {/* Upload */}
      <section id="upload" className="px-6 py-20 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Analyze Your Video</h2>
          <p className="text-muted-foreground">Upload an MP4, AVI, or MOV file to run full multimodal analysis</p>
        </div>

        {uploaded && analysisId ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-card border border-border rounded-2xl p-10"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Analysis Queued</h3>
            <p className="text-muted-foreground mb-6">Your video is being processed. Results will appear on the analysis page.</p>
            <Link
              to={`/analysis/${analysisId}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              View Results <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <UploadZone onUploadComplete={handleUploadComplete} />
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-4 h-4" />
          <span className="font-semibold text-foreground">VeriSynth</span>
        </div>
        <p>A Machine Learning-Based Detection System for AI-Generated Videos and Voice Using Multimodal Fusion</p>
        <p className="mt-1">New Era University · College of Informatics and Computing Studies · Computer Science Department</p>
      </footer>
    </div>
  );
}