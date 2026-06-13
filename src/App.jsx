/**
 * App.jsx
 * Main entry point of the AI Meal Planner Micro-app.
 */
import { useMealPlanner } from './hooks/useMealPlanner.js';
import { PreferenceForm } from './components/PreferenceForm.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';
import { MealCard } from './components/MealCard.jsx';
import { GroceryList } from './components/GroceryList.jsx';
import { Substitutions } from './components/Substitutions.jsx';
import { BudgetAssessment } from './components/BudgetAssessment.jsx';
import styles from './App.module.css';

export default function App() {
  const {
    prefs,
    updatePref,
    phase,
    derived,
    activeTab,
    setActiveTab,
    generate,
    regenerate,
    reset,
    plan,
  } = useMealPlanner();

  return (
    <div className={styles.appContainer}>
      {/* Header */}
      <header className={styles.appHeader}>
        <div className={styles.logoRow}>
          <span className={styles.logoIcon} aria-hidden="true">🤖🍳</span>
          <h1 className={styles.logoText}>ChefAI</h1>
        </div>
        <p className={styles.subtitle}>
          Your daily cooking task helper, tailored to your schedule and budget.
        </p>
      </header>

      {/* Main Content Area */}
      <main className={styles.main}>
        {phase === 'idle' && (
          <div className={styles.cardWrapper}>
            <PreferenceForm
              prefs={prefs}
              updatePref={updatePref}
              onGenerate={generate}
            />
          </div>
        )}

        {phase === 'loading' && <LoadingScreen />}

        {phase === 'result' && derived && (
          <div className={styles.resultsLayout}>
            {/* Header action bar */}
            <div className={styles.resultActions}>
              <button className={styles.backBtn} onClick={reset} aria-label="Start over with new choices">
                ⬅️ Customize Options
              </button>
              <button className={styles.regenBtn} onClick={regenerate} aria-label="Regenerate different meals">
                🔄 Refesh Recommendations
              </button>
            </div>

            {/* Daily Summary Stats */}
            <div className={styles.summaryBar}>
              <div className={styles.summaryStat}>
                <span className={styles.statLabel}>Day's Est. Cost</span>
                <span className={styles.statVal}>${derived.totalCost.toFixed(2)}</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statLabel}>Daily Calories</span>
                <span className={styles.statVal}>{derived.calories} kcal</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statLabel}>Preps Selected</span>
                <span className={styles.statVal}>3 Meals</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className={styles.tabs} role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'meals'}
                className={`${styles.tab} ${activeTab === 'meals' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('meals')}
              >
                🍽️ Day Plan
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'grocery'}
                className={`${styles.tab} ${activeTab === 'grocery' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('grocery')}
              >
                🛒 Grocery List
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'budget'}
                className={`${styles.tab} ${activeTab === 'budget' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('budget')}
              >
                📊 Budget Assessment
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'subs'}
                className={`${styles.tab} ${activeTab === 'subs' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('subs')}
              >
                🔄 Substitutions
              </button>
            </div>

            {/* Tab Panels */}
            <div className={styles.panelContent}>
              {activeTab === 'meals' && (
                <div className={styles.mealsGrid}>
                  <MealCard type="breakfast" meal={plan.breakfast} cost={derived.mealCosts.breakfast} />
                  <MealCard type="lunch" meal={plan.lunch} cost={derived.mealCosts.lunch} />
                  <MealCard type="dinner" meal={plan.dinner} cost={derived.mealCosts.dinner} />
                </div>
              )}

              {activeTab === 'grocery' && (
                <GroceryList items={derived.groceryList} totalCost={derived.totalCost} />
              )}

              {activeTab === 'budget' && (
                <BudgetAssessment
                  assessment={derived.budgetAssess}
                  budgetConfig={derived.budgetConfig}
                  totalCost={derived.totalCost}
                />
              )}

              {activeTab === 'subs' && (
                <Substitutions substitutions={derived.substitutions} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={styles.appFooter}>
        <p>© 2026 ChefAI App. Optimized local client resource management.</p>
      </footer>
    </div>
  );
}
