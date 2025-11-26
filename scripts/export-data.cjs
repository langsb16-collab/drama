const fs = require('fs');
const path = require('path');

// Read raw data
const restaurantsRaw = JSON.parse(fs.readFileSync('docs/data/restaurants-raw.json', 'utf8'));
const festivalsRaw = JSON.parse(fs.readFileSync('docs/data/festivals-raw.json', 'utf8'));
const menusRaw = JSON.parse(fs.readFileSync('docs/data/menus-raw.json', 'utf8'));

// Extract results
const restaurants = restaurantsRaw[0]?.results || [];
const festivals = festivalsRaw[0]?.results || [];
const menus = menusRaw[0]?.results || [];

// Group menus by restaurant_id
const menusByRestaurant = {};
menus.forEach(menu => {
  if (!menusByRestaurant[menu.restaurant_id]) {
    menusByRestaurant[menu.restaurant_id] = [];
  }
  menusByRestaurant[menu.restaurant_id].push(menu);
});

// Add menus to restaurants
const restaurantsWithMenus = restaurants.map(r => ({
  ...r,
  menus: menusByRestaurant[r.id] || []
}));

// Save processed data
fs.writeFileSync(
  'docs/data/restaurants.json',
  JSON.stringify({ restaurants: restaurantsWithMenus, total: restaurantsWithMenus.length }, null, 2)
);

fs.writeFileSync(
  'docs/data/festivals.json',
  JSON.stringify({ festivals, total: festivals.length }, null, 2)
);

// Create region-based indexes
const jeonnam = restaurantsWithMenus.filter(r => r.region === '전라남도');
const jeonbuk = restaurantsWithMenus.filter(r => r.region === '전라북도');

fs.writeFileSync(
  'docs/data/restaurants-jeonnam.json',
  JSON.stringify({ restaurants: jeonnam, total: jeonnam.length }, null, 2)
);

fs.writeFileSync(
  'docs/data/restaurants-jeonbuk.json',
  JSON.stringify({ restaurants: jeonbuk, total: jeonbuk.length }, null, 2)
);

// Create category indexes
const categories = {};
restaurantsWithMenus.forEach(r => {
  if (!categories[r.category]) {
    categories[r.category] = [];
  }
  categories[r.category].push(r);
});

Object.keys(categories).forEach(category => {
  const filename = `docs/data/category-${category}.json`;
  fs.writeFileSync(
    filename,
    JSON.stringify({ restaurants: categories[category], total: categories[category].length }, null, 2)
  );
});

console.log('✅ Data export completed!');
console.log(`📊 Restaurants: ${restaurants.length}`);
console.log(`📊 Festivals: ${festivals.length}`);
console.log(`📊 Menus: ${menus.length}`);
console.log(`📊 Jeonnam: ${jeonnam.length}`);
console.log(`📊 Jeonbuk: ${jeonbuk.length}`);
console.log(`📊 Categories: ${Object.keys(categories).join(', ')}`);
