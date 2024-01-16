import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from '../webBackground.json';
import './HomeBackgroundAnimation.css'

const WebBackground = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById('lottie-container'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }, []);

  return <div id="lottie-container" style={{ width: '100%', height: '100%' }} />;
};

export default WebBackground;