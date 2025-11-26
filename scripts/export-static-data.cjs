const { execSync } = require('child_process');
const fs = require('fs');

console.log('📦 Exporting data from D1 database...\n');

// Function to execute SQL and get JSON
function queryD1(sql) {
  try {
    const command = `npx wrangler d1 execute jeonlado-production --local --command="${sql}" --json`;
    const output = execSync(command, { cwd: '/home/user/webapp', encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    
    // Find the JSON array in the output
    const lines = output.split('\n');
    const jsonStart = lines.findIndex(line => line.trim().startsWith('['));
    if (jsonStart === -1) {
      console.error('No JSON found in output');
      return [];
    }
    
    const jsonText = lines.slice(jsonStart).join('\n');
    const data = JSON.parse(jsonText);
    return data[0]?.results || [];
  } catch (error) {
    console.error(`Error executing query: ${sql}`);
    console.error(error.message);
    return [];
  }
}

// Export restaurants
console.log('🍴 Fetching restaurants...');
const restaurants = queryD1('SELECT * FROM restaurants');
console.log(`   Found ${restaurants.length} restaurants`);

// Export festivals
console.log('🎉 Fetching festivals...');
const festivals = queryD1('SELECT * FROM festivals');
console.log(`   Found ${festivals.length} festivals`);

// Export menus
console.log('🍜 Fetching menus...');
const menus = queryD1('SELECT * FROM menus');
console.log(`   Found ${menus.length} menus`);

// Export travel agencies
console.log('✈️  Fetching travel agencies...');
const travelAgencies = queryD1('SELECT * FROM travel_agencies');
console.log(`   Found ${travelAgencies.length} travel agencies`);

// Group menus by restaurant
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

// Save main data files
console.log('\n💾 Saving JSON files...');

fs.writeFileSync(
  'docs/data/restaurants.json',
  JSON.stringify({ restaurants: restaurantsWithMenus, total: restaurantsWithMenus.length }, null, 2)
);
console.log('   ✅ docs/data/restaurants.json');

fs.writeFileSync(
  'docs/data/festivals.json',
  JSON.stringify({ festivals, total: festivals.length }, null, 2)
);
console.log('   ✅ docs/data/festivals.json');

fs.writeFileSync(
  'docs/data/travel-agencies.json',
  JSON.stringify({ agencies: travelAgencies, total: travelAgencies.length }, null, 2)
);
console.log('   ✅ docs/data/travel-agencies.json');

// Create region indexes
const jeonnam = restaurantsWithMenus.filter(r => r.region === '전라남도');
const jeonbuk = restaurantsWithMenus.filter(r => r.region === '전라북도');

fs.writeFileSync(
  'docs/data/restaurants-jeonnam.json',
  JSON.stringify({ restaurants: jeonnam, total: jeonnam.length }, null, 2)
);
console.log(`   ✅ docs/data/restaurants-jeonnam.json (${jeonnam.length} items)`);

fs.writeFileSync(
  'docs/data/restaurants-jeonbuk.json',
  JSON.stringify({ restaurants: jeonbuk, total: jeonbuk.length }, null, 2)
);
console.log(`   ✅ docs/data/restaurants-jeonbuk.json (${jeonbuk.length} items)`);

// Create stats file
const stats = {
  total_restaurants: restaurants.length,
  total_festivals: festivals.length,
  total_menus: menus.length,
  jeonnam_restaurants: jeonnam.length,
  jeonbuk_restaurants: jeonbuk.length,
  categories: {},
  regions: {}
};

restaurants.forEach(r => {
  stats.categories[r.category] = (stats.categories[r.category] || 0) + 1;
  stats.regions[r.region] = (stats.regions[r.region] || 0) + 1;
});

fs.writeFileSync(
  'docs/data/stats.json',
  JSON.stringify(stats, null, 2)
);
console.log('   ✅ docs/data/stats.json');

console.log('\n🎉 Export completed successfully!');
console.log(`\n📊 Summary:`);
console.log(`   Restaurants: ${restaurants.length}`);
console.log(`   Festivals: ${festivals.length}`);
console.log(`   Menus: ${menus.length}`);
console.log(`   Jeonnam: ${jeonnam.length}`);
console.log(`   Jeonbuk: ${jeonbuk.length}`);
