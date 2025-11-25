import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import restaurants from './routes/restaurants'
import regions from './routes/regions'
import categories from './routes/categories'
import orders from './routes/orders'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes
app.route('/api/restaurants', restaurants)
app.route('/api/regions', regions)
app.route('/api/categories', categories)
app.route('/api/orders', orders)

// 맛집 목록 페이지
app.get('/restaurants', async (c) => {
  const { DB } = c.env
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>전라도 맛집 - 전라도 로컬 미식 슈퍼로드</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
          }
          .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          }
          .restaurant-card {
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.3s;
          }
          .restaurant-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(255,107,53,0.2);
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="gradient-orange text-white py-4">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <a href="/" class="flex items-center space-x-2">
                        <i class="fas fa-arrow-left"></i>
                        <span>홈으로</span>
                    </a>
                    <h1 class="text-xl font-bold">전라도 맛집</h1>
                    <div></div>
                </div>
            </div>
        </header>

        <!-- Search & Filter -->
        <div class="bg-white shadow-md sticky top-0 z-10">
            <div class="container mx-auto px-4 py-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <select id="regionFilter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option value="">전체 지역</option>
                    </select>
                    <select id="categoryFilter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option value="">전체 카테고리</option>
                    </select>
                    <select id="deliveryFilter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option value="">배달 전체</option>
                        <option value="true">배달 가능</option>
                    </select>
                    <input type="text" id="searchInput" placeholder="맛집 검색..." 
                           class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                </div>
            </div>
        </div>

        <!-- Restaurant List -->
        <div class="container mx-auto px-4 py-8">
            <div id="restaurantList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Loading -->
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-spinner fa-spin text-4xl text-orange-500"></i>
                    <p class="mt-4 text-gray-600">맛집 정보를 불러오는 중...</p>
                </div>
            </div>
        </div>

        <script>
          let currentFilters = {
            region: '',
            category: '',
            delivery: '',
            search: ''
          };

          // Load regions and categories for filters
          async function loadFilters() {
            try {
              const regionsRes = await fetch('/api/regions');
              const regionsData = await regionsRes.json();
              
              const regionSelect = document.getElementById('regionFilter');
              regionsData.data.forEach(region => {
                const option = document.createElement('option');
                option.value = region.id;
                option.textContent = region.name_ko;
                regionSelect.appendChild(option);
              });

              // Load categories
              const categoriesRes = await fetch('/api/categories');
              const categoriesData = await categoriesRes.json();
              
              const categorySelect = document.getElementById('categoryFilter');
              categoriesData.data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name_ko;
                categorySelect.appendChild(option);
              });
            } catch (error) {
              console.error('Failed to load filters:', error);
            }
          }

          // Load restaurants
          async function loadRestaurants() {
            const params = new URLSearchParams();
            if (currentFilters.region) params.append('region', currentFilters.region);
            if (currentFilters.category) params.append('category', currentFilters.category);
            if (currentFilters.delivery) params.append('delivery', currentFilters.delivery);
            if (currentFilters.search) params.append('search', currentFilters.search);
            params.append('limit', '50');

            try {
              const response = await fetch('/api/restaurants?' + params.toString());
              const data = await response.json();

              const container = document.getElementById('restaurantList');
              
              if (!data.data || data.data.length === 0) {
                container.innerHTML = \`
                  <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">검색 결과가 없습니다.</p>
                  </div>
                \`;
                return;
              }

              container.innerHTML = data.data.map(restaurant => \`
                <a href="/restaurants/\${restaurant.id}" class="restaurant-card block">
                  <div class="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
                    \${restaurant.image_url ? \`
                      <img src="\${restaurant.image_url}" alt="\${restaurant.name}" 
                           class="w-full h-full object-cover">
                    \` : \`
                      <div class="w-full h-full flex items-center justify-center">
                        <i class="fas fa-utensils text-6xl text-orange-400"></i>
                      </div>
                    \`}
                    \${restaurant.verified ? \`
                      <div class="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        <i class="fas fa-check-circle"></i> 인증
                      </div>
                    \` : ''}
                    \${restaurant.delivery_available ? \`
                      <div class="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                        <i class="fas fa-motorcycle"></i> 배달
                      </div>
                    \` : ''}
                  </div>
                  <div class="p-4">
                    <h3 class="font-bold text-lg mb-2 text-gray-800">\${restaurant.name}</h3>
                    <div class="flex items-center mb-2">
                      <i class="fas fa-star text-yellow-500 mr-1"></i>
                      <span class="font-semibold">\${restaurant.rating || 0}</span>
                      <span class="text-gray-500 text-sm ml-2">(\${restaurant.review_count || 0})</span>
                    </div>
                    <div class="text-sm text-gray-600 mb-2">
                      <i class="fas fa-map-marker-alt text-orange-500 mr-1"></i>
                      \${restaurant.region_name || ''}
                    </div>
                    <div class="text-sm text-gray-600">
                      <i class="fas fa-tag text-orange-500 mr-1"></i>
                      \${restaurant.signature_menu || '대표메뉴'}
                    </div>
                  </div>
                </a>
              \`).join('');
            } catch (error) {
              console.error('Failed to load restaurants:', error);
            }
          }

          // Event listeners
          document.getElementById('regionFilter').addEventListener('change', (e) => {
            currentFilters.region = e.target.value;
            loadRestaurants();
          });

          document.getElementById('categoryFilter').addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            loadRestaurants();
          });

          document.getElementById('deliveryFilter').addEventListener('change', (e) => {
            currentFilters.delivery = e.target.value;
            loadRestaurants();
          });

          let searchTimeout;
          document.getElementById('searchInput').addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
              currentFilters.search = e.target.value;
              loadRestaurants();
            }, 500);
          });

          // Initial load
          loadFilters();
          loadRestaurants();
        </script>
    </body>
    </html>
  `)
})

