import React from 'react';
import styles from './AnimatedMail.module.css';

interface AnimatedMailProps {
  /** Size multiplier: 0.4 means 40% of original size */
  scale?: number;
  className?: string;
  onClick?: () => void;
}

const AnimatedMail: React.FC<AnimatedMailProps> = ({ 
  scale = 0.4, 
  className = "", 
  onClick 
}) => {
  return (
    <div 
      className={`${styles.container} ${className}`} 
      style={{ 
        transform: `scale(${scale})`,
        /* Container size ko scaling ke hisaab se adjust karne ke liye margin */
        margin: `calc(-100px * (1 - ${scale}))` 
      }}
      onClick={onClick}
    >
      <div className={styles.animatedMail}>
        <div className={styles.backFold}></div>
        
        <div className={styles.letter}>
          <div className={styles.letterBorder}></div>
          <div className={styles.letterTitle} style={{color: "black"}}></div>
          <div className={styles.letterContext}></div>
          <div className={styles.letterStamp}>
            <div className={styles.letterStampInner}></div>
          </div>
        </div>
        
        <div className={styles.topFold}></div>
        <div className={styles.body}></div>
        <div className={styles.leftFold}></div>
      </div>
      <div className={styles.shadow}></div>
    </div>
  );
};

export default AnimatedMail;