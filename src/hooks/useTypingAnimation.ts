import { useState, useEffect, useCallback } from "react";

interface TypingConfig {
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterComplete?: number;
  pauseBeforeDelete?: number;
  pauseBeforeRestart?: number;
}

interface TypingState {
  displayedLines: string[];
  currentLineIndex: number;
  currentCharIndex: number;
  isDeleting: boolean;
  isPaused: boolean;
}

export function useTypingAnimation(config: TypingConfig) {
  const {
    lines,
    typingSpeed = 40,
    deletingSpeed = 20,
    pauseBeforeDelete = 1500,
    pauseBeforeRestart = 500,
  } = config;

  const [state, setState] = useState<TypingState>({
    displayedLines: [],
    currentLineIndex: 0,
    currentCharIndex: 0,
    isDeleting: false,
    isPaused: false,
  });

  const [isComplete, setIsComplete] = useState(false);

  // Reset animation
  const resetAnimation = useCallback(() => {
    setState({
      displayedLines: [],
      currentLineIndex: 0,
      currentCharIndex: 0,
      isDeleting: false,
      isPaused: false,
    });
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (state.isPaused) return;

    const { displayedLines, currentLineIndex, currentCharIndex, isDeleting } = state;

    // Typing phase
    if (!isDeleting && !isComplete) {
      // Check if we've completed all lines
      if (currentLineIndex >= lines.length) {
        setIsComplete(true);
        // Pause before starting deletion
        const pauseTimer = setTimeout(() => {
          setState((prev) => ({ ...prev, isDeleting: true, isPaused: false }));
        }, pauseBeforeDelete);
        return () => clearTimeout(pauseTimer);
      }

      const currentLine = lines[currentLineIndex];
      
      // Check if current line is complete
      if (currentCharIndex >= currentLine.length) {
        // Move to next line
        const timer = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            displayedLines: [...prev.displayedLines, currentLine],
            currentLineIndex: prev.currentLineIndex + 1,
            currentCharIndex: 0,
          }));
        }, typingSpeed * 2); // Small pause at end of line
        return () => clearTimeout(timer);
      }

      // Type next character
      const timer = setTimeout(() => {
        const updatedLines = [...displayedLines];
        // Update last line or add new line
        if (updatedLines.length === currentLineIndex) {
          updatedLines.push(currentLine.slice(0, currentCharIndex + 1));
        } else {
          updatedLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
        }

        setState((prev) => ({
          ...prev,
          displayedLines: updatedLines,
          currentCharIndex: prev.currentCharIndex + 1,
        }));
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    }

    // Deleting phase
    if (isDeleting) {
      // Check if all lines are deleted - restart typing loop
      if (displayedLines.length === 0) {
        // Pause before restarting the typing animation
        const pauseTimer = setTimeout(() => {
          setState({
            displayedLines: [],
            currentLineIndex: 0,
            currentCharIndex: 0,
            isDeleting: false,
            isPaused: false,
          });
          setIsComplete(false);
        }, pauseBeforeRestart);
        return () => clearTimeout(pauseTimer);
      }

      const lastLineIndex = displayedLines.length - 1;
      const lastLine = displayedLines[lastLineIndex];

      // If last line is empty, remove it
      if (lastLine.length === 0) {
        const timer = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            displayedLines: prev.displayedLines.slice(0, -1),
          }));
        }, deletingSpeed);
        return () => clearTimeout(timer);
      }

      // Delete last character of last line
      const timer = setTimeout(() => {
        setState((prev) => {
          const updatedLines = [...prev.displayedLines];
          updatedLines[lastLineIndex] = lastLine.slice(0, -1);
          return {
            ...prev,
            displayedLines: updatedLines,
          };
        });
      }, deletingSpeed);
      
      return () => clearTimeout(timer);
    }
  }, [
    state,
    lines,
    typingSpeed,
    deletingSpeed,
    pauseBeforeDelete,
    pauseBeforeRestart,
    isComplete,
    resetAnimation,
  ]);

  return {
    displayedLines: state.displayedLines,
    isDeleting: state.isDeleting,
    isComplete,
    resetAnimation,
  };
}