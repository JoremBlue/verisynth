import os
from app.model import analyze_video
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
import uuid

app = FastAPI(title="VeriSynth API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (temporary)
fake_db = {}

@app.get("/health")
def health():
    return {"status": "ok"}

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    job_id = str(uuid.uuid4())

    file_path = f"{UPLOAD_DIR}/{job_id}.mp4"

    # Save uploaded file
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # 🔥 REAL VIDEO ANALYSIS
    video_score = analyze_video(file_path)

    confidence = video_score
    label = "FAKE" if confidence > 0.5 else "REAL"

    result = {
        "id": job_id,
        "file_name": file.filename,
        "status": "done",
        "label": label,
        "confidence_score": confidence,
        "video_score": video_score,
        "audio_score": None,
        "scene_score": None
    }

    fake_db[job_id] = result

    return {
        "job_id": job_id,
        "message": "Upload successful"
    }

@app.get("/analyses")
def get_all():
    return list(fake_db.values())