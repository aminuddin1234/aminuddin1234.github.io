import React from 'react';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

// Python syntax highlighting colors (VS Code One Dark theme style)
const COLORS = {
  keyword: '#c678dd',      // purple - import, def, return, if, else, for, in, from
  string: '#98c379',       // green - strings
  comment: '#5c6370',      // gray - comments
  number: '#d19a66',       // orange - numbers
  builtin: '#e5c07b',      // yellow - built-in functions (pd, np, etc.)
  function: '#61afef',     // blue - function names
  decorator: '#d19a66',    // orange - @ decorators
  operator: '#56b6c2',     // cyan - operators
  class: '#e5c07b',        // yellow - class names
  text: '#abb2bf',         // light gray - default text
};

// Python keywords
const KEYWORDS = ['import', 'from', 'as', 'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally', 'with', 'as', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False', 'lambda', 'yield', 'raise', 'assert'];

// Python built-ins
const BUILTINS = ['pd', 'np', 'sql', 'sns', 'torch', 'sp', 'print', 'len', 'range', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'sum', 'min', 'max', 'abs', 'open', 'input', 'type', 'isinstance'];

// Tokenize and highlight a line of Python code
const highlightLine = (line: string): React.ReactNode => {
  if (!line || line.trim() === '') {
    return <span>{' '}</span>;
  }

  // Comment (full line)
  if (line.trim().startsWith('#')) {
    return <span style={{ color: COLORS.comment, fontStyle: 'italic' }}>{line}</span>;
  }

  // SQL keywords (for the query string)
  if (line.startsWith('SELECT') || line.startsWith('FROM') || line.startsWith('WHERE') || line.startsWith('AND') || line.startsWith('OR') || line.trim().startsWith('"""') || line.trim().startsWith("'''")) {
    return <span style={{ color: COLORS.string }}>{line}</span>;
  }

  // Tokenize the line for syntax highlighting
  const tokens: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < line.length) {
    // Strings (single or double quotes, including triple quotes)
    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i];
      let str = quote;
      i++;
      // Check for triple quotes
      if (line.slice(i, i + 2) === quote.repeat(2)) {
        str += quote.repeat(2);
        i += 2;
        while (i < line.length - 2) {
          str += line[i];
          if (line[i] === quote && line[i + 1] === quote && line[i + 2] === quote) {
            str += quote.repeat(2);
            i += 3;
            break;
          }
          i++;
        }
      } else {
        while (i < line.length && line[i] !== quote) {
          str += line[i];
          i++;
        }
        if (i < line.length) {
          str += line[i];
          i++;
        }
      }
      tokens.push(<span key={key++} style={{ color: COLORS.string }}>{str}</span>);
      continue;
    }

    // Numbers
    if (/\d/.test(line[i])) {
      let num = '';
      while (i < line.length && /[\d._]/.test(line[i])) {
        num += line[i];
        i++;
      }
      tokens.push(<span key={key++} style={{ color: COLORS.number }}>{num}</span>);
      continue;
    }

    // Words (keywords, builtins, identifiers)
    if (/[a-zA-Z_]/.test(line[i])) {
      let word = '';
      const startIdx = i;
      while (i < line.length && /[a-zA-Z0-9_]/.test(line[i])) {
        word += line[i];
        i++;
      }

      // Check if this is a function call - must have ( immediately after
      const isFunctionCall = line[i] === '(';
      
      // Check what's before this word
      const beforeWord = line.slice(0, startIdx).trimEnd();
      const isAfterReturn = /\b(return|yield)\s*$/.test(beforeWord);
      const isLeftOfAssignment = /=\s*$/.test(beforeWord) && !line.slice(startIdx).startsWith('=');

      let color = COLORS.text;
      if (KEYWORDS.includes(word)) {
        color = COLORS.keyword;
      } else if (BUILTINS.includes(word)) {
        color = COLORS.builtin;
      } else if (isFunctionCall && !isAfterReturn && !isLeftOfAssignment) {
        color = COLORS.function;
      } else if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
        color = COLORS.class; // PascalCase = class name
      }

      tokens.push(<span key={key++} style={{ color }}>{word}</span>);
      continue;
    }

    // Operators and other characters
    tokens.push(<span key={key++} style={{ color: COLORS.operator }}>{line[i]}</span>);
    i++;
  }

  return <>{tokens}</>;
};

export default function TypingCodeBlock() {
  const { displayedLines, isDeleting } = useTypingAnimation({
    lines: codeLines,
    typingSpeed: 75,
    deletingSpeed: 15,
    pauseAfterComplete: 100,
    pauseBeforeDelete: 150,
    pauseBeforeRestart: 50,
  });

  return (
    <pre className="whitespace-pre-wrap">
      {displayedLines.map((line, i) => (
        <div key={i}>
          {highlightLine(line)}
          {"\n"}
        </div>
      ))}
      {!isDeleting && displayedLines.length > 0 && (
        <span
          className="animate-[blink_1s_step-end_infinite]"
          style={{ display: 'inline-block', width: '8px', height: '16px', backgroundColor: '#528bff' }}
        />
      )}
    </pre>
  );
}

const codeLines = [
  "import pandas as pd",
  "import numpy as np",
  "import sqlalchemy as sql",
  "import seaborn as sns",
  "import pytorch as torch",
  "import scipy as sp",
  
  "def generate_business_insights(engine):",
  "    # Extract: Pulling targeted growth metrics via SQL",
  "    query = \"\"\"",
  "SELECT date, revenue, churn_rate",
  "FROM monthly_report",
  "WHERE region = 'Global'",
  "\"\"\"",
  "    df = pd.read_sql(query, engine)",
  "    # Transform: Cleaning data and calculating KPIs",
  "    df['growth_pct'] = df['revenue'].pct_change()",
  "    # Load: Returning interactive visualization",
  "    return create_dynamic_dashboard(df)",
  
  "def predict_market_trends(data):",
  "    # Preprocessing messy business data",
  "    X, y = preprocess_features(data)",
  "    # Training the predictive model",
  "    model = RandomForestRegressor(n_estimators=100)",
  "    model.fit(X_train, y_train)",
  "    # Returning actionable forecasts",
  "    forecast = model.predict(future_dates)",
  "    return forecast"
];
