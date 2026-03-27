import { Folder, FileCode, FileText, Settings } from "lucide-react";

const tree = [
  { type: "dir", name: "VeriSynth/", depth: 0 },
  { type: "dir", name: "backend/", depth: 1 },
  { type: "dir", name: "app/", depth: 2 },
  { type: "file", name: "main.py", depth: 3, desc: "FastAPI app + upload + result endpoints" },
  { type: "file", name: "models.py", depth: 3, desc: "SQLAlchemy ORM: AnalysisResult table" },
  { type: "file", name: "schemas.py", depth: 3, desc: "Pydantic request/response schemas" },
  { type: "file", name: "database.py", depth: 3, desc: "SQLAlchemy engine + session" },
  { type: "dir", name: "core/", depth: 3 },
  { type: "file", name: "config.py", depth: 4, desc: "Settings from .env" },
  { type: "file", name: "security.py", depth: 4, desc: "JWT/auth utilities (optional)" },
  { type: "dir", name: "ml/", depth: 2 },
  { type: "file", name: "__init__.py", depth: 3, desc: "" },
  { type: "file", name: "architecture.py", depth: 3, desc: "ViTDeepfakeDetector, Wav2Vec2AudioDetector, ScenePhysicsAnalyzer, FusionEngine" },
  { type: "file", name: "pipeline.py", depth: 3, desc: "MultimodalPipeline.run() — full E2E processing" },
  { type: "file", name: "xai.py", depth: 3, desc: "GradCAMExplainer, generate_spectrogram()" },
  { type: "file", name: "train.py", depth: 3, desc: "ViT training script with FaceForensics++ / DFDC" },
  { type: "file", name: "requirements.txt", depth: 2, desc: "All Python dependencies" },
  { type: "file", name: "Dockerfile", depth: 2, desc: "Backend container" },
  { type: "dir", name: "frontend/", depth: 1 },
  { type: "dir", name: "src/pages/", depth: 2 },
  { type: "file", name: "index.js", depth: 3, desc: "Upload UI + hero" },
  { type: "file", name: "analysis/[id].js", depth: 3, desc: "Results dashboard" },
  { type: "file", name: "package.json", depth: 2, desc: "Next.js + dependencies" },
  { type: "file", name: "Dockerfile", depth: 2, desc: "Frontend container" },
  { type: "file", name: "docker-compose.yml", depth: 0, desc: "Orchestrates backend + frontend + PostgreSQL" },
  { type: "file", name: ".env", depth: 0, desc: "DATABASE_URL, SECRET_KEY, etc." },
];

export default function FileTreeView() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm overflow-auto">
      {tree.map((item, i) => {
        const indent = item.depth * 20;
        const isDir = item.type === "dir";
        const Icon = isDir ? Folder : item.name.endsWith(".py") ? FileCode : item.name.endsWith(".yml") || item.name.endsWith(".json") ? Settings : FileText;
        const color = isDir ? "text-amber-400" : item.name.endsWith(".py") ? "text-blue-400" : "text-slate-400";

        return (
          <div key={i} className="flex items-baseline gap-2 py-0.5" style={{ paddingLeft: indent }}>
            <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${color} mt-px`} />
            <span className={color}>{item.name}</span>
            {item.desc && <span className="text-slate-600 text-xs"># {item.desc}</span>}
          </div>
        );
      })}
    </div>
  );
}