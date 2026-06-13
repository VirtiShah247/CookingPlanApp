/**
 * mealPlannerEngine.js
 * Pure business-logic functions – no React, no side-effects.
 * Easily unit-tested in isolation.
 */

import { MEAL_DATABASE, DIET_TAG_MAP } from '../data/mealData.js';

/**
 * Select a meal that fits dietary preference and time constraint.
 * Falls back to any available meal if no perfect match.
 * @param {'breakfast'|'lunch'|'dinner'} type
 * @param {string} diet
 * @param {number} maxMins
 * @param {string[]} excludeIds – already-used meal IDs
 * @returns {Meal}
 */
export function selectMeal(type, diet, maxMins, excludeIds = []) {
  const pool = MEAL_DATABASE[type];
  const allowedTags = DIET_TAG_MAP[diet] ?? [];

  // 1. Perfect match: correct diet + within time
  const perfect = pool.filter(
    (m) =>
      !excludeIds.includes(m.id) &&
      m.prepTime <= maxMins &&
      (allowedTags.length === 0 || allowedTags.some((t) => m.tags.includes(t)))
  );

  if (perfect.length > 0) return _randomPick(perfect);

  // 2. Relax time constraint
  const dietOnly = pool.filter(
    (m) =>
      !excludeIds.includes(m.id) &&
      (allowedTags.length === 0 || allowedTags.some((t) => m.tags.includes(t)))
  );
  if (dietOnly.length > 0) return _randomPick(dietOnly);

  // 3. Fallback: any meal not used
  const any = pool.filter((m) => !excludeIds.includes(m.id));
  return _randomPick(any.length ? any : pool);
}

/**
 * Build a full day meal plan.
 * @param {{ diet:string, maxMins:number }} prefs
 * @returns {{ breakfast:Meal, lunch:Meal, dinner:Meal }}
 */
export function generateMealPlan(prefs) {
  const { diet, maxMins } = prefs;
  const used = [];

  const breakfast = selectMeal('breakfast', diet, maxMins, used);
  used.push(breakfast.id);

  const lunch = selectMeal('lunch', diet, maxMins, used);
  used.push(lunch.id);

  const dinner = selectMeal('dinner', diet, maxMins, used);

  return { breakfast, lunch, dinner };
}

/**
 * Aggregate all ingredients across meals into a consolidated grocery list.
 * Deduplicates by ingredient name (case-insensitive).
 * @param {Meal[]} meals
 * @returns {GroceryItem[]}
 */
export function buildGroceryList(meals) {
  /** @type {Map<string, GroceryItem>} */
  const map = new Map();

  for (const meal of meals) {
    for (const ing of meal.ingredients) {
      const key = ing.name.toLowerCase();
      if (map.has(key)) {
        // Merge: accumulate quantity and cost
        const existing = map.get(key);
        existing.totalQty  += ing.qty;
        existing.totalCost += ing.qty * ing.pricePerUnit;
      } else {
        map.set(key, {
          name:          ing.name,
          unit:          ing.unit,
          totalQty:      ing.qty,
          pricePerUnit:  ing.pricePerUnit,
          totalCost:     ing.qty * ing.pricePerUnit,
          usedInMeals:   [meal.name],
        });
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Compute total estimated daily food cost.
 * @param {GroceryItem[]} groceryList
 * @returns {number} – in USD
 */
export function computeTotalCost(groceryList) {
  return groceryList.reduce((acc, item) => acc + item.totalCost, 0);
}

/**
 * Evaluate whether the plan fits within a daily budget.
 * Returns a structured assessment object.
 * @param {number} totalCost
 * @param {number} budgetMax
 * @returns {BudgetAssessment}
 */
export function assessBudget(totalCost, budgetMax) {
  const isWithinBudget = budgetMax === Infinity || totalCost <= budgetMax;
  const difference     = Math.abs(totalCost - (budgetMax === Infinity ? totalCost : budgetMax));
  const percent        = budgetMax === Infinity ? 100 : Math.min((totalCost / budgetMax) * 100, 200);

  let verdict, advice;
  if (budgetMax === Infinity) {
    verdict = 'flexible';
    advice  = 'No budget constraint applied. Enjoy your meals!';
  } else if (percent <= 70) {
    verdict = 'excellent';
    advice  = `You're $${difference.toFixed(2)} under budget — great value day!`;
  } else if (percent <= 90) {
    verdict = 'good';
    advice  = `Comfortably within budget with $${difference.toFixed(2)} to spare.`;
  } else if (percent <= 100) {
    verdict = 'tight';
    advice  = `Just within budget (${Math.round(percent)}% used). Consider swapping one item.`;
  } else {
    verdict = 'over';
    advice  = `$${difference.toFixed(2)} over budget. Substitutions below can help.`;
  }

  return { isWithinBudget, difference, percent, verdict, advice };
}

/**
 * Collect all substitutions from a list of meals, keyed by meal name.
 * @param {Meal[]} meals
 * @returns {Array<{ mealName:string, emoji:string, subs:Record<string,string> }>}
 */
export function collectSubstitutions(meals) {
  return meals
    .filter((m) => Object.keys(m.substitutions).length > 0)
    .map((m) => ({
      mealName: m.name,
      emoji:    m.emoji,
      subs:     m.substitutions,
    }));
}

/**
 * Compute per-meal cost summary.
 * @param {Meal} meal
 * @returns {number}
 */
export function computeMealCost(meal) {
  return meal.ingredients.reduce((acc, ing) => acc + ing.qty * ing.pricePerUnit, 0);
}

/**
 * Compute total calories for the day.
 * @param {{ breakfast:Meal, lunch:Meal, dinner:Meal }} plan
 * @returns {number}
 */
export function totalCalories(plan) {
  return plan.breakfast.calories + plan.lunch.calories + plan.dinner.calories;
}

/** @private */
function _randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
