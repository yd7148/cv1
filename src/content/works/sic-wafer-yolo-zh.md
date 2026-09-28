---
title: "SiC 晶圓表面缺陷自動檢測系統（YOLO）"
summary: "碩士論文專題：比較 YOLOv8／v10／v11／v12，建立含 TSD／TED／BPD 三種缺陷的標註資料集，v12 在 Precision／Recall／mAP 上最佳。"
lang: "zh"
icon: "🔬"
order: 1
featured: true
period: "2023/09 – 2025/06"
org: "逢甲大學 資訊電機工程碩士在職學位學程"
tech: ["YOLO", "PyTorch", "Computer Vision", "Deep Learning", "SiC", "Wafer Defect", "Dataset Annotation", "mAP / Precision / Recall", "Object Detection"]
problem: "SiC（碳化矽）作為第三代半導體材料，在晶圓製造過程中會產生貫通螺旋位錯（TSD）、貫通刃狀位錯（TED）與基底面位錯（BPD）三類缺陷。這些缺陷依嚴重程度會顯著影響後續元件的電性表現與可靠度，傳統人工檢測耗時且一致性不足，難以有效掌握缺陷分佈。"
approach:
  - "蒐集大量 SiC 晶圓光學影像資料，經人工標註後建立包含 TSD／TED／BPD 三種缺陷類型的完整資料庫"
  - "以深度學習目標檢測演算法 YOLO（You Only Look Once）進行訓練與測試"
  - "並列比較 YOLOv8、YOLOv10、YOLOv11 與 YOLOv12 四個版本，以 Precision、Recall、mAP 三項指標評估"
impact:
  - "YOLOv12 在精確率（Precision）、召回率（Recall）與平均準確率（mAP）上表現最佳，達成優異的檢測效果"
  - "相較傳統人工檢測，展現高度一致性與效率，顯著降低人力成本與錯誤率，提升檢測品質與生產效率"
  - "為後續晶圓熱場設計優化與良率提升提供重要依據"
  - "具備良好實用性與可擴展性，可推廣至智慧製造及半導體品質控管領域"
links:
  - label: "論文永久網址"
    url: "https://hdl.handle.net/11296/197078"
todo: []
---

SiC 晶圓的缺陷不是偶發瑕疵，而是會一路傳遞到元件電性與可靠度的結構性問題。這個專案要做的是：**讓系統自己找出這些缺陷，而不是靠人的眼睛。**