// 맛집 상세 페이지
app.get('/restaurants/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>맛집 상세 - 전라도 로컬 미식 슈퍼로드</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
          }
          .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          }
          .menu-item {
            background: white;
            border-radius: 0.75rem;
            padding: 1rem;
            border: 1px solid #e5e7eb;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="gradient-orange text-white py-4">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <a href="/restaurants" class="flex items-center space-x-2">
                        <i class="fas fa-arrow-left"></i>
                        <span>목록으로</span>
                    </a>
                    <h1 class="text-xl font-bold">맛집 상세</h1>
                    <div></div>
                </div>
            </div>
        </header>

        <div id="restaurantDetail" class="container mx-auto px-4 py-8">
            <!-- Loading -->
            <div class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-orange-500"></i>
                <p class="mt-4 text-gray-600">맛집 정보를 불러오는 중...</p>
            </div>
        </div>

        <script>
          const restaurantId = '${id}';

          async function loadRestaurantDetail() {
            try {
              const response = await fetch('/api/restaurants/' + restaurantId);
              const result = await response.json();

              if (!result.success || !result.data) {
                document.getElementById('restaurantDetail').innerHTML = \`
                  <div class="text-center py-12">
                    <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                    <p class="text-gray-600">맛집 정보를 찾을 수 없습니다.</p>
                  </div>
                \`;
                return;
              }

              const restaurant = result.data;
              
              document.getElementById('restaurantDetail').innerHTML = \`
                <!-- Main Image -->
                <div class="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl overflow-hidden mb-6">
                  \${restaurant.image_url ? \`
                    <img src="\${restaurant.image_url}" alt="\${restaurant.name}" 
                         class="w-full h-full object-cover">
                  \` : \`
                    <div class="w-full h-full flex items-center justify-center">
                      <i class="fas fa-utensils text-8xl text-orange-400"></i>
                    </div>
                  \`}
                  \${restaurant.verified ? \`
                    <div class="absolute top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-full">
                      <i class="fas fa-check-circle mr-1"></i> 공식 인증
                    </div>
                  \` : ''}
                </div>

                <!-- Basic Info -->
                <div class="bg-white rounded-2xl p-6 mb-6 shadow-md">
                  <h1 class="text-3xl font-bold text-gray-800 mb-4">\${restaurant.name}</h1>
                  
                  <div class="flex items-center mb-4">
                    <div class="flex items-center">
                      <i class="fas fa-star text-yellow-500 text-xl mr-2"></i>
                      <span class="text-2xl font-bold">\${restaurant.rating || 0}</span>
                    </div>
                    <span class="text-gray-500 ml-3">(\${restaurant.review_count || 0} 리뷰)</span>
                  </div>

                  <p class="text-gray-700 mb-4">\${restaurant.description_ko || ''}</p>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-start space-x-3">
                      <i class="fas fa-map-marker-alt text-orange-500 text-xl mt-1"></i>
                      <div>
                        <p class="font-semibold text-gray-800">주소</p>
                        <p class="text-gray-600">\${restaurant.address || ''}</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <i class="fas fa-phone text-orange-500 text-xl mt-1"></i>
                      <div>
                        <p class="font-semibold text-gray-800">전화번호</p>
                        <p class="text-gray-600">\${restaurant.phone || ''}</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <i class="fas fa-clock text-orange-500 text-xl mt-1"></i>
                      <div>
                        <p class="font-semibold text-gray-800">영업시간</p>
                        <p class="text-gray-600">\${restaurant.opening_hours || '정보 없음'}</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <i class="fas fa-tag text-orange-500 text-xl mt-1"></i>
                      <div>
                        <p class="font-semibold text-gray-800">대표메뉴</p>
                        <p class="text-gray-600">\${restaurant.signature_menu || ''}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Delivery/Pickup Options -->
                  <div class="mt-6 pt-6 border-t flex flex-wrap gap-3">
                    \${restaurant.delivery_available ? \`
                      <div class="flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                        <i class="fas fa-motorcycle mr-2"></i>
                        <span class="font-semibold">배달 가능</span>
                      </div>
                    \` : ''}
                    \${restaurant.pickup_available ? \`
                      <div class="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                        <i class="fas fa-shopping-bag mr-2"></i>
                        <span class="font-semibold">포장 가능</span>
                      </div>
                    \` : ''}
                    \${restaurant.reservation_available ? \`
                      <div class="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
                        <i class="fas fa-calendar-check mr-2"></i>
                        <span class="font-semibold">예약 가능</span>
                      </div>
                    \` : ''}
                  </div>
                </div>

                <!-- Menu Section -->
                \${restaurant.menus && restaurant.menus.length > 0 ? \`
                  <div class="bg-white rounded-2xl p-6 mb-6 shadow-md">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                      <i class="fas fa-utensils text-orange-500 mr-2"></i>
                      메뉴
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      \${restaurant.menus.map(menu => \`
                        <div class="menu-item">
                          <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-lg text-gray-800">
                              \${menu.name}
                              \${menu.popular ? '<span class="text-orange-500 ml-2"><i class="fas fa-fire"></i></span>' : ''}
                            </h3>
                            <span class="font-bold text-orange-500">\${menu.price.toLocaleString()}원</span>
                          </div>
                          \${menu.description ? \`<p class="text-sm text-gray-600">\${menu.description}</p>\` : ''}
                        </div>
                      \`).join('')}
                    </div>
                  </div>
                \` : ''}

                <!-- Map Section -->
                <div class="bg-white rounded-2xl p-6 shadow-md">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-map text-orange-500 mr-2"></i>
                    위치
                  </h2>
                  <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <a href="https://map.naver.com/v5/search/\${encodeURIComponent(restaurant.address || restaurant.name)}" 
                       target="_blank" 
                       class="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition">
                      <i class="fas fa-map-marked-alt mr-2"></i>
                      네이버 지도에서 보기
                    </a>
                  </div>
                </div>

                <!-- Order CTA -->
                <div class="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8 text-center">
                  <h3 class="text-2xl font-bold mb-2">배달 수수료 0원!</h3>
                  <p class="mb-6">지금 바로 주문하세요</p>
                  <button onclick="alert('주문 기능은 곧 출시됩니다!')" 
                          class="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
                    <i class="fas fa-shopping-cart mr-2"></i>
                    주문하기
                  </button>
                </div>
              \`;
            } catch (error) {
              console.error('Failed to load restaurant detail:', error);
              document.getElementById('restaurantDetail').innerHTML = \`
                <div class="text-center py-12">
                  <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                  <p class="text-gray-600">맛집 정보를 불러오는데 실패했습니다.</p>
                </div>
              \`;
            }
          }

          loadRestaurantDetail();
        </script>
    </body>
    </html>
  `)
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#FF6B35">
        <title>전라도 로컬 미식 슈퍼로드 - 맛집·축제·여행 올인원 플랫폼</title>
        
        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- Font Awesome -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        
        <style>
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
            margin: 0;
            padding: 0;
          }
          
          .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          }
          
          .gradient-orange-soft {
            background: linear-gradient(135deg, #FFB399 0%, #FFCC99 100%);
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          .loading-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          .feature-card {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(255, 107, 53, 0.2);
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="gradient-orange text-white py-6">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-utensils text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold">전라도 로컬 미식 슈퍼로드</h1>
                            <p class="text-sm opacity-90">Jeonlado Local Food Superroad</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm">🇰🇷 한국어</span>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Hero Section -->
        <section class="gradient-orange-soft py-20 text-center">
            <div class="container mx-auto px-4">
                <div class="loading-pulse mb-6">
                    <i class="fas fa-spinner fa-spin text-6xl text-orange-600"></i>
                </div>
                <h2 class="text-4xl font-bold text-gray-800 mb-4">프로젝트 로딩 중...</h2>
                <p class="text-xl text-gray-700 mb-8">전라도의 모든 맛과 여행을 한 곳에.</p>
                <p class="text-lg text-gray-600">맛집·축제·촬영지·숙박·농협까지, 전라도 생활지도의 새로운 기준</p>
            </div>
        </section>
        
        <!-- Features Preview -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <h3 class="text-3xl font-bold text-center text-gray-800 mb-12">
                    <i class="fas fa-star text-orange-500 mr-2"></i>
                    주요 기능
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Feature 1 -->
                    <div class="feature-card text-center">
                        <div class="mb-4">
                            <i class="fas fa-utensils text-5xl text-orange-500"></i>
                        </div>
                        <h4 class="text-xl font-bold text-gray-800 mb-2">53+ 드라마 촬영지</h4>
                        <p class="text-gray-600">오신의 사랑한 맛을 찾고 시군구별 정렬하세요</p>
                    </div>
                    
                    <!-- Feature 2 -->
                    <div class="feature-card text-center">
                        <div class="mb-4">
                            <i class="fas fa-calendar-alt text-5xl text-orange-500"></i>
                        </div>
                        <h4 class="text-xl font-bold text-gray-800 mb-2">30+ 지역 축제</h4>
                        <p class="text-gray-600">연중의 특별한 주를 경험하세요</p>
                    </div>
                    
                    <!-- Feature 3 -->
                    <div class="feature-card text-center">
                        <div class="mb-4">
                            <i class="fas fa-plane text-5xl text-orange-500"></i>
                        </div>
                        <h4 class="text-xl font-bold text-gray-800 mb-2">32+ 맞춤 여행사</h4>
                        <p class="text-gray-600">전문 가이드와 함께하는 특별한 여행</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Stats Section -->
        <section class="gradient-orange text-white py-16">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <i class="fas fa-map-marked-alt text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">200+</p>
                        <p class="text-lg opacity-90">전라도 맛집</p>
                    </div>
                    <div>
                        <i class="fas fa-calendar-star text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">30+</p>
                        <p class="text-lg opacity-90">지역 축제</p>
                    </div>
                    <div>
                        <i class="fas fa-film text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">50+</p>
                        <p class="text-lg opacity-90">한류 촬영지</p>
                    </div>
                    <div>
                        <i class="fas fa-hotel text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">100+</p>
                        <p class="text-lg opacity-90">숙박업소</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Featured Restaurants Section -->
        <section class="py-16 bg-gray-100">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-utensils text-orange-500 mr-2"></i>
                        인기 맛집
                    </h3>
                    <a href="/restaurants" class="text-orange-500 hover:text-orange-600 font-semibold">
                        전체보기 <i class="fas fa-arrow-right ml-1"></i>
                    </a>
                </div>
                <div id="featuredRestaurants" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Will be loaded dynamically -->
                    <div class="text-center py-8 col-span-full">
                        <i class="fas fa-spinner fa-spin text-3xl text-orange-500"></i>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-4 text-center">
                <h3 class="text-3xl font-bold text-gray-800 mb-4">배달 수수료 0원!</h3>
                <p class="text-xl text-gray-600 mb-8">사장님 부담 없는 배달, 지금 무료로 입점하세요</p>
                <button class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl">
                    <i class="fas fa-store mr-2"></i>
                    가맹점 신청하기
                </button>
            </div>
        </section>
        
        <script>
          // Load featured restaurants
          async function loadFeaturedRestaurants() {
            try {
              const response = await fetch('/api/restaurants?limit=6');
              const data = await response.json();
              
              const container = document.getElementById('featuredRestaurants');
              
              if (data.success && data.data && data.data.length > 0) {
                container.innerHTML = data.data.map(restaurant => \`
                  <a href="/restaurants/\${restaurant.id}" class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition block">
                    <div class="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
                      \${restaurant.image_url ? \`
                        <img src="\${restaurant.image_url}" alt="\${restaurant.name}" 
                             class="w-full h-full object-cover">
                      \` : \`
                        <div class="w-full h-full flex items-center justify-center">
                          <i class="fas fa-utensils text-6xl text-orange-400"></i>
                        </div>
                      \`}
                      \${restaurant.delivery_available ? \`
                        <div class="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                          <i class="fas fa-motorcycle"></i> 배달
                        </div>
                      \` : ''}
                    </div>
                    <div class="p-4">
                      <h4 class="font-bold text-lg mb-2">\${restaurant.name}</h4>
                      <div class="flex items-center mb-2">
                        <i class="fas fa-star text-yellow-500 mr-1"></i>
                        <span class="font-semibold">\${restaurant.rating || 0}</span>
                      </div>
                      <div class="text-sm text-gray-600">
                        <i class="fas fa-map-marker-alt text-orange-500 mr-1"></i>
                        \${restaurant.region_name || ''}
                      </div>
                    </div>
                  </a>
                \`).join('');
              }
            } catch (error) {
              console.error('Failed to load featured restaurants:', error);
            }
          }
          
          loadFeaturedRestaurants();
        </script>
        
        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8">
            <div class="container mx-auto px-4 text-center">
                <p class="text-lg font-bold mb-2">전라도 로컬 미식 슈퍼로드</p>
                <p class="text-sm opacity-75">맛·여행·축제·촬영지까지, 전라도를 완성하는 단 하나의 슈퍼앱</p>
                <p class="text-sm opacity-75 mt-4">© 2024 Jeonlado Superroad. All rights reserved.</p>
            </div>
        </footer>
    </body>
    </html>
  `)
})

export default app
