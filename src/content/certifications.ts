import type { Certification, CertificationCategory } from "@/lib/types";

export const certificationCategories: CertificationCategory[] = ["Job Simulations", "Awards & Recognition"];

export const certifications: Certification[] = [
  {
    id: "forage-lloyds",
    name: "Data Science Job Simulation",
    issuer: "Lloyds Banking Group (via Forage)",
    dateEarned: "January 2026",
    category: "Job Simulations",
    description:
      "Built a Random Forest churn model reaching ROC-AUC 0.82; preprocessed data in pandas to handle missing values, encode categoricals and scale features; tuned hyperparameters with GridSearchCV and ran feature-importance analysis to derive retention insights.",
    certificateFile: "/certificates/forage-lloyds.pdf",
  },
  {
    id: "forage-tata",
    name: "Financial Data Analyst & AI Strategy Simulation",
    issuer: "TATA (via Forage)",
    dateEarned: "January 2026",
    category: "Job Simulations",
    description:
      "Ran exploratory data analysis using GenAI tools to assess data quality and risk indicators; proposed a predictive framework for customer delinquency risk; designed an agentic-AI collections strategy incorporating ethical-AI principles and regulatory compliance.",
    certificateFile: "/certificates/forage-tata.pdf",
  },
  {
    id: "forage-citi",
    name: "Finance Job Simulation",
    issuer: "Citi (via Forage)",
    dateEarned: "January 2026",
    category: "Job Simulations",
    description:
      "Reviewed minimum capital-adequacy ratios and calculated risk-weighted asset values using Federal Reserve Board methodology; analysed the potential impact of Omicron on 2022 credit-card sales; summarised KPI movements in an executive briefing for the Country Treasurer team and CFO.",
    certificateFile: "/certificates/forage-citi.pdf",
  },
  {
    id: "botswana-scholarship",
    name: "Botswana Top Achiever Scholarship",
    issuer: "Government of Botswana",
    dateEarned: "2025",
    category: "Awards & Recognition",
    description: "Full government scholarship awarded to the nation's highest-performing students.",
  },
  {
    id: "excel-rank-1",
    name: "Ranked #1 of cohort, Excel for Data Science",
    issuer: "University of Leicester",
    dateEarned: "February 2026",
    category: "Awards & Recognition",
    description: "1st position (highest marks) out of 75 students in MA7444 Excel for Data Science.",
    certificateFile: "/certificates/excel-ranking-email.png",
  },
  {
    id: "statistics-rank-3",
    name: "Ranked #3 of cohort, Statistics for Data Science",
    issuer: "University of Leicester",
    dateEarned: "February 2026",
    category: "Awards & Recognition",
    description: "Distinction, ranked #3 out of 260 students in MA7023 Statistics for Data Science.",
    certificateFile: "/certificates/statistics-ranking-email.png",
  },
];
