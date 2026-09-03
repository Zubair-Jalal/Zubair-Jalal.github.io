import type { EducationEntry } from "@/lib/types";

export const education: EducationEntry[] = [
  {
    id: "leicester-msc",
    degree: "MSc Data Science with Industry",
    institution: "University of Leicester",
    startDate: "Sep 2025",
    endDate: "Sep 2026",
    details: [
      "On track for Distinction.",
      "Botswana Top Achiever Scholarship — full government scholarship awarded to the nation's highest performers.",
      "Ranked #1 of cohort in Excel for Data Science and #3 in Statistics for Data Science.",
    ],
  },
  {
    id: "liverpool-bsc",
    degree: "BSc (Hons) Mathematics and Economics",
    institution: "University of Liverpool",
    startDate: "Sep 2022",
    endDate: "Jun 2025",
    details: [],
    modules: [
      "Financial Mathematics",
      "Financial & Actuarial Modelling",
      "Securities Markets",
      "Financial Reporting",
      "Linear Statistical Models",
    ],
  },
  {
    id: "livingstone-alevels",
    degree: "A-Levels",
    institution: "Livingstone Kolobeng College, Botswana",
    startDate: "2016",
    endDate: "2021",
    details: ["Mathematics (A), Economics (A), Physics (A), Business (B)."],
  },
];

export const shortEducation = [
  { degree: "MSc Data Science", institution: "University of Leicester" },
  { degree: "BSc Mathematics and Economics", institution: "University of Liverpool" },
];
