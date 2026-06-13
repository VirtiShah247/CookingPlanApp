/**
 * mealData.js
 * Central data store for meals, ingredients, substitutions and pricing.
 * Keeping data separate from logic makes testing and maintenance easy.
 */

/** @typedef {{ name:string, qty:string, unit:string, pricePerUnit:number }} Ingredient */
/** @typedef {{ name:string, calories:number, prepTime:number, tags:string[], ingredients:Ingredient[], substitutions:Record<string,string> }} Meal */

export const MEAL_DATABASE = {
  breakfast: [
    {
      id: 'b1',
      name: 'Avocado Toast with Eggs',
      emoji: '🥑',
      calories: 420,
      prepTime: 15,
      tags: ['vegetarian', 'high-protein', 'quick'],
      ingredients: [
        { name: 'Sourdough bread',  qty: 2,   unit: 'slices',  pricePerUnit: 0.40 },
        { name: 'Avocado',          qty: 1,   unit: 'whole',   pricePerUnit: 1.20 },
        { name: 'Eggs',             qty: 2,   unit: 'large',   pricePerUnit: 0.35 },
        { name: 'Cherry tomatoes',  qty: 0.5, unit: 'cup',     pricePerUnit: 0.80 },
        { name: 'Lemon',            qty: 0.5, unit: 'whole',   pricePerUnit: 0.30 },
        { name: 'Red chili flakes', qty: 1,   unit: 'tsp',     pricePerUnit: 0.05 },
      ],
      substitutions: {
        'Avocado':         'Hummus or cream cheese',
        'Sourdough bread': 'Whole wheat or gluten-free bread',
        'Eggs':            'Tofu scramble (vegan option)',
      },
    },
    {
      id: 'b2',
      name: 'Greek Yogurt Parfait',
      emoji: '🫙',
      calories: 310,
      prepTime: 5,
      tags: ['vegetarian', 'no-cook', 'quick', 'high-protein'],
      ingredients: [
        { name: 'Greek yogurt',  qty: 1,   unit: 'cup',    pricePerUnit: 1.00 },
        { name: 'Granola',       qty: 0.5, unit: 'cup',    pricePerUnit: 0.60 },
        { name: 'Mixed berries', qty: 0.5, unit: 'cup',    pricePerUnit: 1.20 },
        { name: 'Honey',         qty: 1,   unit: 'tbsp',   pricePerUnit: 0.20 },
        { name: 'Chia seeds',    qty: 1,   unit: 'tsp',    pricePerUnit: 0.15 },
      ],
      substitutions: {
        'Greek yogurt':  'Coconut yogurt (dairy-free)',
        'Mixed berries': 'Sliced banana or mango',
        'Granola':       'Oats or crushed nuts',
      },
    },
    {
      id: 'b3',
      name: 'Oatmeal with Banana & Nuts',
      emoji: '🥣',
      calories: 380,
      prepTime: 10,
      tags: ['vegan', 'budget-friendly', 'high-fiber'],
      ingredients: [
        { name: 'Rolled oats',  qty: 1,   unit: 'cup',   pricePerUnit: 0.25 },
        { name: 'Banana',       qty: 1,   unit: 'whole', pricePerUnit: 0.30 },
        { name: 'Almonds',      qty: 2,   unit: 'tbsp',  pricePerUnit: 0.40 },
        { name: 'Cinnamon',     qty: 0.5, unit: 'tsp',   pricePerUnit: 0.05 },
        { name: 'Maple syrup',  qty: 1,   unit: 'tbsp',  pricePerUnit: 0.30 },
        { name: 'Almond milk',  qty: 1,   unit: 'cup',   pricePerUnit: 0.50 },
      ],
      substitutions: {
        'Almond milk':  'Oat milk or dairy milk',
        'Almonds':      'Walnuts or pumpkin seeds',
        'Maple syrup':  'Honey or agave',
      },
    },
    {
      id: 'b4',
      name: 'Veggie Omelette',
      emoji: '🍳',
      calories: 350,
      prepTime: 12,
      tags: ['vegetarian', 'low-carb', 'high-protein'],
      ingredients: [
        { name: 'Eggs',          qty: 3,   unit: 'large', pricePerUnit: 0.35 },
        { name: 'Bell pepper',   qty: 0.5, unit: 'whole', pricePerUnit: 0.60 },
        { name: 'Onion',         qty: 0.25, unit: 'whole',pricePerUnit: 0.20 },
        { name: 'Spinach',       qty: 1,   unit: 'cup',   pricePerUnit: 0.50 },
        { name: 'Feta cheese',   qty: 2,   unit: 'tbsp',  pricePerUnit: 0.45 },
        { name: 'Olive oil',     qty: 1,   unit: 'tsp',   pricePerUnit: 0.10 },
      ],
      substitutions: {
        'Feta cheese': 'Goat cheese or skip (vegan)',
        'Eggs':        'Chickpea flour batter (vegan)',
        'Spinach':     'Kale or mushrooms',
      },
    },
  ],

  lunch: [
    {
      id: 'l1',
      name: 'Grilled Chicken Caesar Salad',
      emoji: '🥗',
      calories: 480,
      prepTime: 20,
      tags: ['high-protein', 'low-carb'],
      ingredients: [
        { name: 'Chicken breast',     qty: 150,  unit: 'g',     pricePerUnit: 0.016 },
        { name: 'Romaine lettuce',    qty: 2,    unit: 'cups',  pricePerUnit: 0.70 },
        { name: 'Parmesan',           qty: 2,    unit: 'tbsp',  pricePerUnit: 0.40 },
        { name: 'Croutons',           qty: 0.25, unit: 'cup',   pricePerUnit: 0.30 },
        { name: 'Caesar dressing',    qty: 2,    unit: 'tbsp',  pricePerUnit: 0.35 },
        { name: 'Lemon',              qty: 0.5,  unit: 'whole', pricePerUnit: 0.30 },
      ],
      substitutions: {
        'Chicken breast':  'Grilled tofu or chickpeas (vegan)',
        'Caesar dressing': 'Tahini-lemon dressing (vegan)',
        'Parmesan':        'Nutritional yeast (dairy-free)',
      },
    },
    {
      id: 'l2',
      name: 'Lentil Soup with Crusty Bread',
      emoji: '🍲',
      calories: 420,
      prepTime: 30,
      tags: ['vegan', 'budget-friendly', 'high-fiber'],
      ingredients: [
        { name: 'Red lentils',  qty: 1,   unit: 'cup',   pricePerUnit: 0.50 },
        { name: 'Carrot',       qty: 1,   unit: 'whole', pricePerUnit: 0.25 },
        { name: 'Celery',       qty: 2,   unit: 'stalks',pricePerUnit: 0.30 },
        { name: 'Onion',        qty: 1,   unit: 'whole', pricePerUnit: 0.40 },
        { name: 'Garlic',       qty: 3,   unit: 'cloves',pricePerUnit: 0.10 },
        { name: 'Cumin',        qty: 1,   unit: 'tsp',   pricePerUnit: 0.05 },
        { name: 'Turmeric',     qty: 0.5, unit: 'tsp',   pricePerUnit: 0.05 },
        { name: 'Crusty bread', qty: 1,   unit: 'slice', pricePerUnit: 0.40 },
      ],
      substitutions: {
        'Red lentils':  'Green lentils or split peas',
        'Crusty bread': 'Rice or quinoa',
        'Celery':       'Fennel or parsnip',
      },
    },
    {
      id: 'l3',
      name: 'Turkey & Veggie Wrap',
      emoji: '🌯',
      calories: 460,
      prepTime: 10,
      tags: ['high-protein', 'quick'],
      ingredients: [
        { name: 'Whole wheat tortilla', qty: 1,   unit: 'large', pricePerUnit: 0.50 },
        { name: 'Turkey slices',        qty: 100, unit: 'g',     pricePerUnit: 0.022 },
        { name: 'Lettuce',              qty: 1,   unit: 'cup',   pricePerUnit: 0.30 },
        { name: 'Tomato',               qty: 1,   unit: 'whole', pricePerUnit: 0.50 },
        { name: 'Avocado',              qty: 0.5, unit: 'whole', pricePerUnit: 0.60 },
        { name: 'Mustard',              qty: 1,   unit: 'tsp',   pricePerUnit: 0.05 },
      ],
      substitutions: {
        'Turkey slices':        'Chicken or hummus (vegetarian)',
        'Whole wheat tortilla': 'Lettuce wrap (low-carb)',
        'Avocado':              'Tzatziki or cream cheese',
      },
    },
    {
      id: 'l4',
      name: 'Quinoa Buddha Bowl',
      emoji: '🥙',
      calories: 510,
      prepTime: 25,
      tags: ['vegan', 'gluten-free', 'high-fiber'],
      ingredients: [
        { name: 'Quinoa',           qty: 0.75, unit: 'cup',   pricePerUnit: 0.90 },
        { name: 'Chickpeas',        qty: 0.5,  unit: 'cup',   pricePerUnit: 0.40 },
        { name: 'Sweet potato',     qty: 1,    unit: 'small', pricePerUnit: 0.60 },
        { name: 'Kale',             qty: 1,    unit: 'cup',   pricePerUnit: 0.60 },
        { name: 'Tahini',           qty: 1,    unit: 'tbsp',  pricePerUnit: 0.30 },
        { name: 'Lemon',            qty: 0.5,  unit: 'whole', pricePerUnit: 0.30 },
        { name: 'Olive oil',        qty: 1,    unit: 'tbsp',  pricePerUnit: 0.15 },
      ],
      substitutions: {
        'Quinoa':       'Brown rice or farro',
        'Chickpeas':    'Black beans or lentils',
        'Sweet potato': 'Butternut squash or beets',
      },
    },
  ],

  dinner: [
    {
      id: 'd1',
      name: 'Baked Salmon with Roasted Veggies',
      emoji: '🍣',
      calories: 580,
      prepTime: 35,
      tags: ['high-protein', 'gluten-free', 'omega-3'],
      ingredients: [
        { name: 'Salmon fillet',    qty: 200, unit: 'g',     pricePerUnit: 0.025 },
        { name: 'Broccoli',         qty: 1,   unit: 'cup',   pricePerUnit: 0.70 },
        { name: 'Zucchini',         qty: 1,   unit: 'whole', pricePerUnit: 0.60 },
        { name: 'Cherry tomatoes',  qty: 0.5, unit: 'cup',   pricePerUnit: 0.80 },
        { name: 'Olive oil',        qty: 2,   unit: 'tbsp',  pricePerUnit: 0.30 },
        { name: 'Garlic',           qty: 2,   unit: 'cloves',pricePerUnit: 0.10 },
        { name: 'Lemon',            qty: 1,   unit: 'whole', pricePerUnit: 0.60 },
        { name: 'Fresh dill',       qty: 1,   unit: 'tbsp',  pricePerUnit: 0.20 },
      ],
      substitutions: {
        'Salmon fillet': 'Tilapia or tofu steak (vegan)',
        'Fresh dill':    'Parsley or tarragon',
        'Zucchini':      'Eggplant or bell pepper',
      },
    },
    {
      id: 'd2',
      name: 'Spaghetti Bolognese',
      emoji: '🍝',
      calories: 650,
      prepTime: 40,
      tags: ['comfort-food', 'high-protein'],
      ingredients: [
        { name: 'Spaghetti',        qty: 100,  unit: 'g',     pricePerUnit: 0.012 },
        { name: 'Ground beef',      qty: 150,  unit: 'g',     pricePerUnit: 0.018 },
        { name: 'Tomato passata',   qty: 1,    unit: 'cup',   pricePerUnit: 0.80 },
        { name: 'Onion',            qty: 1,    unit: 'whole', pricePerUnit: 0.40 },
        { name: 'Garlic',           qty: 3,    unit: 'cloves',pricePerUnit: 0.10 },
        { name: 'Carrot',           qty: 1,    unit: 'whole', pricePerUnit: 0.25 },
        { name: 'Celery',           qty: 1,    unit: 'stalk', pricePerUnit: 0.15 },
        { name: 'Parmesan',         qty: 2,    unit: 'tbsp',  pricePerUnit: 0.40 },
        { name: 'Olive oil',        qty: 1,    unit: 'tbsp',  pricePerUnit: 0.15 },
        { name: 'Italian herbs',    qty: 1,    unit: 'tsp',   pricePerUnit: 0.05 },
      ],
      substitutions: {
        'Ground beef':    'Ground turkey or lentils (vegetarian)',
        'Spaghetti':      'Zucchini noodles (low-carb) or GF pasta',
        'Tomato passata': 'Crushed canned tomatoes',
      },
    },
    {
      id: 'd3',
      name: 'Chicken Tikka Masala',
      emoji: '🍛',
      calories: 560,
      prepTime: 45,
      tags: ['high-protein', 'comfort-food'],
      ingredients: [
        { name: 'Chicken breast',   qty: 200,  unit: 'g',    pricePerUnit: 0.016 },
        { name: 'Yogurt',           qty: 0.5,  unit: 'cup',  pricePerUnit: 0.50 },
        { name: 'Tomato passata',   qty: 1,    unit: 'cup',  pricePerUnit: 0.80 },
        { name: 'Heavy cream',      qty: 0.25, unit: 'cup',  pricePerUnit: 0.60 },
        { name: 'Onion',            qty: 1,    unit: 'whole',pricePerUnit: 0.40 },
        { name: 'Garlic',           qty: 4,    unit: 'cloves',pricePerUnit: 0.10 },
        { name: 'Ginger',           qty: 1,    unit: 'inch', pricePerUnit: 0.20 },
        { name: 'Tikka masala spice mix', qty: 2, unit: 'tbsp', pricePerUnit: 0.15 },
        { name: 'Basmati rice',     qty: 0.75, unit: 'cup',  pricePerUnit: 0.40 },
      ],
      substitutions: {
        'Chicken breast': 'Paneer or chickpeas (vegetarian)',
        'Heavy cream':    'Coconut cream (dairy-free)',
        'Yogurt':         'Coconut yogurt (dairy-free)',
      },
    },
    {
      id: 'd4',
      name: 'Black Bean Tacos',
      emoji: '🌮',
      calories: 490,
      prepTime: 20,
      tags: ['vegan', 'budget-friendly', 'quick'],
      ingredients: [
        { name: 'Black beans',    qty: 1,   unit: 'can',   pricePerUnit: 1.20 },
        { name: 'Corn tortillas', qty: 4,   unit: 'small', pricePerUnit: 0.20 },
        { name: 'Avocado',        qty: 1,   unit: 'whole', pricePerUnit: 1.20 },
        { name: 'Lime',           qty: 1,   unit: 'whole', pricePerUnit: 0.40 },
        { name: 'Red cabbage',    qty: 1,   unit: 'cup',   pricePerUnit: 0.50 },
        { name: 'Cilantro',       qty: 2,   unit: 'tbsp',  pricePerUnit: 0.20 },
        { name: 'Salsa',          qty: 0.5, unit: 'cup',   pricePerUnit: 0.60 },
        { name: 'Jalapeño',       qty: 1,   unit: 'whole', pricePerUnit: 0.30 },
      ],
      substitutions: {
        'Black beans':    'Pinto beans or lentils',
        'Corn tortillas': 'Flour tortillas or lettuce cups',
        'Avocado':        'Sour cream or tahini',
      },
    },
  ],
};

