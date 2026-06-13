/**
 * MealCard.jsx
 * Displays a single meal (breakfast / lunch / dinner).
 */
import styles from './MealCard.module.css';

const MEAL_TYPE_META = {
  breakfast: { label: 'Breakfast', icon: '🌅', gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
  lunch:     { label: 'Lunch',     icon: '☀️', gradient: 'linear-gradient(135deg,#22c55e,#0ea5e9)' },
  dinner:    { label: 'Dinner',    icon: '🌙', gradient: 'linear-gradient(135deg,#6c63ff,#a855f7)' },
};

/**
 * @param {{ type:'breakfast'|'lunch'|'dinner', meal:object, cost:number }} props
 */
export function MealCard({ type, meal, cost }) {
  const meta = MEAL_TYPE_META[type];

  return (
    <article
      className={styles.card}
      aria-label={`${meta.label}: ${meal.name}`}
    >
      {/* Header */}
      <header className={styles.header} style={{ '--meal-gradient': meta.gradient }}>
        <div className={styles.mealTypeTag}>
          {meta.icon} {meta.label}
        </div>
        <div className={styles.emoji} aria-hidden="true">{meal.emoji}</div>
      </header>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.mealName}>{meal.name}</h3>

        {/* Stats row */}
        <div className={styles.stats}>
          <Stat icon="🔥" value={meal.calories} unit="kcal" label="Calories" />
          <Stat icon="⏱️" value={meal.prepTime} unit="min" label="Prep time" />
          <Stat icon="💵" value={`$${cost.toFixed(2)}`} label="Est. cost" />
        </div>

        {/* Tags */}
        <div className={styles.tags} aria-label="Meal tags">
          {meal.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        {/* Ingredients preview */}
        <details className={styles.details}>
          <summary className={styles.summary}>
            📋 Ingredients ({meal.ingredients.length})
          </summary>
          <ul className={styles.ingredientList} role="list">
            {meal.ingredients.map((ing) => (
              <li key={ing.name} className={styles.ingredientItem}>
                <span className={styles.ingName}>{ing.name}</span>
                <span className={styles.ingQty}>
                  {ing.qty} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </article>
  );
}

/** Small inline stat badge */
function Stat({ icon, value, unit, label }) {
  return (
    <div className={styles.stat} aria-label={label}>
      <span aria-hidden="true">{icon}</span>
      <span className={styles.statValue}>
        {value}{unit && <small> {unit}</small>}
      </span>
    </div>
  );
}
