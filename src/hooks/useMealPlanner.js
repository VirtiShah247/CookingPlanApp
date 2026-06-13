/**
 * useMealPlanner.js
 * Custom React hook encapsulating all planner state and derived data.
 * Separates state management from UI components.
 */

import { useState, useCallback, useMemo } from 'react';
import {
  generateMealPlan,
  buildGroceryList,
  computeTotalCost,
  assessBudget,
  collectSubstitutions,
  computeMealCost,
  totalCalories,
} from '../engine/mealPlannerEngine.js';
import { BUDGET_TIERS, TIME_PRESETS } from '../data/mealData.js';

/** @returns Initial form state */
function initialPrefs() {
  return {
    diet:      'none',
    timePreset: 'moderate',
    budgetTier: 'moderate',
  };
}

/**
 * @typedef {'idle'|'loading'|'result'} PlannerPhase
 */

export function useMealPlanner() {
  const [prefs,   setPrefs]   = useState(initialPrefs());
  const [plan,    setPlan]    = useState(null);
  const [phase,   setPhase]   = useState('idle');   // 'idle' | 'loading' | 'result'
  const [activeTab, setActiveTab] = useState('meals');

  /** Update a single preference key */
  const updatePref = useCallback((key, value) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  }, []);

  /** Reset everything back to the form */
  const reset = useCallback(() => {
    setPlan(null);
    setPrefs(initialPrefs());
    setPhase('idle');
    setActiveTab('meals');
  }, []);

  /**
   * Generate the meal plan with a brief artificial delay
   * to give the user loading feedback.
   */
  const generate = useCallback(() => {
    setPhase('loading');

    const timeConfig   = TIME_PRESETS.find((t) => t.value === prefs.timePreset) ?? TIME_PRESETS[2];
    const budgetConfig = BUDGET_TIERS[prefs.budgetTier] ?? BUDGET_TIERS.moderate;

    setTimeout(() => {
      const mealPlan = generateMealPlan({
        diet:    prefs.diet,
        maxMins: timeConfig.maxMins,
      });
      setPlan(mealPlan);
      setPhase('result');
      setActiveTab('meals');
    }, 1200); // Simulated AI "thinking" time
  }, [prefs]);

  /** Regenerate with same prefs */
  const regenerate = useCallback(() => {
    setPhase('loading');
    const timeConfig   = TIME_PRESETS.find((t) => t.value === prefs.timePreset) ?? TIME_PRESETS[2];

    setTimeout(() => {
      const mealPlan = generateMealPlan({
        diet:    prefs.diet,
        maxMins: timeConfig.maxMins,
      });
      setPlan(mealPlan);
      setPhase('result');
    }, 900);
  }, [prefs]);

  /* ── Derived Data (memoised) ───────────────────────────── */
  const derived = useMemo(() => {
    if (!plan) return null;

    const meals        = [plan.breakfast, plan.lunch, plan.dinner];
    const groceryList  = buildGroceryList(meals);
    const totalCost    = computeTotalCost(groceryList);
    const budgetConfig = BUDGET_TIERS[prefs.budgetTier];
    const budgetAssess = assessBudget(totalCost, budgetConfig.max);
    const substitutions = collectSubstitutions(meals);
    const calories      = totalCalories(plan);

    const mealCosts = {
      breakfast: computeMealCost(plan.breakfast),
      lunch:     computeMealCost(plan.lunch),
      dinner:    computeMealCost(plan.dinner),
    };

    return {
      groceryList,
      totalCost,
      budgetAssess,
      budgetConfig,
      substitutions,
      calories,
      mealCosts,
    };
  }, [plan, prefs.budgetTier]);

  return {
    prefs,
    updatePref,
    plan,
    phase,
    derived,
    activeTab,
    setActiveTab,
    generate,
    regenerate,
    reset,
  };
}
