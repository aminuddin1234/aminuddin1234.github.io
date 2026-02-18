import React from "react";

interface CodeHighlighterProps {
  code: string;
}

/**
 * Syntax highlights Python code with SQL support
 * Applies colors to keywords, strings, comments, and functions
 */
export function CodeHighlighter({ code }: CodeHighlighterProps) {
  // Python keywords
  const pythonKeywords = [
    "import", "as", "from", "def", "return", "if", "else", "elif",
    "for", "while", "in", "not", "and", "or", "True", "False",
    "None", "class", "with", "try", "except", "finally", "raise",
    "lambda", "yield", "global", "nonlocal", "assert", "pass",
    "break", "continue", "is", "async", "await"
  ];

  // SQL keywords
  const sqlKeywords = ["SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "ON"];

  // Highlight a single line of code
  const highlightLine = (line: string): React.ReactNode => {
    // Handle empty lines
    if (!line) return null;

    // Check for full-line comment
    if (line.trim().startsWith("#")) {
      return <span style={{ color: "#6a6a75", fontStyle: "italic" }}>{line}</span>;
    }

    const parts: React.ReactNode[] = [];
    let remaining = line;
    let keyIndex = 0;

    while (remaining.length > 0) {
      // Check for inline comment
      const commentIndex = remaining.indexOf("#");
      if (commentIndex !== -1) {
        // Check if # is inside a string
        const beforeComment = remaining.slice(0, commentIndex);
        const singleQuotes = (beforeComment.match(/'/g) || []).length;
        const doubleQuotes = (beforeComment.match(/"/g) || []).length;
        
        if (singleQuotes % 2 === 0 && doubleQuotes % 2 === 0) {
          // Not inside a string, process comment
          if (beforeComment) {
            parts.push(<React.Fragment key={keyIndex++}>{highlightCodeSegment(beforeComment)}</React.Fragment>);
          }
          parts.push(
            <span key={keyIndex++} style={{ color: "#6a6a75", fontStyle: "italic" }}>
              {remaining.slice(commentIndex)}
            </span>
          );
          remaining = "";
          break;
        }
      }

      // Process without special comment handling
      const segment = highlightCodeSegment(remaining);
      parts.push(<React.Fragment key={keyIndex++}>{segment}</React.Fragment>);
      remaining = "";
    }

    return parts.length > 0 ? parts : null;
  };

  // Highlight a code segment (handles strings and keywords)
  const highlightCodeSegment = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIndex = 0;

    // Regex patterns for different token types
    const patterns = [
      // Triple-quoted strings first (to avoid partial matches)
      { pattern: /^"""[\s\S]*?"""|^'''[\s\S]*?'''/, style: { color: "#98c379" } },
      // Regular strings
      { pattern: /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'/, style: { color: "#98c379" } },
      // Numbers
      { pattern: /^\b\d+(?:\.\d+)?\b/, style: { color: "#d19a66" } },
    ];

    while (remaining.length > 0) {
      let matched = false;

      // Check each pattern
      for (const { pattern, style } of patterns) {
        const match = remaining.match(pattern);
        if (match) {
          parts.push(
            <span key={keyIndex++} style={style}>
              {match[0]}
            </span>
          );
          remaining = remaining.slice(match[0].length);
          matched = true;
          break;
        }
      }

      if (matched) continue;

      // Check for keyword or identifier
      const wordMatch = remaining.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (wordMatch) {
        const word = wordMatch[0];
        
        if (pythonKeywords.includes(word)) {
          parts.push(
            <span key={keyIndex++} style={{ color: "#c678dd" }}>
              {word}
            </span>
          );
        } else if (sqlKeywords.includes(word.toUpperCase())) {
          parts.push(
            <span key={keyIndex++} style={{ color: "#56b6c2" }}>
              {word}
            </span>
          );
        } else {
          // Check for function call
          const afterWord = remaining.slice(word.length);
          if (afterWord.startsWith("(")) {
            parts.push(
              <span key={keyIndex++} style={{ color: "#61afef" }}>
                {word}
              </span>
            );
          } else {
            parts.push(<span key={keyIndex++}>{word}</span>);
          }
        }
        remaining = remaining.slice(word.length);
        continue;
      }

      // Default: just add the character
      parts.push(<span key={keyIndex++}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }

    return parts;
  };

  return <>{highlightLine(code)}</>;
}

/**
 * Renders multiple lines of highlighted code with a cursor
 */
interface CodeBlockProps {
  lines: string[];
  showCursor?: boolean;
}

export function CodeBlock({ lines, showCursor = true }: CodeBlockProps) {
  return (
    <pre className="whitespace-pre-wrap font-mono">
      {lines.map((line, index) => (
        <div key={index} className="leading-relaxed">
          <CodeHighlighter code={line} />
          {/* Cursor on last line */}
          {showCursor && index === lines.length - 1 && (
            <span className="animate-pulse text-white">▌</span>
          )}
        </div>
      ))}
      {/* Empty state cursor */}
      {lines.length === 0 && showCursor && (
        <span className="animate-pulse text-white">▌</span>
      )}
    </pre>
  );
}