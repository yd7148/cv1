---
title: "SiC Wafer Surface Defect Detection with YOLO"
summary: "MSc thesis: an annotated dataset covering TSD / TED / BPD defects, comparing YOLOv8 / v10 / v11 / v12 — v12 achieved the best precision, recall and mAP."
lang: "en"
icon: "🔬"
order: 1
featured: true
period: "Sep 2023 – Jun 2025"
org: "Feng Chia University, MSc in Information & Electrical Engineering"
tech: ["YOLO", "PyTorch", "Computer Vision", "Deep Learning", "SiC", "Wafer Defect", "Dataset Annotation", "mAP / Precision / Recall", "Object Detection"]
problem: "Silicon carbide, a third-generation semiconductor material, develops three classes of crystal defects during wafer manufacturing: Threading Screw Dislocations (TSD), Threading Edge Dislocations (TED) and Basal Plane Dislocations (BPD). Ranked by severity, these significantly affect downstream device electrical performance and reliability. Manual inspection is slow and inconsistent, making defect distribution hard to characterise."
approach:
  - "Collected a large set of SiC wafer optical images and built an annotated dataset containing the three defect classes"
  - "Trained and evaluated using the YOLO (You Only Look Once) object-detection algorithm"
  - "Compared YOLOv8, YOLOv10, YOLOv11 and YOLOv12 side by side on precision, recall and mAP"
impact:
  - "YOLOv12 performed best across precision, recall and mAP, delivering strong detection results"
  - "Against manual inspection it showed high consistency and efficiency, significantly reducing labour cost and error rate while raising inspection quality and throughput"
  - "Provides an evidence base for subsequent wafer thermal-field design optimisation and yield improvement"
  - "Practical and extensible, applicable to smart manufacturing and semiconductor quality control"
links:
  - label: "Permanent thesis URL"
    url: "https://hdl.handle.net/11296/197078"
todo: []
---

Defects in an SiC wafer are not cosmetic. They propagate into device electrical behaviour and long-term reliability. The goal of this project was straightforward: **let a system find them, rather than a pair of eyes.**
