/**
 * LoadingScreen.jsx
 * Shown while the AI "thinks". Keeps UX responsive.
 */
import styles from './LoadingScreen.module.css';

const TIPS = [
  'Balancing your nutrition for the day…',
  'Checking ingredient compatibility…',
  'Calculating budget feasibility…',
  'Finding the tastiest options…',
  'Optimising your grocery list…',
];

export function LoadingScreen() {
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
  return (
    <div className={styles.container} aria-live="polite" aria-label="Generating your meal plan">
      <div className={styles.spinner} aria-hidden="true">
        <div className={styles.ring} />
        <span className={styles.icon}>🍳</span>
      </div>
      <h2 className={styles.title}>Cooking up your plan…</h2>
      <p className={styles.tip}>{tip}</p>
      <div className={styles.dots} aria-hidden="true">
        <span /><span /><span />
      </div>
    </div>
  );
}
