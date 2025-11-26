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

// Community State
let currentCommunityTab = 'benefits';

// Load data on page load
window.addEventListener('DOMContentLoaded', async () => {
  await loadRestaurants();
  await loadAgencies();
  await loadStats();
});

// Show Section (맛집, 여행사, 축제, 사고팔고, 우리동네 살리기)
function showSection(sectionName) {
  currentSection = sectionName;
  
  // Hide all sections
  document.getElementById('restaurants').style.display = 'none';
  document.getElementById('travel').style.display = 'none';
  document.getElementById('marketplace').style.display = 'none';
  document.getElementById('community').style.display = 'none';
  
  // Show selected section
  document.getElementById(sectionName).style.display = 'block';
  
  // Update tab button states
  document.querySelectorAll('[id^="tab-"]').forEach(btn => {
    btn.classList.remove('bg-white', 'text-orange-500', 'font-bold', 'shadow-lg', 'border-2', 'border-orange-500');
    btn.classList.add('bg-white', 'text-gray-700', 'font-semibold');
  });
  
  const activeTab = document.getElementById(`tab-${sectionName}`);
  if (activeTab) {
    activeTab.classList.remove('text-gray-700', 'font-semibold');
    activeTab.classList.add('text-orange-500', 'font-bold', 'shadow-lg', 'border-2', 'border-orange-500');
  }
  
  // Load data if needed
  if (sectionName === 'travel' && allAgencies.length === 0) {
    loadAgencies();
  }
}

