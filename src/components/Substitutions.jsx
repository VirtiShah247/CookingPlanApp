/**
 * Substitutions.jsx
 * Displays alternative options for meal ingredients.
 */
import styles from './Substitutions.module.css';

/**
 * @param {{ substitutions: Array<{ mealName:string, emoji:string, subs:Record<string,string> }> }} props
 */
export function Substitutions({ substitutions }) {
  if (!substitutions || substitutions.length === 0) {
    return (
      <div className={styles.empty}>
        No alternative ingredients needed for these meals.
      </div>
    );
  }

  return (
    <section className={styles.container} aria-label="Ingredient Substitutions">
      <p className={styles.intro}>
        Need to swap ingredients? Here are budget-friendly and allergy-conscious suggestions for your plan:
      </p>

      <div className={styles.list}>
        {substitutions.map((item, idx) => (
          <div key={idx} className={styles.mealGroup}>
            <h3 className={styles.mealTitle}>
              <span className={styles.emoji} aria-hidden="true">{item.emoji}</span>
              {item.mealName}
            </h3>
            <div className={styles.grid}>
              {Object.entries(item.subs).map(([original, sub]) => (
                <div key={original} className={styles.row}>
                  <div className={styles.original}>
                    <span className={styles.label}>Use instead of:</span>
                    <span className={styles.ingName}>{original}</span>
                  </div>
                  <div className={styles.arrow} aria-hidden="true">➡️</div>
                  <div className={styles.substitute}>
                    <span className={styles.label}>Alternative:</span>
                    <span className={styles.subName}>{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
