import {Ingredient} from './types';

function daysFromNowOn(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return date;
}

export const testIngredients = [
  {
    ingredientName: 'Banana',
    category: 'fruit',
    location: 'fridge',
    confectionType: 'fresh',
    expirationDate: daysFromNowOn(1),
    timestamp: Date.now() - 1000,
    ripeness: 'ripe',
    ripenessTimestamp: Date.now() - (260500000*2),
  },
  {
    ingredientName: 'Carrots',
    category: 'vegetable',
    location: 'fridge',
    confectionType: 'fresh',
    expirationDate: daysFromNowOn(2),
    timestamp: Date.now() - 2000,
    ripenessTimestamp: Date.now() - 60,
  },
  {
    ingredientName: 'Milk',
    category: 'dairy',
    location: 'fridge',
    expirationDate: daysFromNowOn(3),
    timestamp: Date.now() - 3000,
    ripenessTimestamp: Date.now() - 70,
  },
  {
    ingredientName: 'Salmon',
    category: 'fish',
    location: 'freezer',
    confectionType: 'frozen',
    expirationDate: daysFromNowOn(5),
    timestamp: Date.now() - 4000,
    ripenessTimestamp: Date.now() - 80, // Added ripenessTimestamp
  },
  {
    ingredientName: 'Chicken Thighs',
    category: 'meat',
    location: 'fridge',
    expirationDate: daysFromNowOn(4),
    timestamp: Date.now() - 5000,
    ripenessTimestamp: Date.now() - 90, // Added ripenessTimestamp
  },
  {
    ingredientName: 'Orange Juice',
    category: 'liquid',
    location: 'fridge',
    expirationDate: daysFromNowOn(1),
    timestamp: Date.now() - 6000,
    ripenessTimestamp: Date.now() - 100, // Added ripenessTimestamp
  },
  {
    ingredientName: 'Strawberries',
    category: 'fruit',
    location: 'fridge',
    confectionType: 'fresh',
    expirationDate: daysFromNowOn(3),
    timestamp: Date.now() - 7000,
    ripenessTimestamp: Date.now() - 110, // Added ripenessTimestamp
  },
  {
    ingredientName: 'Canned Corn',
    category: 'vegetable',
    location: 'pantry',
    confectionType: 'canned',
    expirationDate: daysFromNowOn(10),
    timestamp: Date.now() - 8000,
    ripenessTimestamp: Date.now() - 120, // Added ripenessTimestamp
  },
  {
    ingredientName: 'Yogurt',
    category: 'dairy',
    location: 'fridge',
    confectionType: 'canned',
    expirationDate: daysFromNowOn(11),
    timestamp: Date.now() - 9000,
    ripenessTimestamp: Date.now() - 130, // Added ripenessTimestamp
  },
  {
    ingredientName: 'Tuna',
    category: 'fish',
    location: 'pantry',
    confectionType: 'canned',
    expirationDate: daysFromNowOn(11),
    timestamp: Date.now() - 10000,
    ripenessTimestamp: Date.now() - 140, // Added ripenessTimestamp
  },
  {
    ingredientName: 'Pork Chops',
    category: 'meat',
    location: 'fridge',
    expirationDate: daysFromNowOn(12),
    timestamp: Date.now() - 11000,
    ripenessTimestamp: Date.now() - 150,
  },
  {
    ingredientName: 'Lemon',
    category: 'fruit',
    location: 'fridge',
    confectionType: 'fresh',
    expirationDate: daysFromNowOn(13),
    timestamp: Date.now() - 12000,
    ripenessTimestamp: Date.now() - 160,
  },
  {
    ingredientName: 'Spinach',
    category: 'vegetable',
    location: 'fridge',
    confectionType: 'fresh',
    expirationDate: daysFromNowOn(14),
    quantity: 7,
    timestamp: Date.now() - 13000,
    ripenessTimestamp: Date.now() - 170,
  },
  {
    ingredientName: 'Frozen Peas',
    category: 'vegetable',
    location: 'freezer',
    confectionType: 'frozen',
    expirationDate: daysFromNowOn(15),
    quantity: 20,
    timestamp: Date.now() - 14000,
    ripenessTimestamp: Date.now() - 180,
  },
  {
    ingredientName: 'Ground Beef',
    category: 'meat',
    location: 'fridge',
    expirationDate: daysFromNowOn(16),
    quantity: 2,
    timestamp: Date.now() - 15000,
    ripenessTimestamp: Date.now() - 190,
  },
  {
    ingredientName: 'Green Beans',
    category: 'vegetable',
    location: 'freezer',
    confectionType: 'frozen',
    expirationDate: daysFromNowOn(17),
    timestamp: Date.now() - 16000,
    ripenessTimestamp: Date.now() - 200,
  },
  {
    ingredientName: 'Cheddar Cheese',
    category: 'dairy',
    location: 'fridge',
    expirationDate: daysFromNowOn(3),
    timestamp: Date.now() - 17000,
    ripenessTimestamp: Date.now() - 210,
  },
  {
    ingredientName: 'Beef Roast',
    category: 'meat',
    location: 'freezer',
    confectionType: 'fresh',
    expirationDate: daysFromNowOn(42),
    timestamp: Date.now() - 18000,
    ripeness: 'ripe',
    ripenessTimestamp: Date.now() - 259500000,
  },
];