// Show Community Tab (우리동네 혜택, 사고팔고)
function showCommunityTab(tabName) {
  currentCommunityTab = tabName;
  
  // Hide all community content
  document.getElementById('community-benefits').style.display = 'none';
  document.getElementById('community-marketplace').style.display = 'none';
  
  // Show selected tab
  document.getElementById(`community-${tabName}`).style.display = 'block';
  
  // Update button states
  document.querySelectorAll('[id^="community-tab-"]').forEach(btn => {
    btn.classList.remove('bg-orange-500', 'text-white');
    btn.classList.add('bg-gray-200', 'text-gray-700');
  });
  
  const activeTab = document.getElementById(`community-tab-${tabName}`);
  if (activeTab) {
    activeTab.classList.remove('bg-gray-200', 'text-gray-700');
    activeTab.classList.add('bg-orange-500', 'text-white');
  }
}

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
  
  // Update button states - 각 버튼마다 고유한 색상 적용
  const btnAll = document.getElementById('btn-all');
  const btnJeonnam = document.getElementById('btn-jeonnam');
  const btnJeonbuk = document.getElementById('btn-jeonbuk');
  
  // Reset all buttons to inactive state
  btnAll.className = 'px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold mb-2 shadow-md hover:shadow-lg transition opacity-60';
  btnJeonnam.className = 'px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold mb-2 shadow-md hover:shadow-lg transition opacity-60';
  btnJeonbuk.className = 'px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold mb-2 shadow-md hover:shadow-lg transition opacity-60';
  
  // Set active button
  if (filter === 'all') {
    btnAll.className = 'px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold mb-2 shadow-md hover:shadow-lg transition';
  } else if (filter === 'jeonnam') {
    btnJeonnam.className = 'px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold mb-2 shadow-md hover:shadow-lg transition';
  } else if (filter === 'jeonbuk') {
    btnJeonbuk.className = 'px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold mb-2 shadow-md hover:shadow-lg transition';
  }
  
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
            <div class="border-t pt-4 mb-4">
              <h3 class="font-bold text-xl mb-3">메뉴</h3>
              <div class="grid grid-cols-1 gap-3">
                ${restaurant.menus.map(menu => `
                  <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer" onclick="selectMenuForOrder(${restaurantId}, ${menu.id})">
                    <div>
                      <p class="font-semibold">${menu.name}</p>
                      ${menu.description ? `<p class="text-sm text-gray-600">${menu.description}</p>` : ''}
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-orange-600">₩${menu.price.toLocaleString()}</p>
                      <button class="text-xs text-blue-500 mt-1 hover:underline">
                        <i class="fas fa-shopping-cart mr-1"></i>주문·예약
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <!-- 주문·예약 버튼 -->
          <div class="border-t pt-4">
            <button onclick="showOrderForm(${restaurantId})" class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold px-6 py-4 rounded-xl transition shadow-lg">
              <i class="fas fa-shopping-cart mr-2"></i>주문·예약 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';
}

// Order state
let currentOrder = {
  restaurantId: null,
  menuId: null,
  quantity: 1,
  options: {},
  allergies: '',
  totalPrice: 0
};

// Show order form
function showOrderForm(restaurantId, menuId = null) {
  const restaurant = allRestaurants.find(r => r.id === restaurantId);
  if (!restaurant) return;
  
  currentOrder.restaurantId = restaurantId;
  currentOrder.menuId = menuId;
  currentOrder.quantity = 1;
  
  const selectedMenu = menuId ? restaurant.menus.find(m => m.id === menuId) : null;
  
  const orderFormHTML = `
    <div id="order-modal" class="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4" onclick="closeOrderModal(event)">
      <div class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold">
              <i class="fas fa-shopping-cart mr-2"></i>주문·예약
            </h2>
            <button onclick="closeOrderModal()" class="bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-30">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <p class="text-sm mt-2 opacity-90">${restaurant.name}</p>
        </div>
        
        <!-- Order Form -->
        <div class="p-6 space-y-6">
          <!-- 1. 주문 음식 선택 -->
          <div>
            <label class="block font-semibold text-gray-800 mb-2">
              <i class="fas fa-utensils text-orange-500 mr-2"></i>1) 주문 음식
            </label>
            ${restaurant.menus && restaurant.menus.length > 0 ? `
              <select id="menu-select" onchange="updateOrderMenu()" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                <option value="">메뉴를 선택해주세요</option>
                ${restaurant.menus.map(menu => `
                  <option value="${menu.id}" data-price="${menu.price}" ${menuId === menu.id ? 'selected' : ''}>
                    ${menu.name} - ₩${menu.price.toLocaleString()}
                  </option>
                `).join('')}
              </select>
            ` : `
              <p class="text-gray-500 text-sm">메뉴 정보가 없습니다. 전화로 문의해주세요.</p>
            `}
          </div>
          
          <!-- 2. 수량 -->
          <div>
            <label class="block font-semibold text-gray-800 mb-2">
              <i class="fas fa-sort-numeric-up text-orange-500 mr-2"></i>2) 수량
            </label>
            <div class="flex items-center space-x-4">
              <button onclick="updateQuantity(-1)" class="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-lg">
                <i class="fas fa-minus"></i>
              </button>
              <input type="number" id="quantity-input" value="1" min="1" max="99" onchange="updateQuantityInput()" class="w-20 text-center px-4 py-2 border-2 border-gray-300 rounded-lg font-bold text-lg focus:border-orange-500 focus:outline-none">
              <button onclick="updateQuantity(1)" class="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-lg">
                <i class="fas fa-plus"></i>
              </button>
              <span class="text-sm text-gray-500">최대 99개</span>
            </div>
          </div>
          
          <!-- 3. 알레르기 정보 -->
          <div>
            <label class="block font-semibold text-gray-800 mb-2">
              <i class="fas fa-exclamation-triangle text-orange-500 mr-2"></i>3) 알레르기 정보 (선택사항)
            </label>
            <textarea id="allergy-input" placeholder="알레르기가 있으시면 입력해주세요 (예: 새우, 땅콩 알레르기)" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none" rows="2"></textarea>
          </div>
          
          <!-- 4. 옵션 -->
          <div>
            <label class="block font-semibold text-gray-800 mb-3">
              <i class="fas fa-sliders-h text-orange-500 mr-2"></i>4) 옵션
            </label>
            <div class="space-y-3">
              <!-- 맵기 조절 -->
              <div class="p-3 bg-gray-50 rounded-lg">
                <p class="font-medium text-sm mb-2">맵기 조절</p>
                <div class="grid grid-cols-2 gap-2">
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="spicy" value="mild" checked class="w-4 h-4 text-orange-500">
                    <span class="text-sm">순한맛</span>
                  </label>
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="spicy" value="spicy" class="w-4 h-4 text-orange-500">
                    <span class="text-sm">매운맛 🌶️</span>
                  </label>
                </div>
              </div>
              
              <!-- 추가 옵션 -->
              <div class="p-3 bg-gray-50 rounded-lg">
                <p class="font-medium text-sm mb-2">추가 옵션</p>
                <div class="space-y-2">
                  <label class="flex items-center justify-between cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" id="option-extra" value="extra" class="w-4 h-4 text-orange-500">
                      <span class="text-sm">곱빼기</span>
                    </div>
                    <span class="text-sm text-orange-600 font-semibold">+₩2,000</span>
                  </label>
                  <label class="flex items-center justify-between cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" id="option-topping" value="topping" class="w-4 h-4 text-orange-500">
                      <span class="text-sm">토핑 추가</span>
                    </div>
                    <span class="text-sm text-orange-600 font-semibold">+₩3,000</span>
                  </label>
                  <label class="flex items-center justify-between cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" id="option-soup" value="soup" class="w-4 h-4 text-orange-500">
                      <span class="text-sm">국물 추가</span>
                    </div>
                    <span class="text-sm text-orange-600 font-semibold">+₩1,000</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 가격 정보 -->
          <div class="border-t pt-4">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">기본 가격</span>
                <span class="font-semibold" id="base-price">₩0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">추가 옵션</span>
                <span class="font-semibold text-orange-600" id="option-price">₩0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">수량</span>
                <span class="font-semibold" id="quantity-display">× 1</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">배달비 (예상)</span>
                <span class="font-semibold text-blue-600" id="delivery-fee">₩3,000</span>
              </div>
              <div class="border-t pt-2 flex justify-between items-center">
                <span class="font-bold text-lg">예상 총 금액</span>
                <span class="font-bold text-2xl text-orange-600" id="total-price">₩0</span>
              </div>
            </div>
          </div>
          
          <!-- 매장 정보 -->
          <div class="bg-blue-50 p-4 rounded-lg text-sm space-y-1">
            <p class="flex items-center text-gray-700">
              <i class="fas fa-clock text-blue-500 mr-2"></i>
              <span class="font-medium mr-2">조리 시간:</span> 15-20분
            </p>
            <p class="flex items-center text-gray-700">
              <i class="fas fa-truck text-blue-500 mr-2"></i>
              <span class="font-medium mr-2">배달 가능 시간:</span> 10:00 - 21:00
            </p>
            <p class="flex items-center text-green-600 font-semibold">
              <i class="fas fa-check-circle mr-2"></i> 영업 중
            </p>
          </div>
          
          <!-- 주문 버튼 -->
          <div class="space-y-2">
            <button onclick="submitOrder()" class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold px-6 py-4 rounded-xl transition shadow-lg">
              <i class="fas fa-check-circle mr-2"></i>주문하기
            </button>
            <button onclick="closeOrderModal()" class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', orderFormHTML);
  
  // 초기 가격 계산
  if (selectedMenu) {
    updateOrderPrice();
  }
  
  // 옵션 변경 이벤트 리스너 추가
  document.querySelectorAll('#order-modal input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateOrderPrice);
  });
}

