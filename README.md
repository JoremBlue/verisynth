# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


#####################################################################################################################################

# VeriSynth Backend Documentation

## Multimodal AI Detection System (FastAPI + PyTorch)

---

## 1. Overview

VeriSynth is a web-based system designed to detect AI-generated media using a multimodal approach. The backend is implemented using **FastAPI** and currently supports:

* Video upload
* Frame-based AI analysis
* Result generation (FAKE / REAL classification)
* Retrieval of analysis results
* History of processed media

This document describes the backend setup, architecture, and usage.

---

## 2. Technology Stack

| Component         | Technology         |
| ----------------- | ------------------ |
| Backend Framework | FastAPI            |
| AI Model          | PyTorch (ResNet18) |
| Video Processing  | OpenCV             |
| Image Processing  | PIL (Pillow)       |
| Data Handling     | NumPy              |
| API Server        | Uvicorn            |

---

## 3. Project Structure

```
backend/
├── app/
│   ├── main.py        # API endpoints
│   ├── model.py       # AI model logic
├── uploads/           # Stored uploaded videos (auto-created)
├── venv/              # Virtual environment
```

---

## 4. Setup Instructions

### 4.1 Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### 4.2 Activate Environment

```bash
venv\Scripts\activate
```

### 4.3 Install Dependencies

```bash
pip install fastapi uvicorn python-multipart opencv-python torch torchvision pillow numpy
```

---

## 5. Running the Backend

```bash
uvicorn app.main:app --reload
```

Access API documentation:

```
http://127.0.0.1:8000/docs
```

---

## 6. API Endpoints

### 6.1 Health Check

**GET** `/health`

Response:

```json
{
  "status": "ok"
}
```

---

### 6.2 Upload Video

**POST** `/upload`

* Accepts video file (.mp4, .avi, .mov)
* Saves file locally
* Runs AI model
* Returns job ID

Response:

```json
{
  "job_id": "uuid-string"
}
```

---

### 6.3 Get Analysis Result

**GET** `/analysis/{job_id}`

Response:

```json
{
  "id": "...",
  "file_name": "...",
  "label": "FAKE",
  "confidence_score": 0.87,
  "video_score": 0.87
}
```

---

### 6.4 Get All Analyses (History)

**GET** `/analyses`

Response:

```json
[
  { ... },
  { ... }
]
```

---

## 7. AI Detection Pipeline

### Step-by-Step Process

1. User uploads a video
2. Video is saved to `/uploads`
3. Frames are extracted using OpenCV
4. Each frame is processed by a CNN model (ResNet18)
5. Predictions are generated per frame
6. Scores are averaged
7. Final classification is computed

---

## 8. Model Implementation

Located in: `app/model.py`

### Key Function

```python
def analyze_video(video_path):
```

### Workflow

* Load video using OpenCV
* Extract up to 20 frames
* Convert frames to tensors
* Pass through pretrained ResNet18
* Apply softmax to get probability
* Average results

---

## 9. Classification Logic

```python
confidence = video_score
label = "FAKE" if confidence > 0.5 else "REAL"
```

---

## 10. Data Storage

Currently uses **in-memory storage**:

```python
fake_db = {}
```

Limitations:

* Data resets when server restarts
* Not persistent

---

## 11. CORS Configuration

Allows frontend communication:

```python
allow_origins=["*"]
```

---

## 12. Current Limitations

* Model is not fine-tuned for deepfake detection
* No database (temporary storage only)
* Only video modality implemented
* No audio or scene analysis yet

---

## 13. Future Improvements

* Integrate trained deepfake datasets (e.g., FaceForensics++)
* Add audio detection (Wav2Vec2)
* Add scene physics validation
* Replace in-memory DB with PostgreSQL
* Add asynchronous processing (Celery or background tasks)

---

## 14. Summary

The VeriSynth backend successfully implements:

* A functional API
* A real AI inference pipeline
* End-to-end video processing
* Integration with frontend

This serves as a **working prototype of a multimodal AI detection system** and is extensible for further research and development.

---

END OF DOCUMENT