/** Map dietary preference to tag filters */
export const DIET_TAG_MAP = {
  none:        [],
  vegetarian:  ['vegetarian', 'vegan'],
  vegan:       ['vegan'],
  'low-carb':  ['low-carb', 'gluten-free'],
  'high-protein': ['high-protein'],
  'budget':    ['budget-friendly'],
};

/**
 * Budget tiers (USD per day)
 */
export const BUDGET_TIERS = {
  tight:     { max: 10, label: 'Tight',  color: '#ef4444', description: 'Under $10/day' },
  moderate:  { max: 20, label: 'Moderate',color: '#f59e0b', description: '$10–$20/day' },
  comfortable:{ max: 40, label: 'Comfortable', color: '#22c55e', description: '$20–$40/day' },
  flexible:  { max: Infinity, label: 'Flexible', color: '#6c63ff', description: 'No limit' },
};

export const TIME_PRESETS = [
  { value: 'very-busy', label: 'Very Busy', maxMins: 15, description: 'Under 15 min per meal' },
  { value: 'somewhat-busy', label: 'Somewhat Busy', maxMins: 30, description: 'Under 30 min per meal' },
  { value: 'moderate', label: 'Moderate', maxMins: 45, description: 'Up to 45 min per meal' },
  { value: 'relaxed', label: 'Relaxed', maxMins: 999, description: 'No time restriction' },
];
