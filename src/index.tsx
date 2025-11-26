import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import restaurants from './routes/restaurants'
import regions from './routes/regions'
import categories from './routes/categories'
import orders from './routes/orders'
import merchants from './routes/merchants'
import festivals from './routes/festivals'

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
app.route('/api/merchants', merchants)
app.route('/api/festivals', festivals)

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
                  <button onclick="openOrderModal()" 
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

          // 주문 모달 열기
          function openOrderModal() {
            const modal = document.getElementById('orderModal');
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
          }

          // 주문 모달 닫기
          function closeOrderModal() {
            const modal = document.getElementById('orderModal');
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
          }

          // 주문 제출
          async function submitOrder(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            
            const orderData = {
              user_id: 1, // 임시 사용자 ID (실제로는 로그인 시스템에서 가져와야 함)
              restaurant_id: restaurantId,
              order_type: formData.get('order_type'),
              items: [], // 실제로는 선택된 메뉴를 추가해야 함
              total_amount: 0, // 실제로는 계산된 금액
              delivery_address: formData.get('delivery_address'),
              delivery_phone: formData.get('phone'),
              customer_request: formData.get('request'),
              payment_method: formData.get('payment_method')
            };

            // 배달 주문인 경우 주소 확인
            if (orderData.order_type === 'delivery' && !orderData.delivery_address) {
              alert('배달 주소를 입력해주세요.');
              return;
            }

            try {
              const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
              });

              const result = await response.json();

              if (result.success) {
                alert(\`주문이 완료되었습니다!\\n주문번호: \${result.data.order_number}\`);
                closeOrderModal();
                form.reset();
              } else {
                alert(\`주문 실패: \${result.error}\`);
              }
            } catch (error) {
              console.error('Order submission error:', error);
              alert('주문 처리 중 오류가 발생했습니다.');
            }
          }

          // 주문 유형 변경 시 주소 입력란 표시/숨김
          function handleOrderTypeChange(select) {
            const addressField = document.getElementById('addressField');
            if (select.value === 'delivery') {
              addressField.classList.remove('hidden');
            } else {
              addressField.classList.add('hidden');
            }
          }

          // 주문 모달 초기화
          document.addEventListener('DOMContentLoaded', () => {
            loadRestaurantDetail();
          });
        </script>

        <!-- 주문 모달 -->
        <div id="orderModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 class="text-2xl font-bold text-gray-800">주문하기</h2>
              <button onclick="closeOrderModal()" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form onsubmit="submitOrder(event)" class="p-6">
              <!-- 주문 유형 선택 -->
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-shopping-bag text-orange-500 mr-2"></i>
                  주문 유형
                </label>
                <select name="order_type" onchange="handleOrderTypeChange(this)" 
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required>
                  <option value="delivery">배달</option>
                  <option value="pickup">포장</option>
                  <option value="reservation">예약</option>
                </select>
              </div>

              <!-- 연락처 -->
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-phone text-orange-500 mr-2"></i>
                  연락처
                </label>
                <input type="tel" name="phone" placeholder="010-1234-5678" 
                       class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required>
              </div>

              <!-- 배달 주소 (배달 선택 시만 표시) -->
              <div id="addressField" class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-map-marker-alt text-orange-500 mr-2"></i>
                  배달 주소
                </label>
                <input type="text" name="delivery_address" placeholder="전라북도 전주시 완산구..." 
                       class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
              </div>

              <!-- 요청사항 -->
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-comment text-orange-500 mr-2"></i>
                  요청사항
                </label>
                <textarea name="request" rows="3" placeholder="예: 문 앞에 놓아주세요" 
                          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"></textarea>
              </div>

              <!-- 결제 방법 -->
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-credit-card text-orange-500 mr-2"></i>
                  결제 방법
                </label>
                <select name="payment_method" 
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required>
                  <option value="card">카드 결제</option>
                  <option value="cash">현금 결제</option>
                  <option value="transfer">계좌 이체</option>
                </select>
              </div>

              <!-- 주의사항 -->
              <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <p class="text-sm text-orange-800">
                  <i class="fas fa-info-circle mr-2"></i>
                  <strong>배달 수수료 0원!</strong> 사장님께 직접 연결됩니다.
                </p>
              </div>

              <!-- 버튼 -->
              <div class="flex space-x-4">
                <button type="button" onclick="closeOrderModal()" 
                        class="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  취소
                </button>
                <button type="submit" 
                        class="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold">
                  <i class="fas fa-check mr-2"></i>
                  주문하기
                </button>
              </div>
            </form>
          </div>
        </div>
    </body>
    </html>
  `)
})

