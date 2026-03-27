import torch
import torchvision.transforms as transforms
from PIL import Image
import cv2
import numpy as np

# Simple pretrained model (placeholder but REAL inference)
model = torch.hub.load('pytorch/vision', 'resnet18', pretrained=True)
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def analyze_video(video_path):
    cap = cv2.VideoCapture(video_path)
    frame_preds = []

    count = 0

    while cap.isOpened() and count < 20:  # limit frames
        ret, frame = cap.read()
        if not ret:
            break

        img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(img)
        img = transform(img).unsqueeze(0)

        with torch.no_grad():
            output = model(img)
            score = torch.softmax(output, dim=1)[0][0].item()

        frame_preds.append(score)
        count += 1

    cap.release()

    if len(frame_preds) == 0:
        return 0.5

    return float(np.mean(frame_preds))