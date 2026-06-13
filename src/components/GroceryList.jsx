/**
 * GroceryList.jsx
 * Consolidated grocery list with check-off capability.
 */
import { useState } from 'react';
import styles from './GroceryList.module.css';

/**
 * @param {{ items: GroceryItem[], totalCost: number }} props
 */
export function GroceryList({ items, totalCost }) {
  const [checked, setChecked] = useState(/** @type {Set<string>} */ (new Set()));

  function toggle(name) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  const done    = checked.size;
  const total   = items.length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <section className={styles.wrapper} aria-label="Grocery list">
      {/* Progress header */}
      <div className={styles.progressRow}>
        <span className={styles.progressLabel}>
          {done}/{total} items checked
        </span>
        <span className={styles.totalCost}>
          Est. Total: <strong>${totalCost.toFixed(2)}</strong>
        </span>
      </div>

      {/* Progress bar */}
      <div
        className={styles.progressBar}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% of grocery items checked`}
      >
        <div
          className={styles.progressFill}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* List */}
      <ul className={styles.list} role="list">
        {items.map((item) => {
          const isChecked = checked.has(item.name);
          return (
            <li key={item.name} className={styles.item}>
              <label className={`${styles.itemLabel} ${isChecked ? styles.itemChecked : ''}`}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={isChecked}
                  onChange={() => toggle(item.name)}
                  aria-label={`Mark ${item.name} as bought`}
                />
                <span className={styles.checkmark} aria-hidden="true" />
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemQty}>
                  {Number.isInteger(item.totalQty)
                    ? item.totalQty
                    : item.totalQty.toFixed(1)}{' '}
                  {item.unit}
                </span>
                <span className={styles.itemCost}>
                  ${item.totalCost.toFixed(2)}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {pct === 100 && (
        <div className={styles.allDone} aria-live="polite">
          🎉 You're all set! Happy cooking!
        </div>
      )}
    </section>
  );
}
