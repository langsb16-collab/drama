// App State
let allRestaurants = [];
let displayedRestaurants = [];
let currentFilter = 'all';
let currentPage = 1;
const ITEMS_PER_PAGE = 12;

// Travel Agencies State
let allAgencies = [];
let displayedAgencies = [];
let currentAgencyFilter = 'all';
let currentAgencyPage = 1;
const AGENCIES_PER_PAGE = 12;

// Current Section
let currentSection = 'restaurants';

// Load data on page load
window.addEventListener('DOMContentLoaded', async () => {
  await loadRestaurants();
  await loadAgencies();
  await loadStats();
});

// Load restaurants data
async function loadRestaurants() {
  try {
    const response = await fetch('./data/restaurants.json');
    const data = await response.json();
    allRestaurants = data.restaurants || [];
    
    console.log(`✅ Loaded ${allRestaurants.length} restaurants`);
    
    // Apply initial filter
    filterRestaurants('all');
    
    // Hide loading, show grid
    document.getElementById('loading').style.display = 'none';
    document.getElementById('restaurants-grid').style.display = 'grid';
  } catch (error) {
    console.error('Failed to load restaurants:', error);
    document.getElementById('loading').innerHTML = `
      <div class="text-red-500">
        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
        <p>데이터를 불러오는데 실패했습니다.</p>
      </div>
    `;
  }
}