// Select menu for order (from menu list)
function selectMenuForOrder(restaurantId, menuId) {
  closeModal();
  setTimeout(() => {
    showOrderForm(restaurantId, menuId);
  }, 100);
}

// Update order menu selection
function updateOrderMenu() {
  const select = document.getElementById('menu-select');
  if (!select) return;
  
  currentOrder.menuId = parseInt(select.value);
  updateOrderPrice();
}

// Update quantity
function updateQuantity(delta) {
  const input = document.getElementById('quantity-input');
  if (!input) return;
  
  let newValue = parseInt(input.value) + delta;
  if (newValue < 1) newValue = 1;
  if (newValue > 99) newValue = 99;
  
  input.value = newValue;
  currentOrder.quantity = newValue;
  updateOrderPrice();
}

// Update quantity from input
function updateQuantityInput() {
  const input = document.getElementById('quantity-input');
  if (!input) return;
  
  let value = parseInt(input.value);
  if (isNaN(value) || value < 1) value = 1;
  if (value > 99) value = 99;
  
  input.value = value;
  currentOrder.quantity = value;
  updateOrderPrice();
}

// Update order price
function updateOrderPrice() {
  const select = document.getElementById('menu-select');
  if (!select || !select.value) return;
  
  const option = select.options[select.selectedIndex];
  const basePrice = parseInt(option.dataset.price) || 0;
  
  // 옵션 가격 계산
  let optionPrice = 0;
  if (document.getElementById('option-extra')?.checked) optionPrice += 2000;
  if (document.getElementById('option-topping')?.checked) optionPrice += 3000;
  if (document.getElementById('option-soup')?.checked) optionPrice += 1000;
  
  const quantity = currentOrder.quantity;
  const deliveryFee = 3000; // 고정 배달비
  
  const subtotal = (basePrice + optionPrice) * quantity;
  const total = subtotal + deliveryFee;
  
  // UI 업데이트
  document.getElementById('base-price').textContent = `₩${basePrice.toLocaleString()}`;
  document.getElementById('option-price').textContent = `₩${optionPrice.toLocaleString()}`;
  document.getElementById('quantity-display').textContent = `× ${quantity}`;
  document.getElementById('total-price').textContent = `₩${total.toLocaleString()}`;
  
  currentOrder.totalPrice = total;
}

