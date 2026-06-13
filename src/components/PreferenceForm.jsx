/**
 * PreferenceForm.jsx
 * Step-1: User inputs their day preferences.
 */
import styles from './PreferenceForm.module.css';
import { TIME_PRESETS, BUDGET_TIERS } from '../data/mealData.js';

const DIET_OPTIONS = [
  { value: 'none',         label: 'No Preference', emoji: '🍽️' },
  { value: 'vegetarian',   label: 'Vegetarian',     emoji: '🥦' },
  { value: 'vegan',        label: 'Vegan',           emoji: '🌱' },
  { value: 'low-carb',     label: 'Low Carb',        emoji: '🥩' },
  { value: 'high-protein', label: 'High Protein',    emoji: '💪' },
  { value: 'budget',       label: 'Budget Meals',    emoji: '💰' },
];

/**
 * @param {{ prefs: object, updatePref: function, onGenerate: function }} props
 */
export function PreferenceForm({ prefs, updatePref, onGenerate }) {
  const budgetEntries = Object.entries(BUDGET_TIERS);

  return (
    <div className={styles.form}>
      {/* Diet */}
      <section className={styles.section} aria-labelledby="diet-heading">
        <h2 id="diet-heading" className={styles.sectionTitle}>
          <span className={styles.step}>1</span> Dietary Preference
        </h2>
        <div className={styles.chipGrid} role="radiogroup" aria-labelledby="diet-heading">
          {DIET_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              role="radio"
              aria-checked={prefs.diet === opt.value}
              className={`${styles.chip} ${prefs.diet === opt.value ? styles.chipActive : ''}`}
              onClick={() => updatePref('diet', opt.value)}
            >
              <span className={styles.chipEmoji}>{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {/* Time */}
      <section className={styles.section} aria-labelledby="time-heading">
        <h2 id="time-heading" className={styles.sectionTitle}>
          <span className={styles.step}>2</span> How busy is your day?
        </h2>
        <div className={styles.cardGrid} role="radiogroup" aria-labelledby="time-heading">
          {TIME_PRESETS.map((t) => (
            <button
              key={t.value}
              role="radio"
              aria-checked={prefs.timePreset === t.value}
              className={`${styles.timeCard} ${prefs.timePreset === t.value ? styles.timeCardActive : ''}`}
              onClick={() => updatePref('timePreset', t.value)}
            >
              <span className={styles.timeLabel}>{t.label}</span>
              <span className={styles.timeDesc}>{t.description}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Budget */}
      <section className={styles.section} aria-labelledby="budget-heading">
        <h2 id="budget-heading" className={styles.sectionTitle}>
          <span className={styles.step}>3</span> Daily Food Budget
        </h2>
        <div className={styles.budgetGrid} role="radiogroup" aria-labelledby="budget-heading">
          {budgetEntries.map(([key, tier]) => (
            <button
              key={key}
              role="radio"
              aria-checked={prefs.budgetTier === key}
              className={`${styles.budgetCard} ${prefs.budgetTier === key ? styles.budgetCardActive : ''}`}
              style={{ '--tier-color': tier.color }}
              onClick={() => updatePref('budgetTier', key)}
            >
              <span className={styles.budgetLabel}>{tier.label}</span>
              <span className={styles.budgetDesc}>{tier.description}</span>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <button
        id="generate-plan-btn"
        className={styles.generateBtn}
        onClick={onGenerate}
        aria-label="Generate my personalized meal plan"
      >
        <span className={styles.generateIcon}>✨</span>
        Generate My Meal Plan
      </button>
    </div>
  );
}