// Load stats
async function loadStats() {
  try {
    const response = await fetch('./data/stats.json');
    const stats = await response.json();
    
    // Update stats in hero section
    document.getElementById('stat-restaurants').textContent = `${stats.total_restaurants}+`;
    document.getElementById('stat-festivals').textContent = `${stats.total_festivals}+`;
    document.getElementById('stat-agencies').textContent = `${allAgencies.length}+`;
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// Filter restaurants
function filterRestaurants(filter) {
  currentFilter = filter;
  currentPage = 1;
  
  // Update button states
  document.querySelectorAll('[id^="btn-"]').forEach(btn => {
    btn.classList.remove('bg-orange-500', 'text-white');
    btn.classList.add('bg-gray-200', 'text-gray-700');
  });
  document.getElementById(`btn-${filter}`).classList.remove('bg-gray-200', 'text-gray-700');
  document.getElementById(`btn-${filter}`).classList.add('bg-orange-500', 'text-white');
  
  // Filter data
  if (filter === 'all') {
    displayedRestaurants = allRestaurants;
  } else if (filter === 'jeonnam') {
    displayedRestaurants = allRestaurants.filter(r => r.region_id === 1);
  } else if (filter === 'jeonbuk') {
    displayedRestaurants = allRestaurants.filter(r => r.region_id === 2);
  }
  
  console.log(`Filtered: ${displayedRestaurants.length} restaurants`);
  
  // Render first page
  renderRestaurants();
}

// Render restaurants
function renderRestaurants() {
  const grid = document.getElementById('restaurants-grid');
  const startIdx = 0;
  const endIdx = currentPage * ITEMS_PER_PAGE;
  const itemsToShow = displayedRestaurants.slice(startIdx, endIdx);
  
  grid.innerHTML = itemsToShow.map(restaurant => createRestaurantCard(restaurant)).join('');
  
  // Show/hide "Load More" button
  const showMoreContainer = document.getElementById('show-more-container');
  if (endIdx < displayedRestaurants.length) {
    showMoreContainer.style.display = 'block';
  } else {
    showMoreContainer.style.display = 'none';
  }
}

// Load more items
function loadMore() {
  currentPage++;
  renderRestaurants();
}

// Create restaurant card HTML
function createRestaurantCard(restaurant) {
  const regionName = restaurant.region_id === 1 ? '전라남도' : '전라북도';
  const categoryName = getCategoryName(restaurant.category_id);
  
  return `
    <div class="restaurant-card cursor-pointer" onclick="showRestaurantDetail(${restaurant.id})">
      <div class="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
        ${restaurant.image_url ? `
          <img src="${restaurant.image_url}" alt="${restaurant.name}" class="w-full h-full object-cover" />
        ` : `
          <div class="w-full h-full flex items-center justify-center">
            <i class="fas fa-utensils text-6xl text-orange-400"></i>
          </div>
        `}
        <div class="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          ${categoryName}
        </div>
        <div class="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
          ${regionName}
        </div>
      </div>
      <div class="p-4">
        <h4 class="font-bold text-lg mb-2 truncate">${restaurant.name}</h4>
        <p class="text-sm text-gray-600 mb-3 line-clamp-2" style="min-height: 40px;">
          ${restaurant.description_ko || '전라도의 맛을 느껴보세요'}
        </p>
        <div class="text-sm text-gray-600 mb-2">
          <i class="fas fa-map-marker-alt text-orange-500 mr-1"></i>
          ${restaurant.address || '주소 정보 없음'}
        </div>
        <div class="text-sm font-semibold text-orange-600">
          ${restaurant.price_range || '가격 문의'}
        </div>
      </div>
    </div>
  `;
}

// Get category name
function getCategoryName(categoryId) {
  const categories = {
    1: '한식',
    2: '중식',
    3: '일식',
    4: '양식',
    5: '카페/디저트',
    6: '기타'
  };
  return categories[categoryId] || '기타';
}

// Show restaurant detail (modal)
function showRestaurantDetail(restaurantId) {
  const restaurant = allRestaurants.find(r => r.id === restaurantId);
  if (!restaurant) return;
  
  const regionName = restaurant.region_id === 1 ? '전라남도' : '전라북도';
  const categoryName = getCategoryName(restaurant.category_id);
  
  const modalHTML = `
    <div id="restaurant-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="closeModal(event)">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200">
          <div class="w-full h-full flex items-center justify-center">
            <i class="fas fa-utensils text-8xl text-orange-400"></i>
          </div>
          <button onclick="closeModal()" class="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100">
            <i class="fas fa-times text-gray-600"></i>
          </button>
          <div class="absolute bottom-4 left-4">
            <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2">${categoryName}</span>
            <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">${regionName}</span>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">${restaurant.name}</h2>
          
          <div class="space-y-4 mb-6">
            <p class="text-gray-700">${restaurant.description_ko || '전라도의 맛을 느껴보세요'}</p>
            
            <div class="flex items-start">
              <i class="fas fa-map-marker-alt text-orange-500 mr-3 mt-1"></i>
              <div>
                <p class="font-semibold text-gray-800">주소</p>
                <p class="text-gray-600">${restaurant.address || '주소 정보 없음'}</p>
              </div>
            </div>
            
            ${restaurant.phone ? `
              <div class="flex items-start">
                <i class="fas fa-phone text-orange-500 mr-3 mt-1"></i>
                <div>
                  <p class="font-semibold text-gray-800">전화번호</p>
                  <p class="text-gray-600">${restaurant.phone}</p>
                </div>
              </div>
            ` : ''}
            
            <div class="flex items-start">
              <i class="fas fa-won-sign text-orange-500 mr-3 mt-1"></i>
              <div>
                <p class="font-semibold text-gray-800">가격대</p>
                <p class="text-gray-600">${restaurant.price_range || '가격 문의'}</p>
              </div>
            </div>
            
            ${restaurant.signature_menu ? `
              <div class="flex items-start">
                <i class="fas fa-star text-orange-500 mr-3 mt-1"></i>
                <div>
                  <p class="font-semibold text-gray-800">대표 메뉴</p>
                  <p class="text-gray-600">${restaurant.signature_menu}</p>
                </div>
              </div>
            ` : ''}
          </div>
          
          ${restaurant.menus && restaurant.menus.length > 0 ? `
            <div class="border-t pt-4">
              <h3 class="font-bold text-xl mb-3">메뉴</h3>
              <div class="grid grid-cols-1 gap-3">
                ${restaurant.menus.map(menu => `
                  <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p class="font-semibold">${menu.name}</p>
                      ${menu.description ? `<p class="text-sm text-gray-600">${menu.description}</p>` : ''}
                    </div>
                    <p class="font-bold text-orange-600">₩${menu.price.toLocaleString()}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal(event) {
  if (event && event.target.id !== 'restaurant-modal' && event && event.target.id !== 'agency-modal') return;
  
  const modal = document.getElementById('restaurant-modal') || document.getElementById('agency-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

// Section Management
function showSection(section) {
  currentSection = section;
  
  // Hide all sections
  document.getElementById('restaurants').style.display = 'none';
  document.getElementById('travel').style.display = 'none';
  
  // Show selected section
  document.getElementById(section).style.display = 'block';
  
  // Update tab styles
  document.querySelectorAll('[id^="tab-"]').forEach(btn => {
    btn.classList.remove('bg-white', 'text-orange-500', 'border-2', 'border-orange-500', 'shadow-lg');
    btn.classList.add('bg-white', 'text-gray-700');
  });
  document.getElementById(`tab-${section}`).classList.remove('text-gray-700');
  document.getElementById(`tab-${section}`).classList.add('text-orange-500', 'border-2', 'border-orange-500', 'shadow-lg');
}

// Load travel agencies
async function loadAgencies() {
  try {
    const response = await fetch('./data/travel-agencies.json');
    const data = await response.json();
    allAgencies = data.agencies || [];
    
    console.log(`✅ Loaded ${allAgencies.length} travel agencies`);
    
    // Apply initial filter
    filterAgencies('all');
    
    // Hide loading, show grid
    document.getElementById('agencies-loading').style.display = 'none';
    document.getElementById('agencies-grid').style.display = 'grid';
  } catch (error) {
    console.error('Failed to load agencies:', error);
    document.getElementById('agencies-loading').innerHTML = `
      <div class="text-red-500">
        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
        <p>여행사 데이터를 불러오는데 실패했습니다.</p>
      </div>
    `;
  }
}

// Filter travel agencies
function filterAgencies(filter) {
  currentAgencyFilter = filter;
  currentAgencyPage = 1;
  
  // Update button states
  document.querySelectorAll('[id^="btn-agency-"]').forEach(btn => {
    btn.classList.remove('bg-orange-500', 'text-white');
    btn.classList.add('bg-gray-200', 'text-gray-700');
  });
  document.getElementById(`btn-agency-${filter}`).classList.remove('bg-gray-200', 'text-gray-700');
  document.getElementById(`btn-agency-${filter}`).classList.add('bg-orange-500', 'text-white');
  
  // Filter data
  if (filter === 'all') {
    displayedAgencies = allAgencies;
  } else {
    displayedAgencies = allAgencies.filter(a => a.region === filter);
  }
  
  console.log(`Filtered: ${displayedAgencies.length} agencies`);
  
  // Render first page
  renderAgencies();
}

// Render travel agencies
function renderAgencies() {
  const grid = document.getElementById('agencies-grid');
  const startIdx = 0;
  const endIdx = currentAgencyPage * AGENCIES_PER_PAGE;
  const itemsToShow = displayedAgencies.slice(startIdx, endIdx);
  
  grid.innerHTML = itemsToShow.map(agency => createAgencyCard(agency)).join('');
  
  // Show/hide "Load More" button
  const showMoreContainer = document.getElementById('show-more-agencies-container');
  if (endIdx < displayedAgencies.length) {
    showMoreContainer.style.display = 'block';
  } else {
    showMoreContainer.style.display = 'none';
  }
}

// Load more agencies
function loadMoreAgencies() {
  currentAgencyPage++;
  renderAgencies();
}

// Create agency card HTML
function createAgencyCard(agency) {
  return `
    <div class="restaurant-card cursor-pointer" onclick="showAgencyDetail(${agency.id})">
      <div class="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200">
        ${agency.image_url ? `
          <img src="${agency.image_url}" alt="${agency.name}" class="w-full h-full object-cover" />
        ` : `
          <div class="w-full h-full flex items-center justify-center">
            <i class="fas fa-plane text-6xl text-blue-400"></i>
          </div>
        `}
        <div class="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          ${agency.region}
        </div>
        <div class="absolute top-3 right-3 bg-white text-blue-600 px-2 py-1 rounded-full text-xs flex items-center">
          <i class="fas fa-star text-yellow-500 mr-1"></i>
          ${agency.rating}
        </div>
      </div>
      <div class="p-4">
        <h4 class="font-bold text-lg mb-2 truncate">${agency.name}</h4>
        <p class="text-sm text-gray-600 mb-3 line-clamp-2" style="min-height: 40px;">
          ${agency.specialty}
        </p>
        <div class="text-sm text-gray-600 mb-2">
          <i class="fas fa-users text-blue-500 mr-1"></i>
          ${agency.group_size || '문의'}
        </div>
        <div class="text-sm font-semibold text-blue-600">
          ${agency.price_range || '가격 문의'}
        </div>
      </div>
    </div>
  `;
}

// Show agency detail
function showAgencyDetail(agencyId) {
  const agency = allAgencies.find(a => a.id === agencyId);
  if (!agency) return;
  
  const modalHTML = `
    <div id="agency-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="closeModal(event)">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200">
          ${agency.image_url ? `
            <img src="${agency.image_url}" alt="${agency.name}" class="w-full h-full object-cover" />
          ` : `
            <div class="w-full h-full flex items-center justify-center">
              <i class="fas fa-plane text-8xl text-blue-400"></i>
            </div>
          `}
          <button onclick="closeModal()" class="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100">
            <i class="fas fa-times text-gray-600"></i>
          </button>
          <div class="absolute bottom-4 left-4">
            <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2">${agency.region}</span>
            <span class="bg-white text-blue-600 px-3 py-1 rounded-full text-sm">
              <i class="fas fa-star text-yellow-500 mr-1"></i>${agency.rating}
            </span>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">${agency.name}</h2>
          <p class="text-lg text-blue-600 font-semibold mb-4">${agency.specialty}</p>
          
          <div class="space-y-4 mb-6">
            <p class="text-gray-700">${agency.description}</p>
            
            <div class="flex items-start">
              <i class="fas fa-list text-blue-500 mr-3 mt-1"></i>
              <div>
                <p class="font-semibold text-gray-800">제공 서비스</p>
                <p class="text-gray-600">${agency.services || '문의'}</p>
              </div>
            </div>
            
            ${agency.address ? `
              <div class="flex items-start">
                <i class="fas fa-map-marker-alt text-blue-500 mr-3 mt-1"></i>
                <div>
                  <p class="font-semibold text-gray-800">주소</p>
                  <p class="text-gray-600">${agency.address}</p>
                </div>
              </div>
            ` : ''}
            
            ${agency.phone ? `
              <div class="flex items-start">
                <i class="fas fa-phone text-blue-500 mr-3 mt-1"></i>
                <div>
                  <p class="font-semibold text-gray-800">전화번호</p>
                  <p class="text-gray-600">${agency.phone}</p>
                </div>
              </div>
            ` : ''}
            
            ${agency.email ? `
              <div class="flex items-start">
                <i class="fas fa-envelope text-blue-500 mr-3 mt-1"></i>
                <div>
                  <p class="font-semibold text-gray-800">이메일</p>
                  <p class="text-gray-600">${agency.email}</p>
                </div>
              </div>
            ` : ''}
            
            <div class="flex items-start">
              <i class="fas fa-users text-blue-500 mr-3 mt-1"></i>
              <div>
                <p class="font-semibold text-gray-800">그룹 규모</p>
                <p class="text-gray-600">${agency.group_size || '문의'}</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <i class="fas fa-won-sign text-blue-500 mr-3 mt-1"></i>
              <div>
                <p class="font-semibold text-gray-800">가격대</p>
                <p class="text-gray-600">${agency.price_range || '가격 문의'}</p>
              </div>
            </div>
            
            ${agency.languages ? `
              <div class="flex items-start">
                <i class="fas fa-language text-blue-500 mr-3 mt-1"></i>
                <div>
                  <p class="font-semibold text-gray-800">지원 언어</p>
                  <p class="text-gray-600">${agency.languages}</p>
                </div>
              </div>
            ` : ''}
            
            ${agency.certifications ? `
              <div class="flex items-start">
                <i class="fas fa-certificate text-blue-500 mr-3 mt-1"></i>
                <div>
                  <p class="font-semibold text-gray-800">인증/자격</p>
                  <p class="text-gray-600">${agency.certifications}</p>
                </div>
              </div>
            ` : ''}
          </div>
          
          ${agency.website ? `
            <div class="border-t pt-4">
              <a href="${agency.website}" target="_blank" class="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold transition">
                <i class="fas fa-external-link-alt mr-2"></i>
                웹사이트 방문하기
              </a>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';
}
