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

// Export travel agencies
console.log('✈️  Fetching travel agencies...');
const travelAgencies = queryD1('SELECT * FROM travel_agencies');
console.log(`   Found ${travelAgencies.length} travel agencies`);

// Export menus
console.log('🍽️  Fetching menus...');
const menusData = queryD1('SELECT * FROM menus');
console.log(`   Found ${menusData.length} menus`);

// Export menu option groups
console.log('⚙️  Fetching menu option groups...');
const optionGroups = queryD1('SELECT * FROM menu_option_groups');
console.log(`   Found ${optionGroups.length} option groups`);

// Export menu option items
console.log('📋 Fetching menu option items...');
const optionItems = queryD1('SELECT * FROM menu_option_items');
console.log(`   Found ${optionItems.length} option items`);

// Build menu data with options (done in later section)
// Skip this for now as we'll process menusData with options below

// Save main data files
console.log('\n💾 Saving JSON files...');

fs.writeFileSync(
  'docs/data/restaurants.json',
  JSON.stringify({ restaurants, total: restaurants.length }, null, 2)
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

// Build menu data with options
const menusWithOptions = menusData.map(menu => {
  const groups = optionGroups.filter(g => g.menu_id === menu.id).map(group => ({
    ...group,
    items: optionItems.filter(item => item.option_group_id === group.id)
  }));
  
  return {
    ...menu,
    optionGroups: groups
  };
});

// Group menus by restaurant
const menusByRestaurant = {};
menusWithOptions.forEach(menu => {
  if (!menusByRestaurant[menu.restaurant_id]) {
    menusByRestaurant[menu.restaurant_id] = [];
  }
  menusByRestaurant[menu.restaurant_id].push(menu);
});

fs.writeFileSync(
  'docs/data/menus.json',
  JSON.stringify({ menus: menusWithOptions, total: menusWithOptions.length }, null, 2)
);
console.log(`   ✅ docs/data/menus.json (${menusWithOptions.length} menus)`);

fs.writeFileSync(
  'docs/data/menus-by-restaurant.json',
  JSON.stringify(menusByRestaurant, null, 2)
);
console.log('   ✅ docs/data/menus-by-restaurant.json');

// Create region indexes
const jeonnam = restaurants.filter(r => r.region_id === 1);
const jeonbuk = restaurants.filter(r => r.region_id === 2);

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
  total_menus: menusData.length,
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
console.log(`   Menus: ${menusData.length}`);
console.log(`   Jeonnam: ${jeonnam.length}`);
console.log(`   Jeonbuk: ${jeonbuk.length}`);
