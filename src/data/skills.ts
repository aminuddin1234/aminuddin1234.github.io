export interface Skill {
  name: string;
  category: "beginner" | "intermediate";
  projects: string[];
}

export const skills: Skill[] = [
  { name: "Python", category: "intermediate", projects: ["Household Income by State & Percentile at Malaysia", "Full Stack Data Project (Cafe Sales)", "Mini Project: Digit Recognition"] },
  { name: "SQL", category: "intermediate", projects: ["The Real Story Behind 2020~2023 Global Layoffs"] },
  { name: "Power BI", category: "intermediate", projects: ["Strategic Business Insights Dashboard: Monthly Sales Operations", "Superstore Profit Performance Dashboard"] },
  { name: "Tableau", category: "intermediate", projects: ["Household Income by State & Percentile at Malaysia", "Full Stack Data Project (Cafe Sales)", "The Real Story Behind 2020~2023 Global Layoffs"] },
  { name: "Excel", category: "intermediate", projects: ["Customer Insights & Bike Purchase Behavior Analysis"] },
  { name: "Pandas", category: "intermediate", projects: ["Household Income by State & Percentile at Malaysia", "Full Stack Data Project (Cafe Sales)"] },
  { name: "Numpy", category: "intermediate", projects: ["Household Income by State & Percentile at Malaysia", "Full Stack Data Project (Cafe Sales)", "Mini Project: Digit Recognition"] },
  { name: "ETL", category: "intermediate", projects: ["Household Income by State & Percentile at Malaysia", "Full Stack Data Project (Cafe Sales)", "The Real Story Behind 2020~2023 Global Layoffs"] },
  { name: "TensorFlow", category: "beginner", projects: ["Mini Project: Digit Recognition"] },
  { name: "Neural Network", category: "beginner", projects: ["Mini Project: Digit Recognition"] }
];

export const tools = [
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "SQL", icon: "🗄️", color: "#4479A1" },
  { name: "Power BI", icon: "📊", color: "#F2C811" },
  { name: "Tableau", icon: "📈", color: "#E97627" },
  { name: "Excel", icon: "📋", color: "#217346" },
  { name: "Pandas", icon: "🐼", color: "#150458" },
  { name: "Numpy", icon: "🔢", color: "#013243" },
  { name: "ETL", icon: "⚙️", color: "#6C5CE7" },
  { name: "TensorFlow", icon: "🧠", color: "#FF6F00" },
  { name: "Neural Network", icon: "🔗", color: "#00D4FF" }
];
