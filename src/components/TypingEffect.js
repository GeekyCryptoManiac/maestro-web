import React, { useState, useEffect } from "react";
import { Typography } from '@mui/material';
// This Component is to create the typing effect within the HomePage of this app
const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 50); // Adjust typing speed as needed

    // Toggle cursor every 500 milliseconds
    const cursorIntervalId = setInterval(() => {
      setShowCursor((prevShowCursor) => !prevShowCursor);
    }, 500);

    // Clear intervals on component unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(cursorIntervalId);
    };
  }, [text, currentIndex]);

  return (
    <Typography variant="h6" align='center' color='textPrimary'>
      {displayText}
      {showCursor && <span>|</span>}
    </Typography>
  );
};

export default TypingEffect;
