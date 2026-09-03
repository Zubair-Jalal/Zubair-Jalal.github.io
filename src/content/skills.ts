import type { SkillGroup } from "@/lib/types";

export const skills: SkillGroup[] = [
  {
    id: "ml-ai",
    category: "Machine Learning & AI",
    skills: [
      "Supervised, unsupervised and deep learning (LSTM, autoencoders)",
      "Gradient boosting (XGBoost, LightGBM, CatBoost)",
      "Random Forest",
      "Survival analysis (Cox PH)",
      "Anomaly detection",
      "Imbalanced-data methods",
      "Hyperparameter tuning (Optuna)",
      "Monte Carlo simulation",
    ],
  },
  {
    id: "xai",
    category: "Explainable AI",
    skills: [
      "SHAP",
      "Feature-importance analysis",
      "Model interpretability for clinical and business stakeholders",
    ],
  },
  {
    id: "programming",
    category: "Programming",
    skills: ["Python (pandas, NumPy, scikit-learn)", "R (Tidyverse, Quarto)", "SQL", "VBA", "Git / GitHub"],
  },
  {
    id: "deployment",
    category: "Deployment & Workflow",
    skills: [
      "Model deployment and drift monitoring",
      "Reproducible data pipelines",
      "Cross-validation",
      "Agile and cross-functional teamwork",
    ],
  },
  {
    id: "viz-bi",
    category: "Visualisation & BI",
    skills: [
      "Power BI",
      "Tableau (LODs, dashboards, geospatial)",
      "Excel (advanced — PivotTables, slicers, KPI dashboards)",
    ],
  },
];
