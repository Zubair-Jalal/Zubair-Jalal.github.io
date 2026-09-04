import type { ExperienceEntry } from "@/lib/types";

export const experience: ExperienceEntry[] = [
  {
    id: "digital-glow",
    role: "Junior Data Scientist",
    organisation: "The Digital Glow",
    location: "Remote, contract",
    startDate: "2024",
    endDate: "Present",
    summary:
      "Two-year remote engagement delivering machine-learning fault detection and BI across a solar and tech company's installed solar fleet, covering model development, data pipelines, explainability and ongoing monitoring.",
    achievements: [
      "Built a two-stage fault-detection system in Python (an XGBoost baseline on engineered telemetry features, followed by an autoencoder for anomaly detection), monitoring 200 live solar systems across inverter, battery and panel data.",
      "Raised the fault-catch rate from 78% to 86% and cut average downtime per fault from 3.5 hours to 2 by surfacing faults earlier for proactive maintenance.",
      "Engineered SQL pipelines aggregating multi-source telemetry and CRM data, and applied SHAP to surface the key underperformance and fault drivers for the operations team.",
      "Built Power BI dashboards for BAU monitoring of energy production, system health and commercial KPIs, and monitored deployed models for performance drift over time.",
    ],
  },
  {
    id: "match-official",
    role: "Match Official",
    organisation: "University of Liverpool Campus Football",
    location: "Liverpool, UK",
    startDate: "Oct 2023",
    endDate: "May 2025",
    summary:
      "Managed match-day logistics for a 16-team league, increasing fixture completion by 20% and reducing formal grievances by 10%.",
    achievements: [
      "Developed and presented PowerPoint analytics on conduct distribution and disciplinary trends, advising team captains on behavioural improvements and regulatory compliance.",
      "Served as primary point of contact for inter-team disputes, negotiating scheduling shifts and kickoff logistics using availability data.",
    ],
  },
  {
    id: "academic-mentor",
    role: "Academic Mentor & Tutor",
    organisation: "Livingstone Kolobeng College",
    location: "Botswana",
    startDate: "Mar 2019",
    endDate: "Jul 2021",
    summary:
      "Managed personalised learning programmes for four students, improving average assessment scores by 17%.",
    achievements: [
      "Authored detailed performance reports for parents, using diagnostic assessments to identify subject-specific bottlenecks.",
      "Designed structured academic timetables and long-term learning roadmaps, meeting curriculum milestones while balancing shifting priorities.",
    ],
  },
];
