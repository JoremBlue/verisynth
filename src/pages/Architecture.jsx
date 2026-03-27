import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Database, Cpu, Layers, GitBranch, Code2, Terminal, Package, Server } from "lucide-react";
import ArchPhaseCard from "../components/ArchPhaseCard";
import FileTreeView from "../components/FileTreeView";
import CodeBlock from "../components/CodeBlock";

export default function Architecture() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm">VeriSynth · Architecture</span>
          </div>
          <div />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Layers className="w-3 h-3" />
            System Architecture Documentation
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            VeriSynth — Full System Blueprint
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Complete architecture for local deployment. Each phase is independently runnable.
            Follow the phases in order, verifying each before proceeding to the next.
          </p>
        </motion.div>

        {/* Project Structure */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
          <SectionHeader icon={GitBranch} title="Project File Structure" />
          <FileTreeView />
        </motion.div>

        {/* Phases */}
        <div className="mb-12">
          <SectionHeader icon={Layers} title="Build Phases (Execute in Order)" />
          <div className="space-y-4">
            {PHASES.map((phase, i) => (
              <ArchPhaseCard key={i} phase={phase} index={i} />
            ))}
          </div>
        </div>

        {/* Backend Files */}
        <div className="mb-12">
          <SectionHeader icon={Server} title="Backend — Full Source Code" />
          <div className="space-y-6">
            {BACKEND_FILES.map((f, i) => (
              <CodeBlock key={i} title={f.path} language={f.lang} code={f.code} />
            ))}
          </div>
        </div>

        {/* ML Files */}
        <div className="mb-12">
          <SectionHeader icon={Cpu} title="ML Pipeline — Full Source Code" />
          <div className="space-y-6">
            {ML_FILES.map((f, i) => (
              <CodeBlock key={i} title={f.path} language={f.lang} code={f.code} />
            ))}
          </div>
        </div>

        {/* Docker */}
        <div className="mb-12">
          <SectionHeader icon={Package} title="Docker & Deployment" />
          <div className="space-y-6">
            {DOCKER_FILES.map((f, i) => (
              <CodeBlock key={i} title={f.path} language={f.lang} code={f.code} />
            ))}
          </div>
        </div>

        {/* Database Schema */}
        <div className="mb-12">
          <SectionHeader icon={Database} title="Database Schema" />
          <CodeBlock title="backend/app/models.py — SQLAlchemy Models" language="python" code={DB_SCHEMA} />
        </div>

        {/* Datasets */}
        <div className="mb-12">
          <SectionHeader icon={Terminal} title="Benchmark Datasets for Training" />
          <div className="grid md:grid-cols-3 gap-4">
            {DATASETS.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{ delay: 0.05 * i }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <p className="font-bold text-foreground mb-1">{d.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{d.modality}</p>
                <p className="text-sm text-muted-foreground">{d.description}</p>
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2 inline-block">{d.url}</a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Commands */}
        <div>
          <SectionHeader icon={Terminal} title="Quick Start Commands" />
          <CodeBlock
            title="Terminal — Run with Docker Compose"
            language="bash"
            code={`# Clone / create project structure
mkdir VeriSynth && cd VeriSynth

# Copy all files from this architecture doc into place

# Build and run all services
docker-compose up --build

# Backend will be available at:
# http://localhost:8000

# Frontend (Next.js) will be available at:
# http://localhost:3000

# API docs (Swagger UI):
# http://localhost:8000/docs

# Run ML pipeline manually (without Docker):
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`}
          />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
    </div>
  );
}

const PHASES = [
  {
    phase: "Phase 1",
    title: "Project Setup & Environment",
    status: "setup",
    description: "Create the folder structure, install Python dependencies, and configure environment variables.",
    steps: [
      "Create VeriSynth/ directory with backend/ and frontend/ subdirectories",
      "Create and activate a Python 3.9+ virtual environment: python -m venv venv && source venv/bin/activate",
      "Install requirements: pip install -r backend/requirements.txt",
      "Copy .env file and set DATABASE_URL, SECRET_KEY, UPLOAD_DIR",
      "Verify: python -c \"import torch, transformers, timm, cv2, librosa; print('All imports OK')\"",
      "✅ CHECKPOINT: All imports succeed without errors"
    ],
    verify: "python -c \"import torch, transformers, timm, cv2, librosa; print('OK')\""
  },
  {
    phase: "Phase 2",
    title: "Database & API Foundation",
    status: "backend",
    description: "Set up FastAPI, SQLAlchemy database models, and verify the API server runs.",
    steps: [
      "Write backend/app/database.py with SQLAlchemy engine and session",
      "Write backend/app/models.py with AnalysisResult ORM model",
      "Write backend/app/schemas.py with Pydantic request/response schemas",
      "Write backend/app/core/config.py with Settings class",
      "Write backend/app/main.py with FastAPI app, CORS, and /health endpoint",
      "Run: uvicorn app.main:app --reload",
      "✅ CHECKPOINT: GET http://localhost:8000/health returns {\"status\": \"ok\"}"
    ],
    verify: "curl http://localhost:8000/health"
  },
  {
    phase: "Phase 3",
    title: "ML Models — Video & Scene",
    status: "ml",
    description: "Implement Vision Transformer video detector and OpenCV optical flow scene analyzer.",
    steps: [
      "Write backend/ml/architecture.py with ViTDeepfakeDetector and ScenePhysicsAnalyzer",
      "Write backend/ml/pipeline.py with VideoPreprocessor and AudioPreprocessor",
      "Test video model: python -c \"from ml.architecture import ViTDeepfakeDetector; m = ViTDeepfakeDetector(); print(m)\"",
      "Test scene model: python -c \"from ml.architecture import ScenePhysicsAnalyzer; print('Scene OK')\"",
      "Test preprocessing pipeline with a sample video file",
      "✅ CHECKPOINT: Both models initialize and forward pass succeeds"
    ],
    verify: "python -c \"from ml.architecture import ViTDeepfakeDetector, ScenePhysicsAnalyzer; print('Models OK')\""
  },
  {
    phase: "Phase 4",
    title: "ML Models — Audio + Fusion",
    status: "ml",
    description: "Add Wav2Vec2 audio model and implement the weighted fusion engine.",
    steps: [
      "Write backend/ml/architecture.py — add Wav2Vec2AudioDetector class",
      "Write backend/ml/pipeline.py — add full MultimodalPipeline.run() method",
      "Implement fusion: final_score = 0.4×video + 0.3×audio + 0.3×scene",
      "Test with sample audio: python -c \"from ml.architecture import Wav2Vec2AudioDetector; print('Audio OK')\"",
      "Run end-to-end on test video: python -m ml.pipeline --video test.mp4",
      "✅ CHECKPOINT: Pipeline returns {label, confidence, video_score, audio_score, scene_score}"
    ],
    verify: "python -m ml.pipeline --video test.mp4"
  },
  {
    phase: "Phase 5",
    title: "Explainability (XAI)",
    status: "xai",
    description: "Implement Grad-CAM for video frames and Mel spectrogram visualization for audio.",
    steps: [
      "Write backend/ml/xai.py with GradCAMExplainer class for ViT",
      "Add generate_spectrogram() function using librosa + matplotlib",
      "Save Grad-CAM overlay image to outputs/gradcam/{job_id}.png",
      "Save spectrogram image to outputs/spectrograms/{job_id}.png",
      "Test: python -c \"from ml.xai import GradCAMExplainer; print('XAI OK')\"",
      "✅ CHECKPOINT: Both image files are saved and readable"
    ],
    verify: "python -c \"from ml.xai import GradCAMExplainer, generate_spectrogram; print('XAI OK')\""
  },
  {
    phase: "Phase 6",
    title: "Full API Endpoints",
    status: "backend",
    description: "Connect upload endpoint to background ML processing, store results in DB.",
    steps: [
      "Write POST /upload endpoint with file validation (mp4, avi, mov)",
      "Use BackgroundTasks to run ML pipeline asynchronously after upload",
      "Write GET /analysis/{id} to fetch result from database",
      "Write GET /analyses to list all past analyses",
      "Test: curl -X POST http://localhost:8000/upload -F 'file=@test.mp4'",
      "✅ CHECKPOINT: Upload returns job ID, polling GET /analysis/{id} shows result after processing"
    ],
    verify: "curl -X POST http://localhost:8000/upload -F \"file=@test.mp4\""
  },
  {
    phase: "Phase 7",
    title: "Docker & Full Deployment",
    status: "docker",
    description: "Containerize backend and frontend, connect with docker-compose including PostgreSQL.",
    steps: [
      "Write backend/Dockerfile",
      "Write frontend/Dockerfile",
      "Write docker-compose.yml with backend, frontend, and postgres services",
      "Run: docker-compose up --build",
      "Verify: http://localhost:8000/docs (Swagger UI)",
      "✅ CHECKPOINT: docker-compose up --build runs without errors, all services healthy"
    ],
    verify: "docker-compose up --build"
  }
];

const BACKEND_FILES = [
  {
    path: "backend/app/core/config.py",
    lang: "python",
    code: `from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./VeriSynth.db"
    SECRET_KEY: str = "change-me-in-production"
    UPLOAD_DIR: str = "./uploads"
    OUTPUT_DIR: str = "./outputs"
    MAX_FILE_SIZE_MB: int = 500
    ALLOWED_EXTENSIONS: list = ["mp4", "avi", "mov"]
    FAKE_THRESHOLD: float = 0.68

    class Config:
        env_file = ".env"

settings = Settings()

# Ensure directories exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(f"{settings.OUTPUT_DIR}/gradcam", exist_ok=True)
os.makedirs(f"{settings.OUTPUT_DIR}/spectrograms", exist_ok=True)`
  },
  {
    path: "backend/app/database.py",
    lang: "python",
    code: `from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()`
  },
  {
    path: "backend/app/models.py",
    lang: "python",
    code: `from sqlalchemy import Column, String, Float, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
from app.database import Base

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    file_name = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    upload_time = Column(DateTime, default=datetime.utcnow)
    processing_status = Column(String, default="pending")  # pending | processing | done | failed
    label = Column(String, nullable=True)   # FAKE | REAL
    confidence_score = Column(Float, nullable=True)
    video_score = Column(Float, nullable=True)
    audio_score = Column(Float, nullable=True)
    scene_score = Column(Float, nullable=True)
    gradcam_image_path = Column(String, nullable=True)
    spectrogram_image_path = Column(String, nullable=True)
    error_message = Column(Text, nullable=True)`
  },
  {
    path: "backend/app/schemas.py",
    lang: "python",
    code: `from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AnalysisResultBase(BaseModel):
    file_name: str
    label: Optional[str] = None
    confidence_score: Optional[float] = None
    video_score: Optional[float] = None
    audio_score: Optional[float] = None
    scene_score: Optional[float] = None
    processing_status: str = "pending"

class AnalysisResultCreate(AnalysisResultBase):
    file_path: str

class AnalysisResultResponse(AnalysisResultBase):
    id: str
    upload_time: datetime
    gradcam_image_path: Optional[str]
    spectrogram_image_path: Optional[str]
    error_message: Optional[str]

    class Config:
        from_attributes = True

class UploadResponse(BaseModel):
    job_id: str
    file_name: str
    message: str`
  },
  {
    path: "backend/app/main.py",
    lang: "python",
    code: `from fastapi import FastAPI, UploadFile, File, BackgroundTasks, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import shutil, os, uuid
from typing import List
from app.database import engine, get_db, Base
from app.models import AnalysisResult
from app.schemas import AnalysisResultResponse, UploadResponse
from app.core.config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(title="VeriSynth API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/outputs", StaticFiles(directory=settings.OUTPUT_DIR), name="outputs")

def run_analysis_job(job_id: str, file_path: str, db_url: str):
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker
    from ml.pipeline import MultimodalPipeline

    engine_local = create_engine(db_url)
    SessionLocal = sessionmaker(bind=engine_local)
    db = SessionLocal()
    try:
        record = db.query(AnalysisResult).filter(AnalysisResult.id == job_id).first()
        record.processing_status = "processing"
        db.commit()

        pipeline = MultimodalPipeline()
        result = pipeline.run(file_path, job_id)

        record.label = result["label"]
        record.confidence_score = result["confidence_score"]
        record.video_score = result["video_score"]
        record.audio_score = result["audio_score"]
        record.scene_score = result["scene_score"]
        record.gradcam_image_path = result.get("gradcam_image_path")
        record.spectrogram_image_path = result.get("spectrogram_image_path")
        record.processing_status = "done"
        db.commit()
    except Exception as e:
        record = db.query(AnalysisResult).filter(AnalysisResult.id == job_id).first()
        if record:
            record.processing_status = "failed"
            record.error_message = str(e)
            db.commit()
    finally:
        db.close()

@app.get("/health")
def health():
    return {"status": "ok", "service": "VeriSynth-api"}

@app.post("/upload", response_model=UploadResponse)
async def upload_video(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    ext = file.filename.split(".")[-1].lower()
    if ext not in settings.ALLOWED_EXTENSIONS:
        raise HTTPException(400, f"File type .{ext} not allowed. Use: {settings.ALLOWED_EXTENSIONS}")

    job_id = str(uuid.uuid4())
    save_path = os.path.join(settings.UPLOAD_DIR, f"{job_id}.{ext}")

    with open(save_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    record = AnalysisResult(
        id=job_id,
        file_name=file.filename,
        file_path=save_path,
        processing_status="pending"
    )
    db.add(record)
    db.commit()

    background_tasks.add_task(run_analysis_job, job_id, save_path, settings.DATABASE_URL)

    return UploadResponse(job_id=job_id, file_name=file.filename, message="Upload successful. Analysis started.")

@app.get("/analysis/{job_id}", response_model=AnalysisResultResponse)
def get_analysis(job_id: str, db: Session = Depends(get_db)):
    record = db.query(AnalysisResult).filter(AnalysisResult.id == job_id).first()
    if not record:
        raise HTTPException(404, "Analysis not found")
    return record

@app.get("/analyses", response_model=List[AnalysisResultResponse])
def list_analyses(db: Session = Depends(get_db)):
    return db.query(AnalysisResult).order_by(AnalysisResult.upload_time.desc()).limit(50).all()`
  }
];

const ML_FILES = [
  {
    path: "backend/ml/architecture.py",
    lang: "python",
    code: `import torch
import torch.nn as nn
import timm
import numpy as np
import cv2
from transformers import Wav2Vec2Model, Wav2Vec2Processor

# ── 1. VIDEO MODEL — Vision Transformer ──────────────────────────────────────
class ViTDeepfakeDetector(nn.Module):
    def __init__(self, model_name="vit_base_patch16_224", pretrained=True):
        super().__init__()
        self.backbone = timm.create_model(model_name, pretrained=pretrained, num_classes=0)
        embed_dim = self.backbone.num_features
        self.classifier = nn.Sequential(
            nn.LayerNorm(embed_dim),
            nn.Dropout(0.3),
            nn.Linear(embed_dim, 256),
            nn.GELU(),
            nn.Dropout(0.2),
            nn.Linear(256, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        # x: (B, 3, 224, 224)
        features = self.backbone(x)
        return self.classifier(features).squeeze(-1)

    def predict(self, frames_tensor):
        self.eval()
        with torch.no_grad():
            scores = self.forward(frames_tensor)
            return scores.mean().item()


# ── 2. AUDIO MODEL — Wav2Vec2 ─────────────────────────────────────────────────
class Wav2Vec2AudioDetector(nn.Module):
    def __init__(self):
        super().__init__()
        self.wav2vec = Wav2Vec2Model.from_pretrained("facebook/wav2vec2-base")
        hidden = self.wav2vec.config.hidden_size
        self.classifier = nn.Sequential(
            nn.Linear(hidden, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 1),
            nn.Sigmoid()
        )

    def forward(self, input_values, attention_mask=None):
        outputs = self.wav2vec(input_values, attention_mask=attention_mask)
        hidden = outputs.last_hidden_state.mean(dim=1)
        return self.classifier(hidden).squeeze(-1)

    def predict(self, input_values):
        self.eval()
        with torch.no_grad():
            return self.forward(input_values).item()


# ── 3. SCENE PHYSICS — Optical Flow ──────────────────────────────────────────
class ScenePhysicsAnalyzer:
    """
    Computes motion consistency score using Farneback optical flow.
    High inconsistency → high fake probability.
    """
    def analyze(self, frames: list) -> float:
        if len(frames) < 2:
            return 0.5

        flow_magnitudes = []
        prev_gray = cv2.cvtColor(frames[0], cv2.COLOR_RGB2GRAY)

        for frame in frames[1:]:
            curr_gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
            flow = cv2.calcOpticalFlowFarneback(
                prev_gray, curr_gray,
                None, 0.5, 3, 15, 3, 5, 1.2, 0
            )
            magnitude, _ = cv2.cartToPolar(flow[..., 0], flow[..., 1])
            flow_magnitudes.append(np.mean(magnitude))
            prev_gray = curr_gray

        if not flow_magnitudes:
            return 0.5

        mean_flow = np.mean(flow_magnitudes)
        std_flow = np.std(flow_magnitudes)

        # High variance in flow = physically inconsistent = more likely fake
        inconsistency = std_flow / (mean_flow + 1e-8)
        # Normalize to [0, 1] — clamp at 2.0
        score = min(inconsistency / 2.0, 1.0)
        return float(score)


# ── 4. FUSION ENGINE ──────────────────────────────────────────────────────────
class FusionEngine:
    VIDEO_WEIGHT = 0.4
    AUDIO_WEIGHT = 0.3
    SCENE_WEIGHT = 0.3
    THRESHOLD = 0.68

    def fuse(self, video_score: float, audio_score: float, scene_score: float) -> dict:
        final_score = (
            self.VIDEO_WEIGHT * video_score +
            self.AUDIO_WEIGHT * audio_score +
            self.SCENE_WEIGHT * scene_score
        )
        label = "FAKE" if final_score > self.THRESHOLD else "REAL"
        return {
            "label": label,
            "confidence_score": round(final_score, 4),
            "video_score": round(video_score, 4),
            "audio_score": round(audio_score, 4),
            "scene_score": round(scene_score, 4),
        }`
  },
  {
    path: "backend/ml/pipeline.py",
    lang: "python",
    code: `import cv2
import numpy as np
import torch
import librosa
import os
from transformers import Wav2Vec2Processor
from app.core.config import settings
from ml.architecture import ViTDeepfakeDetector, Wav2Vec2AudioDetector, ScenePhysicsAnalyzer, FusionEngine
from ml.xai import GradCAMExplainer, generate_spectrogram
from torchvision import transforms

IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD  = [0.229, 0.224, 0.225]

frame_transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Resize((224, 224)),
    transforms.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
])

class VideoPreprocessor:
    def __init__(self, max_frames=16, target_size=(224, 224)):
        self.max_frames = max_frames
        self.target_size = target_size

    def extract_frames(self, video_path: str):
        cap = cv2.VideoCapture(video_path)
        total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        indices = np.linspace(0, total - 1, self.max_frames, dtype=int)
        frames_raw, frames_tensor = [], []

        for idx in indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            if not ret:
                continue
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame_resized = cv2.resize(frame_rgb, self.target_size)
            frames_raw.append(frame_resized)
            frames_tensor.append(frame_transform(frame_resized))
        cap.release()

        return frames_raw, torch.stack(frames_tensor) if frames_tensor else None


class AudioPreprocessor:
    def __init__(self, sample_rate=16000):
        self.sample_rate = sample_rate
        self.processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base")

    def extract_audio_from_video(self, video_path: str) -> str:
        audio_path = video_path.replace(".mp4", ".wav").replace(".avi", ".wav").replace(".mov", ".wav")
        os.system(f"ffmpeg -i {video_path} -ar {self.sample_rate} -ac 1 -vn {audio_path} -y -loglevel quiet")
        return audio_path if os.path.exists(audio_path) else None

    def load_and_process(self, audio_path: str):
        waveform, sr = librosa.load(audio_path, sr=self.sample_rate, mono=True)
        waveform = librosa.util.normalize(waveform)
        inputs = self.processor(waveform, sampling_rate=self.sample_rate, return_tensors="pt", padding=True)
        return inputs.input_values


class MultimodalPipeline:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.video_model = ViTDeepfakeDetector(pretrained=True).to(self.device)
        self.audio_model = Wav2Vec2AudioDetector().to(self.device)
        self.scene_analyzer = ScenePhysicsAnalyzer()
        self.fusion = FusionEngine()
        self.video_preprocessor = VideoPreprocessor()
        self.audio_preprocessor = AudioPreprocessor()
        self.gradcam = GradCAMExplainer(self.video_model)

    def run(self, video_path: str, job_id: str) -> dict:
        # 1. Extract frames
        frames_raw, frames_tensor = self.video_preprocessor.extract_frames(video_path)

        # 2. Video score via ViT
        if frames_tensor is not None:
            frames_tensor = frames_tensor.to(self.device)
            video_score = self.video_model.predict(frames_tensor)
            gradcam_path = self.gradcam.generate(frames_tensor[0:1], job_id)
        else:
            video_score = 0.5
            gradcam_path = None

        # 3. Audio score via Wav2Vec2
        audio_path = self.audio_preprocessor.extract_audio_from_video(video_path)
        if audio_path:
            input_values = self.audio_preprocessor.load_and_process(audio_path).to(self.device)
            audio_score = self.audio_model.predict(input_values)
            spectrogram_path = generate_spectrogram(audio_path, job_id)
        else:
            audio_score = 0.5
            spectrogram_path = None

        # 4. Scene physics score via Optical Flow
        scene_score = self.scene_analyzer.analyze(frames_raw) if frames_raw else 0.5

        # 5. Fusion
        result = self.fusion.fuse(video_score, audio_score, scene_score)
        result["gradcam_image_path"] = gradcam_path
        result["spectrogram_image_path"] = spectrogram_path
        return result`
  },
  {
    path: "backend/ml/xai.py",
    lang: "python",
    code: `import torch
import torch.nn.functional as F
import numpy as np
import cv2
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import librosa
import librosa.display
import os
from app.core.config import settings

class GradCAMExplainer:
    """
    Grad-CAM for Vision Transformer.
    Hooks into the last attention block to capture gradient-weighted activations.
    """
    def __init__(self, model):
        self.model = model
        self.gradients = None
        self.activations = None
        self._register_hooks()

    def _register_hooks(self):
        # Hook into last transformer block
        last_block = self.model.backbone.blocks[-1]

        def forward_hook(module, input, output):
            self.activations = output.detach()

        def backward_hook(module, grad_in, grad_out):
            self.gradients = grad_out[0].detach()

        last_block.register_forward_hook(forward_hook)
        last_block.register_full_backward_hook(backward_hook)

    def generate(self, frame_tensor: torch.Tensor, job_id: str) -> str:
        self.model.eval()
        frame_tensor.requires_grad_(True)

        output = self.model(frame_tensor)
        self.model.zero_grad()
        output.backward(torch.ones_like(output))

        if self.gradients is None or self.activations is None:
            return None

        weights = self.gradients.mean(dim=(0, 1))
        cam = (self.activations[0] * weights).sum(dim=-1)
        cam = F.relu(cam)

        # Reshape to spatial
        n_patches = cam.shape[0]
        h = w = int(n_patches ** 0.5)
        if h * w != n_patches:
            h = w = 14  # fallback for vit_base_patch16_224

        cam = cam[:h * w].reshape(h, w).cpu().numpy()
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)
        cam_resized = cv2.resize(cam, (224, 224))

        # Convert frame to BGR for overlay
        frame_np = frame_tensor[0].detach().cpu().numpy().transpose(1, 2, 0)
        frame_np = (frame_np - frame_np.min()) / (frame_np.max() - frame_np.min() + 1e-8)
        frame_np = (frame_np * 255).astype(np.uint8)

        heatmap = cv2.applyColorMap((cam_resized * 255).astype(np.uint8), cv2.COLORMAP_JET)
        overlay = cv2.addWeighted(cv2.cvtColor(frame_np, cv2.COLOR_RGB2BGR), 0.6, heatmap, 0.4, 0)

        output_path = os.path.join(settings.OUTPUT_DIR, "gradcam", f"{job_id}.png")
        cv2.imwrite(output_path, overlay)
        return output_path


def generate_spectrogram(audio_path: str, job_id: str) -> str:
    """Generate and save a Mel spectrogram image for the audio file."""
    y, sr = librosa.load(audio_path, sr=16000)
    mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128, fmax=8000)
    mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)

    fig, ax = plt.subplots(figsize=(10, 4), facecolor="#0f172a")
    ax.set_facecolor("#0f172a")
    img = librosa.display.specshow(
        mel_spec_db, sr=sr, x_axis="time", y_axis="mel",
        fmax=8000, ax=ax, cmap="magma"
    )
    fig.colorbar(img, ax=ax, format="%+2.0f dB")
    ax.set_title("Mel Spectrogram", color="white", fontsize=12)
    ax.tick_params(colors="white")
    for spine in ax.spines.values():
        spine.set_edgecolor("#334155")
    plt.tight_layout()

    output_path = os.path.join(settings.OUTPUT_DIR, "spectrograms", f"{job_id}.png")
    plt.savefig(output_path, dpi=150, bbox_inches="tight", facecolor="#0f172a")
    plt.close(fig)
    return output_path`
  },
  {
    path: "backend/ml/train.py",
    lang: "python",
    code: `"""
Training script for the VeriSynth ViT model.
Usage: python -m ml.train --data_dir /path/to/dataset --epochs 20 --batch_size 16
"""
import argparse
import os
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from PIL import Image
from ml.architecture import ViTDeepfakeDetector

IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD  = [0.229, 0.224, 0.225]

class DeepfakeFrameDataset(Dataset):
    """
    Expected structure:
    data_dir/
      real/   ← frames from real videos
      fake/   ← frames from fake videos
    """
    def __init__(self, data_dir, split="train"):
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.RandomHorizontalFlip(),
            transforms.ColorJitter(brightness=0.2, contrast=0.2),
            transforms.ToTensor(),
            transforms.Normalize(IMAGENET_MEAN, IMAGENET_STD),
        ])
        self.samples = []
        for label, cls in [(0.0, "real"), (1.0, "fake")]:
            cls_dir = os.path.join(data_dir, cls)
            if os.path.exists(cls_dir):
                for fname in os.listdir(cls_dir):
                    if fname.lower().endswith((".jpg", ".png", ".jpeg")):
                        self.samples.append((os.path.join(cls_dir, fname), label))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        path, label = self.samples[idx]
        img = Image.open(path).convert("RGB")
        return self.transform(img), torch.tensor(label, dtype=torch.float32)


def train(data_dir, epochs=20, batch_size=16, lr=1e-4, save_path="./checkpoints/vit_deepfake.pt"):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Training on: {device}")

    dataset = DeepfakeFrameDataset(data_dir)
    n_val = max(1, int(len(dataset) * 0.1))
    n_train = len(dataset) - n_val
    train_set, val_set = torch.utils.data.random_split(dataset, [n_train, n_val])

    train_loader = DataLoader(train_set, batch_size=batch_size, shuffle=True, num_workers=4)
    val_loader   = DataLoader(val_set, batch_size=batch_size, shuffle=False, num_workers=2)

    model = ViTDeepfakeDetector(pretrained=True).to(device)
    optimizer = torch.optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)
    criterion = nn.BCELoss()

    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    best_val_loss = float("inf")

    for epoch in range(1, epochs + 1):
        model.train()
        total_loss, correct, total = 0, 0, 0
        for imgs, labels in train_loader:
            imgs, labels = imgs.to(device), labels.to(device)
            optimizer.zero_grad()
            preds = model(imgs)
            loss = criterion(preds, labels)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
            correct += ((preds > 0.5) == labels.bool()).sum().item()
            total += len(labels)

        scheduler.step()
        train_acc = correct / total
        avg_loss = total_loss / len(train_loader)

        # Validation
        model.eval()
        val_loss, val_correct, val_total = 0, 0, 0
        with torch.no_grad():
            for imgs, labels in val_loader:
                imgs, labels = imgs.to(device), labels.to(device)
                preds = model(imgs)
                val_loss += criterion(preds, labels).item()
                val_correct += ((preds > 0.5) == labels.bool()).sum().item()
                val_total += len(labels)

        val_acc = val_correct / val_total
        avg_val_loss = val_loss / len(val_loader)
        print(f"Epoch {epoch}/{epochs} | Loss: {avg_loss:.4f} | Acc: {train_acc:.3f} | Val Loss: {avg_val_loss:.4f} | Val Acc: {val_acc:.3f}")

        if avg_val_loss < best_val_loss:
            best_val_loss = avg_val_loss
            torch.save(model.state_dict(), save_path)
            print(f"  → Saved best model to {save_path}")

    print("Training complete.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data_dir", required=True, help="Path to dataset with real/ and fake/ subdirs")
    parser.add_argument("--epochs", type=int, default=20)
    parser.add_argument("--batch_size", type=int, default=16)
    parser.add_argument("--lr", type=float, default=1e-4)
    parser.add_argument("--save_path", default="./checkpoints/vit_deepfake.pt")
    args = parser.parse_args()
    train(args.data_dir, args.epochs, args.batch_size, args.lr, args.save_path)`
  }
];

const DOCKER_FILES = [
  {
    path: "backend/requirements.txt",
    lang: "text",
    code: `fastapi==0.110.0
uvicorn[standard]==0.29.0
torch==2.2.0
torchvision==0.17.0
torchaudio==2.2.0
transformers==4.38.0
timm==0.9.16
opencv-python-headless==4.9.0.80
librosa==0.10.1
matplotlib==3.8.3
sqlalchemy==2.0.28
psycopg2-binary==2.9.9
python-multipart==0.0.9
python-dotenv==1.0.1
pydantic-settings==2.2.1
numpy==1.26.4
soundfile==0.12.1`
  },
  {
    path: "backend/Dockerfile",
    lang: "dockerfile",
    code: `FROM python:3.10-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    ffmpeg \\
    libsm6 \\
    libxext6 \\
    libgl1-mesa-glx \\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p uploads outputs/gradcam outputs/spectrograms

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`
  },
  {
    path: "docker-compose.yml",
    lang: "yaml",
    code: `version: "3.9"

services:
  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: synthetic
      POSTGRES_PASSWORD: synthetic_secret
      POSTGRES_DB: VeriSynth
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    restart: always
    depends_on:
      - db
    environment:
      DATABASE_URL: postgresql://synthetic:synthetic_secret@db:5432/VeriSynth
      SECRET_KEY: change-me-in-production
      UPLOAD_DIR: /app/uploads
      OUTPUT_DIR: /app/outputs
    volumes:
      - uploads_data:/app/uploads
      - outputs_data:/app/outputs
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    restart: always
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
    ports:
      - "3000:3000"

volumes:
  postgres_data:
  uploads_data:
  outputs_data:`
  },
  {
    path: ".env",
    lang: "text",
    code: `DATABASE_URL=sqlite:///./VeriSynth.db
SECRET_KEY=change-me-in-production-use-strong-random-key
UPLOAD_DIR=./uploads
OUTPUT_DIR=./outputs
MAX_FILE_SIZE_MB=500
FAKE_THRESHOLD=0.68`
  }
];

const DB_SCHEMA = `# backend/app/models.py — SQLAlchemy ORM Schema
#
# Table: analysis_results
# ┌─────────────────────────┬──────────┬───────────────────────────────────────────┐
# │ Column                  │ Type     │ Description                               │
# ├─────────────────────────┼──────────┼───────────────────────────────────────────┤
# │ id                      │ String   │ UUID primary key (auto-generated)         │
# │ file_name               │ String   │ Original uploaded filename                │
# │ file_path               │ String   │ Server path to saved video file           │
# │ upload_time             │ DateTime │ UTC timestamp of upload                   │
# │ processing_status       │ String   │ pending | processing | done | failed      │
# │ label                   │ String   │ FAKE | REAL (set after processing)        │
# │ confidence_score        │ Float    │ Final fused score (0.0 – 1.0)            │
# │ video_score             │ Float    │ ViT video score (0.0 – 1.0)             │
# │ audio_score             │ Float    │ Wav2Vec2 audio score (0.0 – 1.0)        │
# │ scene_score             │ Float    │ Optical flow scene score (0.0 – 1.0)    │
# │ gradcam_image_path      │ String   │ Path to Grad-CAM overlay PNG            │
# │ spectrogram_image_path  │ String   │ Path to Mel spectrogram PNG             │
# │ error_message           │ Text     │ Error details if processing failed        │
# └─────────────────────────┴──────────┴───────────────────────────────────────────┘`;

const DATASETS = [
  {
    name: "FaceForensics++",
    modality: "Video — Face Manipulation",
    description: "Large-scale benchmark with 1000 video sequences manipulated by 4 deepfake methods. Standard for ViT training.",
    url: "https://github.com/ondyari/FaceForensics"
  },
  {
    name: "ASVspoof 2021",
    modality: "Audio — Voice Spoofing",
    description: "Challenge dataset for automatic speaker verification spoofing. Used for Wav2Vec2 audio model training.",
    url: "https://www.asvspoof.org/"
  },
  {
    name: "WaveFake",
    modality: "Audio — Synthetic Speech",
    description: "19,000 audio clips generated by 6 neural vocoders. Ideal complement to ASVspoof for voice cloning detection.",
    url: "https://github.com/RUB-SysSec/WaveFake"
  },
  {
    name: "FakeAVCeleb",
    modality: "Audio-Visual — Multimodal",
    description: "Multimodal dataset with face-swap and voice-swap combinations. Used for joint audio-visual detection.",
    url: "https://github.com/DASH-Lab/FakeAVCeleb"
  },
  {
    name: "DFDC (Meta)",
    modality: "Video — Deepfake Challenge",
    description: "DeepFake Detection Challenge dataset from Facebook/Meta. 100K+ videos with diverse manipulation methods.",
    url: "https://ai.meta.com/datasets/dfdc/"
  },
  {
    name: "Celeb-DF v2",
    modality: "Video — High Quality Fakes",
    description: "590 celebrity deepfake videos with significantly reduced visual artifacts. Good for generalization testing.",
    url: "https://github.com/yuezunli/celeb-deepfakeforensics"
  },
  {
    name: "VidProm",
    modality: "Video — Diffusion Generated Scenes",
    description: "1 million text to video prompts with corresponding synthetic videos from diffusion models. Covers diverse scenes (disasters, events, etc.).",
    url: "https://arxiv.org/abs/2402.16171"
  },
  {
    name: "ModelScope Text to Video",
    modality: "Video — AI Generated Scenes",
    description: "Diverse synthetic scenes created by diffusion based video generation models. Useful for training scene physics detectors.",
    url: "https://modelscope.cn/research"
  },
  {
    name: "InternVid",
    modality: "Video — Large Scale Multimodal",
    description: "Large scale multimodal dataset including synthetic video clips. Helps evaluate generalization to unseen scene types.",
    url: "https://arxiv.org/abs/2402.15450"
  },
  {
    name: "Sora / RunwayML / Pika Collections",
    modality: "Video — Custom Synthetic Scenes",
    description: "We will generate or source additional samples to cover scenarios like fake tornadoes, airplane crashes, protests, etc. Essential for testing our optical flow detector.",
    url: "https://openai.com/sora"
  }
];