// Submit order
function submitOrder() {
  const select = document.getElementById('menu-select');
  const allergyInput = document.getElementById('allergy-input');
  
  if (!select || !select.value) {
    alert('메뉴를 선택해주세요.');
    return;
  }
  
  const restaurant = allRestaurants.find(r => r.id === currentOrder.restaurantId);
  const menu = restaurant?.menus.find(m => m.id === currentOrder.menuId);
  
  if (!menu) {
    alert('메뉴 정보를 찾을 수 없습니다.');
    return;
  }
  
  // 주문 정보 수집
  const orderData = {
    restaurant: restaurant.name,
    menu: menu.name,
    quantity: currentOrder.quantity,
    spicy: document.querySelector('input[name="spicy"]:checked')?.value || 'mild',
    options: {
      extra: document.getElementById('option-extra')?.checked || false,
      topping: document.getElementById('option-topping')?.checked || false,
      soup: document.getElementById('option-soup')?.checked || false
    },
    allergies: allergyInput?.value || '',
    totalPrice: currentOrder.totalPrice,
    timestamp: new Date().toISOString()
  };
  
  // 로컬스토리지에 주문 내역 저장
  const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
  orderHistory.push(orderData);
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  
  // 주문 완료 메시지
  alert(`주문이 접수되었습니다!\n\n맛집: ${orderData.restaurant}\n메뉴: ${orderData.menu}\n수량: ${orderData.quantity}개\n총 금액: ₩${orderData.totalPrice.toLocaleString()}\n\n조리 시간: 15-20분\n곧 맛있는 음식이 배달됩니다! 😊`);
  
  closeOrderModal();
}

// Close order modal
function closeOrderModal(event) {
  if (event && event.target.id !== 'order-modal') return;
  
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.remove();
  }
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
