"use client";
import React, { CSSProperties } from 'react';
import styles from './HoverUnderline.module.css';

interface HoverUnderlineProps {
  text: string;
  textColor?: string;
  gradient?: string;
  thickness?: string;
  className?: string;
}

const HoverUnderline: React.FC<HoverUnderlineProps> = ({
  text,
  textColor = "#ffffff",
  gradient = "linear-gradient(to right, #ff0000, #00ffff)",
  thickness = "2px",
  className = ""
}) => {
  
  // Custom properties ko inline style ke zariye CSS variables mein pass karenge
  const dynamicStyles = {
    '--gradient': gradient,
    '--thickness': thickness,
    color: textColor,
  } as CSSProperties;

  return (
    <div 
      className={`${styles.hoverUnderline} ${className}`} 
      style={dynamicStyles}
    >
      {text}
    </div>
  );
};

export default HoverUnderline;