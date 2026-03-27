import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Film, X, Loader2, AlertCircle } from "lucide-react";

const ALLOWED = ["video/mp4", "video/x-msvideo", "video/quicktime"];
const ALLOWED_EXT = [".mp4", ".avi", ".mov"];

export default function UploadZone({ onUploadComplete }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const validateFile = (f) => {
    if (!f) return "No file selected";
    const ext = "." + f.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) return `File type not supported. Use: ${ALLOWED_EXT.join(", ")}`;
    if (f.size > 500 * 1024 * 1024) return "File exceeds 500 MB limit";
    return null;
  };

  const handleFile = (f) => {
    const err = validateFile(f);
    if (err) { setError(err); return; }
    setError(null);
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
  if (!file) return;

  setUploading(true);
  setError(null);

  try {
    const formData = new FormData();
    formData.append("file", file);

    // 1. Upload file to YOUR backend
    const uploadRes = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();
    const jobId = uploadData.job_id;

    // 2. Fetch result (since we simulate instant processing)
    const resultRes = await fetch(`http://127.0.0.1:8000/analysis/${jobId}`);
    const result = await resultRes.json();

    console.log("Analysis Result:", result);

    setUploading(false);

    // 3. Send result to parent (VERY IMPORTANT)
    onUploadComplete(jobId, result);

  } catch (err) {
    console.error(err);
    setError("Upload failed. Please try again.");
    setUploading(false);
  }
};

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
              dragging
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".mp4,.avi,.mov"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground mb-1">Drop your video here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <div className="flex items-center justify-center gap-2">
              {ALLOWED_EXT.map((ext) => (
                <span key={ext} className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground font-mono">{ext}</span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Max 500 MB</p>
          </motion.div>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Film className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 mb-6 text-sm text-muted-foreground space-y-1">
              <p>🎬 <strong>Video:</strong> Vision Transformer (ViT) — 40% weight</p>
              <p>🎙️ <strong>Audio:</strong> Wav2Vec2 — 30% weight</p>
              <p>🌊 <strong>Scene:</strong> Optical Flow — 30% weight</p>
              <p className="pt-1 border-t border-border">Threshold θ = 0.68 → FAKE / REAL</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {uploading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Uploading & Starting Analysis...</>
              ) : (
                <><Upload className="w-4 h-4" /> Start Multimodal Analysis</>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </motion.div>
      )}
    </div>
  );
}