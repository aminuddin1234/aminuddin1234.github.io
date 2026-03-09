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
    situation: "Malaysian policymakers needed to understand post-pandemic income inequality trends across states to design targeted welfare programs like BSH.",
    task: "Analyze household income distribution across 16 states over 3 years (2019, 2022, 2024) to identify disparity patterns and high-need regions.",
    analysis: "Built ETL pipeline using Python/Pandas to process OPENDOSM data, created interactive Tableau dashboards with percentile breakdowns and state comparisons, identified income gaps between states.",
    result: "Successfully analyzed 100K+ records, revealed 556.62% income gap between lowest (RM 740) and median income (RM 4,119), identified Kelantan as lowest-income state and Putrajaya/KL as highest for targeted policy intervention.",
    learning: "Data storytelling transforms complex statistical data into actionable policy insights. Cross-year comparison reveals temporal trends essential for planning.",
    metrics: [
      { label: "Records Analyzed", value: "100K+" },
      { label: "Years Covered", value: "3" },
      { label: "Income Gap", value: "556.62%" }
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
    situation: "A cafe chain struggled with inconsistent sales tracking due to messy POS data containing missing values, ERROR placeholders, and inconsistent data types across 10,000 transaction records.",
    task: "Build an end-to-end data pipeline to clean dirty data, implement predictive imputation, and provide actionable sales insights through visualizations.",
    analysis: "Performed extensive data cleaning using Pandas to handle missing values, duplicates, and inconsistencies. Applied Numpy for numerical computations. performed type standardization (object→float/datetime).",
    result: "Transformed raw dirty data into clean, actionable insights. Identified peak sales hours, popular products, and revenue optimization opportunities.",
    learning: "Data quality is foundational - 80% of the work is cleaning. ETL processes ensure data consistency for reliable analysis.",
    metrics: [
      { label: "Data Cleaned", value: "100%" },
      { label: "Data Analyzed", value: "10000" },
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
    situation: "HR leaders and job seekers needed clarity on layoff patterns following the tech industry downturn, with fragmented data containing duplicates, inconsistent industry names, and date formatting issues",
    task: "Design and execute complex SQL queries to extract insights about global layoff patterns by industry, company, and timeline.",
    analysis: "Implemented Window Functions (ROW_NUMBER()) with CTEs for deduplication, created staging tables for data integrity, used LIKE operators for industry normalization, applied STR_TO_DATE for time-series readiness, wrote self-joins to recover missing industry data.",
    result: "Successfully cleaned 4 years of layoff data (2020-2023) across 10+ industries with 15+ SQL queries, created Tableau dashboard revealing sector-specific trends for workforce planning and career decisions..",
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
    situation: "A bike retailer needed to understand customer segmentation and purchase drivers to improve marketing ROI and inventory planning decisions.",
    task: "Analyze 1K+ customer records to identify purchasing patterns, segment customers by behavioral profiles, and reveal factors influencing bike purchases.",
    analysis: "Performed exploratory data analysis in Excel, created pivot tables for segmentation analysis, built interactive dashboards showing customer demographics and purchase behavior patterns.",
    result: "Analyzed 1K+ customers, identified 5 distinct customer segments, generated 8+ insights on purchase behavior patterns to support targeted marketing campaigns and inventory decisions.",
    learning: "Excel enables rapid prototyping of customer analytics. What took hours in code can be explored in minutes with pivot tables, making it ideal for initial data exploration before scaling to Python/SQL.",
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
    situation: "Sales leadership lacked real-time visibility into monthly operations, leading to delayed decisions and missed revenue opportunities across multiple regions.",
    task: "Build a comprehensive Power BI dashboard to track 15+ KPIs and enable faster, data-driven decision-making for sales operations management.",
    analysis: "Designed 8 interactive reports with drill-down capabilities, implemented automated data refresh cycles, created executive-level KPI summaries with hierarchical filtering.",
    result: "Tracked 15+ KPIs across 8 reports, improved decision-making speed by 60% (from ~5 hours manual reporting to ~2 hours dashboard access), enabling weekly performance reviews instead of monthly.",
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
    situation: "Retail management needed visibility into profit performance across product categories and regions to identify underperforming segments and optimize inventory decisions.",
    task: "Create an interactive Power BI dashboard enabling drill-down analysis by category, region, and customer segment to pinpoint profit drivers and losses.",
    analysis: "Built visualizations with hierarchical filtering, profit margin calculations, and year-over-year comparison features for comprehensive performance tracking.",
    result: "Analyzed 20+ categories across 10+ regions, generated 12+ insights on profit drivers and loss patterns to support pricing and inventory adjustments.",
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
    title: "Mini Project: Digit Recognition (ML)",
    description: "Machine learning project building a neural network model for handwritten digit recognition using TensorFlow.",
    tools: ["Python", "Neural Network", "Tensorflow", "Pillow", "Numpy"],
    domain: "Data Science",
    situation: "Needed to demonstrate practical machine learning skills with a real-world computer vision application using industry-standard deep learning frameworks.",
    task: "Build and train a Convolutional Neural Network (CNN) to accurately classify handwritten digits from the MNIST dataset for document processing applications.",
    analysis: "Developed CNN architecture using TensorFlow/Keras, implemented data preprocessing with NumPy/Pillow, optimized model through multiple training iterations with accuracy validation.",
    result: "Achieved 95%+ accuracy on test data using TensorFlow framework, demonstrating proficiency in deep learning fundamentals applicable to document processing and automation use cases.",
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