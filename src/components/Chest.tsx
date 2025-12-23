import React from 'react';
import styles from './Chest.module.css';

interface DrawerProps {
  position: number;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ position, children }) => {
  // Pug logic for position
  const topMapping = [
    `calc(var(--frame) * 1vmin)`,
    `calc(((2 * var(--frame)) + var(--drawer-height)) * 1vmin)`,
    `calc(((3 * var(--frame)) + (2 * var(--drawer-height))) * 1vmin)`
  ];

  return (
    <div 
      className={styles.drawer} 
      style={{ '--top': topMapping[position - 1] } as React.CSSProperties}
    >
      <details className={styles.drawerDetails}>
        <summary></summary>
      </details>
      <div className={styles.drawerStructure}>
        <div className={`${styles.drawerPanel} ${styles.drawerPanelBack}`}>
          {children}
        </div>
        <div className={`${styles.drawerPanel} ${styles.drawerPanelBottom}`} />
        <div className={`${styles.drawerPanel} ${styles.drawerPanelRight}`} />
        <div className={`${styles.drawerPanel} ${styles.drawerPanelLeft}`} />
        <div className={`${styles.drawerPanel} ${styles.drawerPanelFront}`} />
      </div>
    </div>
  );
};

export default function Chest() {
  return (
    <div className={styles.chestContainer}>
      <div className={styles.chest}>
        {/* Chest Panels */}
        <div className={`${styles.chestPanel} ${styles.chestPanelBack}`} />
        <div className={`${styles.chestPanel} ${styles.chestPanelTop}`} />
        <div className={`${styles.chestPanel} ${styles.chestPanelBottom}`} />
        <div className={`${styles.chestPanel} ${styles.chestPanelRight}`} />
        <div className={`${styles.chestPanel} ${styles.chestPanelLeft}`} />
        <div className={`${styles.chestPanel} ${styles.chestPanelFront}`}>
          <div className={styles.chestPanelFrontFrame} />
        </div>

        {/* Drawers */}
        <Drawer position={1}>
          <span>CSS</span>
        </Drawer>
        <Drawer position={2}>
          <span>is</span>
        </Drawer>
        <Drawer position={3}>
          {"Awesome".split('').map((letter, i) => (
            <span key={i} className="letter" style={{ '--delay': i } as React.CSSProperties}>
              {letter}
            </span>
          ))}
        </Drawer>
      </div>
    </div>
  );
}