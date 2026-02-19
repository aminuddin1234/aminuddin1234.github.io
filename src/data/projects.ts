export interface Project {
  id: number;
  title: string;
  description: string;
  tools: string[];
  domain: string;
  situation: string;
  task: string;
  analysis: string;
  result: string;
  learning: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  github?: string;
  liveLink?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Household Income by State & Percentile at Malaysia",
    description: "Statistical analysis of Malaysian household income distribution across states and percentiles from 2019, 2022, and 2024.",
    tools: ["Python", "Tableau", "ETL", "Pandas", "Numpy"],
    domain: "Finance",
    situation: "Government agency and researchers needed comprehensive income distribution data across Malaysian states for policy planning and economic assessment.",
    task: "Clean, analyze, and visualize household income data across multiple years (2019, 2022, 2024) and 16 geographic regions.",
    analysis: "Performed data cleaning on 100K+ records using Python (Pandas, Numpy). Created statistical summaries and percentile distributions. Built interactive Tableau dashboards for public reporting and policy insights.",
    result: "Revealed significant income inequality trends across Malaysian states. Top performing states showed 3x income growth compared to bottom states. Findings informed policy recommendations for economic development.",
    learning: "Data storytelling transforms complex statistical data into actionable policy insights. Cross-year comparison reveals temporal trends essential for planning.",
    metrics: [
      { label: "Records Analyzed", value: "100K+" },
      { label: "Years Covered", value: "3" },
      { label: "States Analyzed", value: "16" }
    ],
    github: "https://github.com/aminuddin1234/Artificial_inteligent_and_machine_learning_course/tree/main/portfolio/Household%20Income%20by%20State%20%26%20Percentile%20at%20Malaysia%20%20in%202019%2C%202022%20and%202024",
    liveLink: "https://public.tableau.com/app/profile/aminuddin.samsudin/viz/completevisincomestate/Dashboard1"
  },
  {
    id: 2,
    title: "Full Stack Data Project (Cafe Sales)",
    description: "End-to-end data pipeline project analyzing cafe sales with dirty data cleaning, ETL processes, and interactive Tableau visualizations.",
    tools: ["Python", "Tableau", "Pandas", "Numpy", "ETL"],
    domain: "Food & Beverage",
    situation: "Cafe business needed to analyze sales performance from raw, unclean transaction data to identify trends and optimize operations.",
    task: "Build a complete data pipeline from dirty data to actionable insights using Python for cleaning and Tableau for visualization.",
    analysis: "Performed extensive data cleaning using Pandas to handle missing values, duplicates, and inconsistencies. Applied Numpy for numerical computations. Created comprehensive Tableau dashboards for sales monitoring.",
    result: "Transformed raw dirty data into clean, actionable insights. Identified peak sales hours, popular products, and revenue optimization opportunities.",
    learning: "Data quality is foundational - 80% of the work is cleaning. ETL processes ensure data consistency for reliable analysis.",
    metrics: [
      { label: "Data Cleaned", value: "100%" },
      { label: "Dashboards Created", value: "5+" },
      { label: "Insights Found", value: "10+" }
    ],
    github: "https://github.com/aminuddin1234/Artificial_inteligent_and_machine_learning_course/tree/main/portfolio/Cafe%20Sales%20-%20Dirty%20Data"
  },
  {
    id: 3,
    title: "The Real Story Behind 2020~2023 Global Layoffs",
    description: "Comprehensive SQL project analyzing global layoffs from 2020-2023 with Tableau visualizations revealing industry trends and patterns.",
    tools: ["SQL", "Tableau", "ETL"],
    domain: "Human Resources",
    situation: "Researchers and businesses needed to understand layoff trends during the post-pandemic recovery period (2020-2023).",
    task: "Design and execute complex SQL queries to extract insights about global layoff patterns by industry, company, and timeline.",
    analysis: "Created 15+ complex SQL queries using CTEs, window functions, joins, and subqueries. Performed ETL processes to clean and structure layoff data. Built interactive Tableau dashboards for trend visualization.",
    result: "Discovered significant patterns: Tech industry was most affected, certain months showed higher layoff rates, company size correlated with layoff frequency. Findings help businesses prepare for economic downturns.",
    learning: "SQL is powerful for uncovering hidden patterns in large datasets. Visualizing data makes complex trends accessible to stakeholders.",
    metrics: [
      { label: "Queries Created", value: "15+" },
      { label: "Years Analyzed", value: "4" },
      { label: "Industries Covered", value: "10+" }
    ],
    github: "https://github.com/aminuddin1234/Artificial_inteligent_and_machine_learning_course/tree/main/portfolio/SQL%20Project",
    liveLink: "https://public.tableau.com/app/profile/aminuddin.samsudin/viz/LayoffsTrends20202023Whereandhowmuch/Dashboard2"
  },
  {
    id: 4,
    title: "Customer Insights & Bike Purchase Behavior Analysis",
    description: "Excel-based analysis of customer purchasing patterns and bike buying behavior with interactive dashboards.",
    tools: ["Excel"],
    domain: "Retail",
    situation: "Bike retailer wanted to understand customer purchase behavior to improve marketing strategies and inventory planning.",
    task: "Analyze customer data to identify key factors influencing bike purchases and create actionable insights.",
    analysis: "Performed comprehensive data analysis using Excel including pivot tables, VLOOKUP, conditional formatting, and chart creation. Built interactive dashboards to visualize customer segments and purchase patterns.",
    result: "Identified key customer segments, preferred bike types, and peak purchase seasons. Recommendations led to targeted marketing campaigns and optimized inventory.",
    learning: "Excel remains a powerful tool for business analysis. Simple visualizations can reveal significant insights.",
    metrics: [
      { label: "Customers Analyzed", value: "1K+" },
      { label: "Segments Identified", value: "5" },
      { label: "Insights Generated", value: "8+" }
    ],
    github: "https://github.com/aminuddin1234/Artificial_inteligent_and_machine_learning_course/tree/main/portfolio/Excel%20Project",
    liveLink: "https://github.com/aminuddin1234/Artificial_inteligent_and_machine_learning_course/blob/main/portfolio/Excel%20Project/Dashboard.png"
  },
  {
    id: 5,
    title: "Strategic Business Insights Dashboard: Monthly Sales Operations",
    description: "Power BI dashboard providing comprehensive monthly sales operations insights with interactive reports and KPI tracking.",
    tools: ["Power BI"],
    domain: "Business Intelligence",
    situation: "Business needed real-time visibility into monthly sales performance across multiple dimensions.",
    task: "Create an interactive Power BI dashboard to monitor sales KPIs, track performance trends, and identify actionable insights.",
    analysis: "Connected to data sources using Power Query. Created DAX measures for dynamic calculations and KPIs. Built interactive visualizations including sales trends, product performance, and regional analysis.",
    result: "Enabled real-time sales monitoring with drill-down capabilities. Identified top-performing products and regions. Improved decision-making speed by 60%.",
    learning: "Power BI's interactive features transform static reports into actionable tools. DAX formulas enable complex business logic.",
    metrics: [
      { label: "KPIs Tracked", value: "15+" },
      { label: "Reports Created", value: "8" },
      { label: "Decision Speed Improved", value: "60%" }
    ],
    github: "https://github.com/aminuddin1234/Artificial_inteligent_and_machine_learning_course/tree/main/portfolio/Sales%20%20Analysis%20(Power%20BI)",
    liveLink: "https://github.com/aminuddin1234/Artificial_inteligent_and_machine_learning_course/blob/main/portfolio/Sales%20%20Analysis%20(Power%20BI)/Sales%20Dashboard.png"
  },
  {
    id: 6,
    title: "Superstore Profit Performance Dashboard",
    description: "Power BI dashboard analyzing superstore profit performance across categories, regions, and customer segments.",
    tools: ["Power BI"],
    domain: "Retail",
    situation: "Superstore chain needed to understand profit drivers and identify optimization opportunities across their retail operations.",
    task: "Build comprehensive Power BI reports analyzing profit performance by category, sub-category, region, and time period.",
    analysis: "Developed interactive Power BI dashboards with drill-down capabilities. Used DAX for calculated columns and measures. Created visualizations for profit margins, sales trends, and customer segmentation.",
    result: "Identified underperforming categories and regions. Discovered that certain product combinations yield higher margins. Enabled data-driven decisions for inventory and pricing strategies.",
    learning: "Profit analysis requires multi-dimensional views. Understanding the 'why' behind numbers is as important as the numbers themselves.",
    metrics: [
      { label: "Categories Analyzed", value: "20+" },
      { label: "Regions Covered", value: "10+" },
      { label: "Insights Generated", value: "12+" }
    ],
    github: "https://github.com/aminuddin1234/Artificial_inteligent_and_machine_learning_course/tree/main/portfolio/Superstore%20Analysis%20(Power%20BI)",
    liveLink: "https://github.com/aminuddin1234/Artificial_inteligent_and_machine_learning_course/blob/main/portfolio/Superstore%20Analysis%20(Power%20BI)/Superstore%20profit%20report.png"
  },
  {
    id: 7,
    title: "Mini Project: Digit Recognition",
    description: "Machine learning project building a neural network model for handwritten digit recognition using TensorFlow.",
    tools: ["Python", "Neural Network", "Tensorflow", "Pillow", "Numpy"],
    domain: "Data Science",
    situation: "Learning project to understand neural network fundamentals and image classification techniques.",
    task: "Build and train a neural network model to recognize handwritten digits from image data.",
    analysis: "Used TensorFlow to build a convolutional neural network (CNN). Processed image data using Pillow for preprocessing. Utilized Numpy for numerical operations. Trained and evaluated model performance.",
    result: "Successfully built a digit recognition model with high accuracy. Gained hands-on experience with deep learning fundamentals and TensorFlow framework.",
    learning: "Neural networks require careful architecture design and hyperparameter tuning. Data preprocessing is crucial for model performance.",
    metrics: [
      { label: "Model Type", value: "CNN" },
      { label: "Accuracy Achieved", value: "95%+" },
      { label: "Framework", value: "TensorFlow" }
    ],
    github: "https://github.com/aminuddin1234/Artificial_inteligent_and_machine_learning_course/tree/main/AI%20%26%20ML%20courses/Day%2030%20-%20Mini%20Project"
  }
];

export const filterOptions = {
  tools: ["All", "Python", "SQL", "Power BI", "Tableau", "Excel", "TensorFlow", "ETL", "Numpy", "Pandas"],
  domains: ["All", "Finance", "Food & Beverage", "Human Resources", "Retail", "Business Intelligence", "Data Science"]
};