// 가맹점 신청 페이지
app.get('/merchant-apply', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>가맹점 신청 - 전라도 로컬 미식 슈퍼로드</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
          }
          .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
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
                    <h1 class="text-xl font-bold">가맹점 신청</h1>
                    <div></div>
                </div>
            </div>
        </header>

        <div class="container mx-auto px-4 py-8 max-w-3xl">
            <!-- 안내 섹션 -->
            <div class="bg-white rounded-2xl p-8 mb-8 shadow-md">
                <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                    <i class="fas fa-store text-orange-500 mr-2"></i>
                    배달 수수료 0원!
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="text-center">
                        <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-won-sign text-orange-500 text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">수수료 0원</h3>
                        <p class="text-sm text-gray-600">배달 수수료 없이<br>100% 매출 보장</p>
                    </div>
                    <div class="text-center">
                        <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-rocket text-orange-500 text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">빠른 심사</h3>
                        <p class="text-sm text-gray-600">2-3일 내<br>심사 완료</p>
                    </div>
                    <div class="text-center">
                        <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-headset text-orange-500 text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">전담 지원</h3>
                        <p class="text-sm text-gray-600">1:1 맞춤<br>운영 지원</p>
                    </div>
                </div>
            </div>

            <!-- 신청 폼 -->
            <div class="bg-white rounded-2xl p-8 shadow-md">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">신청 정보 입력</h3>
                
                <form id="merchantForm" onsubmit="submitApplication(event)">
                    <!-- 상호명 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            상호명 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="business_name" required
                               placeholder="예: 전주비빔밥" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 대표자명 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            대표자명 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="owner_name" required
                               placeholder="홍길동" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 연락처 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            연락처 <span class="text-red-500">*</span>
                        </label>
                        <input type="tel" name="phone" required
                               placeholder="010-1234-5678" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 이메일 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            이메일
                        </label>
                        <input type="email" name="email"
                               placeholder="example@email.com" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 주소 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            가게 주소 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="address" required
                               placeholder="전북 전주시 완산구..." 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 지역 선택 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            지역
                        </label>
                        <select name="region_id" 
                                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                            <option value="">선택하세요</option>
                            <option value="1">광주광역시</option>
                            <option value="19">전주시</option>
                            <option value="20">군산시</option>
                            <option value="2">목포시</option>
                            <option value="3">여수시</option>
                            <option value="4">순천시</option>
                        </select>
                    </div>

                    <!-- 카테고리 선택 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            업종
                        </label>
                        <select name="category_id" 
                                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                            <option value="">선택하세요</option>
                            <option value="1">한식당</option>
                            <option value="2">국밥/탕</option>
                            <option value="3">비빔밥</option>
                            <option value="4">회/해산물</option>
                            <option value="5">카페/디저트</option>
                        </select>
                    </div>

                    <!-- 사업자등록번호 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            사업자등록번호
                        </label>
                        <input type="text" name="business_number"
                               placeholder="123-45-67890" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 대표메뉴 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            대표메뉴
                        </label>
                        <input type="text" name="signature_menu"
                               placeholder="예: 전주비빔밥, 콩나물국밥" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 가게 소개 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            가게 소개
                        </label>
                        <textarea name="description" rows="4"
                                  placeholder="가게를 소개해주세요..." 
                                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"></textarea>
                    </div>

                    <!-- 영업시간 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            영업시간
                        </label>
                        <input type="text" name="business_hours"
                               placeholder="예: 10:00-22:00" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 안내 메시지 -->
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            신청 후 2-3일 내에 담당자가 연락드립니다. 추가 서류가 필요할 수 있습니다.
                        </p>
                    </div>

                    <!-- 제출 버튼 -->
                    <button type="submit" 
                            class="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition font-bold text-lg">
                        <i class="fas fa-paper-plane mr-2"></i>
                        신청하기
                    </button>
                </form>
            </div>
        </div>

        <script>
          async function submitApplication(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            
            const data = {
              business_name: formData.get('business_name'),
              owner_name: formData.get('owner_name'),
              phone: formData.get('phone'),
              email: formData.get('email'),
              address: formData.get('address'),
              region_id: formData.get('region_id') ? parseInt(formData.get('region_id')) : null,
              category_id: formData.get('category_id') ? parseInt(formData.get('category_id')) : null,
              business_number: formData.get('business_number'),
              signature_menu: formData.get('signature_menu'),
              description: formData.get('description'),
              business_hours: formData.get('business_hours')
            };

            try {
              const response = await fetch('/api/merchants', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });

              const result = await response.json();

              if (result.success) {
                alert(\`\\n✅ 가맹점 신청이 완료되었습니다!\\n\\n신청번호: \${result.data.application_number}\\n\\n영업일 기준 2-3일 내에 연락드리겠습니다.\\n감사합니다.\`);
                window.location.href = '/';
              } else {
                alert(\`신청 실패: \${result.error}\`);
              }
            } catch (error) {
              console.error('Application submission error:', error);
              alert('신청 처리 중 오류가 발생했습니다.');
            }
          }
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
                <h2 class="text-4xl font-bold text-gray-800 mb-4">전라도의 맛과 여행을 한 곳에</h2>
                <p class="text-xl text-gray-700 mb-8">지역 맛집을 응원하고 전라도 문화를 즐기세요</p>
                
                <!-- Action Buttons -->
                <div class="flex flex-wrap justify-center gap-4 mb-8">
                    <button id="localSupportBtn" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg">
                        <i class="fas fa-hand-holding-heart mr-2"></i>
                        우리동네 살리기
                    </button>
                    <a href="/restaurants" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg inline-block">
                        <i class="fas fa-utensils mr-2"></i>
                        맛집 찾기
                    </a>
                    <a href="/merchant-apply" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg inline-block">
                        <i class="fas fa-store mr-2"></i>
                        가맹점 신청
                    </a>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <div class="bg-white rounded-lg p-4 shadow-md">
                        <p class="text-3xl font-bold text-orange-500">350+</p>
                        <p class="text-sm text-gray-600">전라도 맛집</p>
                    </div>
                    <div class="bg-white rounded-lg p-4 shadow-md">
                        <p class="text-3xl font-bold text-orange-500">60+</p>
                        <p class="text-sm text-gray-600">지역 축제</p>
                    </div>
                    <div class="bg-white rounded-lg p-4 shadow-md">
                        <p class="text-3xl font-bold text-orange-500">32+</p>
                        <p class="text-sm text-gray-600">맞춤 여행사</p>
                    </div>
                    <div class="bg-white rounded-lg p-4 shadow-md">
                        <p class="text-3xl font-bold text-orange-500">100+</p>
                        <p class="text-sm text-gray-600">숙박업소</p>
                    </div>
                </div>
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
                <a href="/merchant-apply" class="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl">
                    <i class="fas fa-store mr-2"></i>
                    가맹점 신청하기
                </a>
            </div>
        </section>

        <!-- Local Support Modal -->
        <div id="localSupportModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
            <div class="min-h-screen px-4 py-8">
                <div class="bg-white rounded-2xl max-w-4xl mx-auto shadow-2xl">
                    <!-- Header -->
                    <div class="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
                        <h2 class="text-2xl font-bold">
                            <i class="fas fa-hand-holding-heart mr-2"></i>
                            우리동네 살리기
                        </h2>
                        <button id="closeModalBtn" class="text-white hover:text-gray-200">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>

                    <!-- Content -->
                    <div class="p-6 overflow-y-auto" style="max-height: 70vh;">
                        <!-- 광주광역시 -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
                                <i class="fas fa-map-marker-alt text-green-500 mr-2"></i>
                                광주광역시 지원대책
                            </h3>
                            
                            <div class="space-y-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-users mr-2 text-blue-500"></i>청년</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>광주 청년드림수당: 구직청년 월 30만~50만 원 지원</li>
                                        <li>광주청년 일경험 프로젝트: 중소기업·기관 매칭, 3~6개월 급여 지원</li>
                                        <li>청년창업 지원센터(GIST·CGI센터 등): 사무공간 무상 + R&D·멘토링</li>
                                        <li>청년 문화·예술창작 지원비</li>
                                    </ul>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-home mr-2 text-purple-500"></i>주거·정착</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>광주 청년 임대월세 지원(월 10~20만 원)</li>
                                        <li>신혼부부·청년 주택자금 대출이자 지원</li>
                                        <li>도심 빈집 리모델링 후 청년·신혼부부 공급</li>
                                    </ul>
                                </div>

                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-store mr-2 text-orange-500"></i>소상공인</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>광주형 상생카드 할인·캐시백 지원</li>
                                        <li>전통시장 온라인 판매 전환 지원 사업</li>
                                        <li>제로페이·지역화폐 '광주상생카드' 수수료 절감</li>
                                    </ul>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-camera mr-2 text-green-500"></i>관광·도시재생</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>광주 관광인재 육성 & 관광스타트업 공모</li>
                                        <li>예술의거리·양림동·국립아시아문화전당(ACC) 지역 연계 콘텐츠 지원</li>
                                        <li>청년·문화기획자 도시재생 프로젝트 공모</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- 전주특례시 -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
                                <i class="fas fa-map-marker-alt text-green-500 mr-2"></i>
                                전주특례시 지원대책
                            </h3>
                            
                            <div class="space-y-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-rocket mr-2 text-blue-500"></i>청년·창업</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>전주 청년사관학교(청년 창업클러스터)</li>
                                        <li>창업보육센터·메이커스페이스 연계 지원</li>
                                        <li>전주 스타트업 밸리 입주 지원</li>
                                        <li>청년생활안정자금(월세·교통 등 생활비)</li>
                                    </ul>
                                </div>

                                <div class="bg-pink-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-palette mr-2 text-pink-500"></i>문화·관광</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>한옥마을 기반 관광스타트업 지원</li>
                                        <li>전주국제영화제·비빔밥 등 로컬축제 창업 연계</li>
                                        <li>야시장·공예창업·식문화 창업 지원</li>
                                    </ul>
                                </div>

                                <div class="bg-yellow-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-building mr-2 text-yellow-600"></i>도시재생·주거</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>도시재생(팔복동·객사·서학동) 창업자 임대료 지원</li>
                                        <li>빈집활용창업(1유형 리모델링 지원, 2유형 임대료 지원)</li>
                                        <li>전주 특례시 청년·신혼부부 주거지원</li>
                                    </ul>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-seedling mr-2 text-green-600"></i>농업·귀촌</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>전주시 귀농귀촌센터 운영</li>
                                        <li>초기정착 사업비 / 임시거주 시설 제공</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- 전라남도 -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
                                <i class="fas fa-map-marker-alt text-green-500 mr-2"></i>
                                전라남도 지원대책
                            </h3>
                            
                            <div class="space-y-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-user-graduate mr-2 text-blue-500"></i>청년</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>전남 청년 프로젝트 "청년마을 만들기"</li>
                                        <li>전남 청년 근속장려금(3년 1,200만 원)</li>
                                        <li>전남 청년 월세 지원·청년 취업성공패키지</li>
                                    </ul>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-tractor mr-2 text-green-600"></i>귀농·귀촌</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>전남형 귀농귀촌 종합지원</li>
                                        <li>주택 수리비 최대 1,000만 원</li>
                                        <li>영농정착지원금 연 3,000만 원</li>
                                        <li>농기계 임대료 감면(50~80%)</li>
                                    </ul>
                                </div>

                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-shopping-cart mr-2 text-orange-500"></i>소상공인</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>전남 지역화폐(지역상품권) 할인 이벤트 10%</li>
                                        <li>소상공인 회생자금(무이자·저금리 대출)</li>
                                        <li>온라인 판매·SNS 광고 지원</li>
                                    </ul>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-plane-departure mr-2 text-purple-500"></i>관광·문화</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>남도여행 SNS 크리에이터 지원</li>
                                        <li>전남 관광택시·지역축제 연계 홍보 지원</li>
                                        <li>농촌체험·어촌체험 관광기업 육성</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- 전라북도 -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
                                <i class="fas fa-map-marker-alt text-green-500 mr-2"></i>
                                전라북도 지원대책
                            </h3>
                            
                            <div class="space-y-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-graduation-cap mr-2 text-blue-500"></i>청년</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>전북 청년 지역정착 지원금</li>
                                        <li>전북 청년 활동공간 지원(쉼·창업·문화공간 무료 사용)</li>
                                        <li>전북 디지털 청년 일자리 지원(기업 인건비 지원)</li>
                                    </ul>
                                </div>

                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-lightbulb mr-2 text-indigo-500"></i>창업·기업</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>전북 창업보육센터 / 농생명·디지털 창업특구 지원</li>
                                        <li>전북형 소상공인 회복지원금(융자, 컨설팅)</li>
                                        <li>스마트스토어·온라인 판매 교육</li>
                                    </ul>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-leaf mr-2 text-green-600"></i>농업·귀촌</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>전북 귀농귀촌 종합센터 운영</li>
                                        <li>청년 농업인 스마트팜 지원</li>
                                        <li>농기계은행·창업보조금 지원</li>
                                    </ul>
                                </div>

                                <div class="bg-pink-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-monument mr-2 text-pink-500"></i>관광·도시재생</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>전북 문화관광 이벤트(전북투어패스 연계)</li>
                                        <li>군산·전주·익산 역사문화권 도시재생사업</li>
                                        <li>관광형 로컬푸드·마을기업 육성</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- 시/군 공통 프로그램 -->
                        <div class="mb-6">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
                                <i class="fas fa-map-marker-alt text-green-500 mr-2"></i>
                                전남·전북 시/군 공통 지원 프로그램
                            </h3>
                            
                            <div class="space-y-4">
                                <div class="bg-cyan-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-briefcase mr-2 text-cyan-600"></i>청년·일자리</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>청년센터 운영 / 코워킹스페이스 무료 제공</li>
                                        <li>지역청년 활동가 지원(월 100~200만 원)</li>
                                        <li>청년월세 지원(월 10~20만 원)</li>
                                        <li>청년단체 활동비 지원(연 300~1,000만 원)</li>
                                    </ul>
                                </div>

                                <div class="bg-lime-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-mountain mr-2 text-lime-600"></i>귀농·귀촌</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>귀농 주택수리비·농지 구입비</li>
                                        <li>1년 체류형 농촌학교</li>
                                        <li>영농기초기술 교육</li>
                                        <li>농기계 임대 70% 감면</li>
                                    </ul>
                                </div>

                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-cash-register mr-2 text-amber-600"></i>소상공인</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>간판교체·인테리어 지원(200~2,000만 원)</li>
                                        <li>배달 플랫폼 사용 수수료 지원</li>
                                        <li>전통시장 현대화 사업</li>
                                        <li>신사업 아이디어 공모(연 500~2,000만 원 지원)</li>
                                    </ul>
                                </div>

                                <div class="bg-rose-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-umbrella-beach mr-2 text-rose-500"></i>관광·축제</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>지역 축제 운영비 지원</li>
                                        <li>로컬푸드 기반 점포 창업 지원</li>
                                        <li>마을해설사·관광택시 운영</li>
                                        <li>SNS·인플루언서 마케팅 지원</li>
                                    </ul>
                                </div>

                                <div class="bg-violet-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-house-user mr-2 text-violet-500"></i>주거·정착</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>청년·신혼부부 전세자금 이자 지원</li>
                                        <li>귀농귀촌 임시거처 제공</li>
                                        <li>농촌 빈집 리모델링 후 임대</li>
                                    </ul>
                                </div>

                                <div class="bg-sky-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-book-reader mr-2 text-sky-500"></i>교육·복지</h4>
                                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                                        <li>아동·학부모 돌봄센터</li>
                                        <li>고령자 디지털교육·일자리</li>
                                        <li>장애인·취약계층 주거 보수사업</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- 안내 문구 -->
                        <div class="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                            <i class="fas fa-info-circle text-green-500 text-3xl mb-3"></i>
                            <p class="text-gray-800 font-semibold mb-2">더 자세한 정보가 필요하신가요?</p>
                            <p class="text-sm text-gray-600 mb-4">각 지자체 홈페이지나 청년센터에 문의하시면 상세한 지원 안내를 받으실 수 있습니다.</p>
                            <div class="flex flex-wrap justify-center gap-2 text-xs">
                                <span class="bg-white px-3 py-1 rounded-full border border-green-300">광주시청</span>
                                <span class="bg-white px-3 py-1 rounded-full border border-green-300">전주시청</span>
                                <span class="bg-white px-3 py-1 rounded-full border border-green-300">전라남도청</span>
                                <span class="bg-white px-3 py-1 rounded-full border border-green-300">전라북도청</span>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="bg-gray-50 px-6 py-4 rounded-b-2xl text-center">
                        <button id="closeModalFooterBtn" class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-all">
                            <i class="fas fa-check mr-2"></i>
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
          // Show/hide local support modal
          document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('localSupportModal');
            const openBtn = document.getElementById('localSupportBtn');
            const closeBtn = document.getElementById('closeModalBtn');
            const closeFooterBtn = document.getElementById('closeModalFooterBtn');
            
            function showModal() {
              modal.classList.remove('hidden');
              document.body.style.overflow = 'hidden';
            }
            
            function hideModal() {
              modal.classList.add('hidden');
              document.body.style.overflow = 'auto';
            }
            
            if (openBtn) {
              openBtn.addEventListener('click', showModal);
            }
            
            if (closeBtn) {
              closeBtn.addEventListener('click', hideModal);
            }
            
            if (closeFooterBtn) {
              closeFooterBtn.addEventListener('click', hideModal);
            }
            
            // Close on backdrop click
            modal.addEventListener('click', function(e) {
              if (e.target === modal) {
                hideModal();
              }
            });
          });

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
