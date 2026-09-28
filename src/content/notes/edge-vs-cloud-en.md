---
title: "The Real Bottleneck in Factory AI: Where Inference Runs"
description: "Getting YOLO onto a production line is rarely blocked by model accuracy. Bandwidth, latency, reliability and thermal limits decide where inference can live."
lang: "en"
langGroup: "edge-vs-cloud"
pubDate: 2026-09-27
tags: ["Edge AI", "YOLO", "NVIDIA Jetson", "Smart Manufacturing"]
---

Most factory AI projects do not fail because the model is inaccurate.

## Accuracy is the surface; deployment is the barrier

A model scoring mAP 0.92 in a lab can be completely unusable on a line, because the line has four constraints the lab does not:

| Constraint | Lab | Production floor |
|---|---|---|
| Bandwidth | Wired, stable | Shared industrial network, wired and wireless mixed |
| Latency | Seconds are fine | Takt time counted in milliseconds |
| Reliability | Someone is watching | Drops, crashes, machines get reimaged |
| Thermal | Desk cooling is fine | Closed cabinets, hot server rooms in summer |

## The trade-offs

- **Cloud inference**: strongest models, easiest to update — but every frame goes over the wire. Bandwidth and latency become hard blockers, and a network outage stops inspection.
- **Edge devices** (Jetson-class): real-time and network-independent, but compute is limited and demands quantisation and pruning.
- **Industrial PC + GPU**: balanced performance and flexibility, but cost and cooling are yours to solve.
- **IPC / PLC built-in inference**: lowest latency and tightest integration, but fewer choices and vendor lock-in.

For SiC wafer defect detection the direction was toward the edge: image volume is high, operators need immediate feedback, and factory networking should never be a single point of failure for quality control.

> This is also why I think "process engineers who learn AI" are worth more than "people who only train models": you know which site constraints will overturn a scheme that runs beautifully on a server.

---

*First technical note. Experiment details from the MSc thesis and the COMSOL thermal-simulation workflow will follow.*
