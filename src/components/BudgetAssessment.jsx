/**
 * BudgetAssessment.jsx
 * Displays visual validation of whether the meal plan fits within the daily budget limit.
 */
import styles from './BudgetAssessment.module.css';

/**
 * @param {{ assessment: BudgetAssessment, budgetConfig: object, totalCost: number }} props
 */
export function BudgetAssessment({ assessment, budgetConfig, totalCost }) {
  const { isWithinBudget, difference, percent, verdict, advice } = assessment;

  // Determine status color/icon
  let statusColor = 'var(--success)';
  let statusBg    = 'rgba(34, 197, 94, 0.1)';
  let statusBorder = 'rgba(34, 197, 94, 0.2)';
  let statusIcon  = '✅';

  if (verdict === 'over') {
    statusColor = 'var(--danger)';
    statusBg    = 'rgba(239, 68, 68, 0.1)';
    statusBorder = 'rgba(239, 68, 68, 0.2)';
    statusIcon  = '⚠️';
  } else if (verdict === 'tight') {
    statusColor = 'var(--warning)';
    statusBg    = 'rgba(245, 158, 11, 0.1)';
    statusBorder = 'rgba(245, 158, 11, 0.2)';
    statusIcon  = '🔔';
  }

  const limitLabel = budgetConfig.max === Infinity ? 'None' : `$${budgetConfig.max.toFixed(2)}`;

  return (
    <section className={styles.card} aria-label="Budget Feasibility Assessment">
      <h3 className={styles.title}>Budget Feasibility</h3>

      {/* Main Grid */}
      <div className={styles.grid}>
        {/* Total Cost Gauge */}
        <div className={styles.gaugeSection}>
          <div className={styles.meterContainer}>
            <svg className={styles.svg} viewBox="0 0 100 100">
              <circle className={styles.meterBg} cx="50" cy="50" r="40" />
              <circle
                className={styles.meterFill}
                cx="50"
                cy="50"
                r="40"
                style={{
                  stroke: statusColor,
                  strokeDasharray: `${(Math.min(percent, 100) / 100) * 251.2} 251.2`,
                }}
              />
            </svg>
            <div className={styles.meterInfo}>
              <span className={styles.meterValue}>${totalCost.toFixed(2)}</span>
              <span className={styles.meterLabel}>spent today</span>
            </div>
          </div>
        </div>

        {/* Budget Parameters */}
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Target Budget Limit</span>
            <span className={styles.statValue}>{limitLabel}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Budget Consumed</span>
            <span className={styles.statValue}>
              {budgetConfig.max === Infinity ? 'N/A' : `${Math.round(percent)}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Verdict Panel */}
      <div
        className={styles.verdictPanel}
        style={{
          '--status-color': statusColor,
          '--status-bg': statusBg,
          '--status-border': statusBorder,
        }}
      >
        <span className={styles.verdictIcon} aria-hidden="true">{statusIcon}</span>
        <div className={styles.verdictText}>
          <span className={styles.verdictTitle}>
            {isWithinBudget ? 'Budget Feasible' : 'Budget Exceeded'}
          </span>
          <p className={styles.advice}>{advice}</p>
        </div>
      </div>
    </section>
  );
}
