// 주문 시스템 JavaScript

// 로컬 스토리지 키
const CART_KEY = 'jt365_cart';
const ORDERS_KEY = 'jt365_orders';
const SESSION_KEY = 'jt365_session';

// 세션 ID 생성 또는 가져오기
function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

// 장바구니 데이터
let cart = [];
let menusByRestaurant = {};

// 장바구니 불러오기
function loadCart() {
  const cartData = localStorage.getItem(CART_KEY);
  cart = cartData ? JSON.parse(cartData) : [];
  updateCartBadge();
}

// 장바구니 저장
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// 장바구니 배지 업데이트
function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}

// 메뉴 데이터 로드
async function loadMenus() {
  try {
    const response = await fetch('./data/menus-by-restaurant.json');
    menusByRestaurant = await response.json();
    console.log('✅ Loaded menus for', Object.keys(menusByRestaurant).length, 'restaurants');
  } catch (error) {
    console.error('Failed to load menus:', error);
  }
}

// 맛집 상세 보기에 메뉴 탭 추가
function enhanceRestaurantDetail(restaurant) {
  const restaurantMenus = menusByRestaurant[restaurant.id] || [];
  
  if (restaurantMenus.length === 0) {
    return ''; // 메뉴가 없으면 빈 문자열 반환
  }
  
  return `
    <div class="border-t pt-6 mt-6">
      <h3 class="font-bold text-xl mb-4 flex items-center">
        <i class="fas fa-utensils text-orange-500 mr-2"></i>
        메뉴 (${restaurantMenus.length}개)
      </h3>
      <div class="grid grid-cols-1 gap-4">
        ${restaurantMenus.map(menu => createMenuCard(menu, restaurant)).join('')}
      </div>
    </div>
  `;
}

// 메뉴 카드 생성
function createMenuCard(menu, restaurant) {
  const hasOptions = menu.optionGroups && menu.optionGroups.length > 0;
  const discountPrice = menu.discount_price || 0;
  const finalPrice = discountPrice > 0 ? discountPrice : menu.price;
  
  return `
    <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition cursor-pointer" onclick="showMenuDetail(${menu.id}, ${restaurant.id})">
      <div class="flex gap-4">
        <!-- 메뉴 이미지 -->
        <div class="w-24 h-24 flex-shrink-0">
          ${menu.image_url ? `
            <img src="${menu.image_url}" alt="${menu.name}" class="w-full h-full object-cover rounded-lg" />
          ` : `
            <div class="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
              <i class="fas fa-utensils text-3xl text-orange-400"></i>
            </div>
          `}
        </div>
        
        <!-- 메뉴 정보 -->
        <div class="flex-1">
          <h4 class="font-bold text-lg mb-1">${menu.name}</h4>
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">${menu.description || '맛있는 음식입니다'}</p>
          
          <!-- 가격 -->
          <div class="flex items-center gap-2">
            ${discountPrice > 0 ? `
              <span class="text-gray-400 line-through text-sm">₩${menu.price.toLocaleString()}</span>
              <span class="text-orange-600 font-bold text-lg">₩${finalPrice.toLocaleString()}</span>
              <span class="bg-red-500 text-white text-xs px-2 py-0.5 rounded">할인</span>
            ` : `
              <span class="text-orange-600 font-bold text-lg">₩${menu.price.toLocaleString()}</span>
            `}
          </div>
          
          ${hasOptions ? `
            <span class="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              <i class="fas fa-cog mr-1"></i>옵션 선택 가능
            </span>
          ` : ''}
          
          ${menu.is_available === 0 ? `
            <span class="inline-block mt-2 text-xs bg-gray-400 text-white px-2 py-1 rounded">
              품절
            </span>
          ` : ''}
        </div>
        
        <!-- 주문 버튼 -->
        <div class="flex items-center">
          <button 
            onclick="event.stopPropagation(); ${hasOptions ? `showMenuDetail(${menu.id}, ${restaurant.id})` : `addToCartQuick(${menu.id}, ${restaurant.id})`}" 
            class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            ${menu.is_available === 0 ? 'disabled class="bg-gray-300 cursor-not-allowed"' : ''}
          >
            <i class="fas fa-shopping-cart mr-1"></i>
            담기
          </button>
        </div>
      </div>
    </div>
  `;
}

// 빠른 장바구니 추가 (옵션 없는 메뉴)
function addToCartQuick(menuId, restaurantId) {
  const menus = menusByRestaurant[restaurantId] || [];
  const menu = menus.find(m => m.id === menuId);
  
  if (!menu || menu.is_available === 0) {
    alert('현재 주문 불가능한 메뉴입니다.');
    return;
  }
  
  addToCart({
    menuId: menu.id,
    restaurantId: restaurantId,
    menuName: menu.name,
    quantity: 1,
    selectedOptions: [],
    unitPrice: menu.discount_price || menu.price,
    image_url: menu.image_url
  });
  
  showToast('장바구니에 추가되었습니다!');
}

// 메뉴 상세 모달 표시
function showMenuDetail(menuId, restaurantId) {
  const menus = menusByRestaurant[restaurantId] || [];
  const menu = menus.find(m => m.id === menuId);
  
  if (!menu) return;
  
  const hasOptions = menu.optionGroups && menu.optionGroups.length > 0;
  const discountPrice = menu.discount_price || 0;
  const basePrice = discountPrice > 0 ? discountPrice : menu.price;
  
  const modalHTML = `
    <div id="menu-detail-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="closeMenuModal(event)">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- 메뉴 이미지 -->
        <div class="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200">
          ${menu.image_url ? `
            <img src="${menu.image_url}" alt="${menu.name}" class="w-full h-full object-cover" />
          ` : `
            <div class="w-full h-full flex items-center justify-center">
              <i class="fas fa-utensils text-8xl text-orange-400"></i>
            </div>
          `}
          <button onclick="closeMenuModal()" class="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100">
            <i class="fas fa-times text-gray-600"></i>
          </button>
          ${discountPrice > 0 ? `
            <div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
              할인 중!
            </div>
          ` : ''}
        </div>
        
        <!-- 메뉴 정보 -->
        <div class="p-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">${menu.name}</h2>
          <p class="text-gray-600 mb-4">${menu.description || '맛있는 음식입니다'}</p>
          
          <!-- 가격 -->
          <div class="flex items-center gap-3 mb-6">
            ${discountPrice > 0 ? `
              <span class="text-gray-400 line-through text-xl">₩${menu.price.toLocaleString()}</span>
              <span class="text-orange-600 font-bold text-3xl">₩${basePrice.toLocaleString()}</span>
            ` : `
              <span class="text-orange-600 font-bold text-3xl">₩${menu.price.toLocaleString()}</span>
            `}
          </div>
          
          <!-- 옵션 선택 -->
          ${hasOptions ? `
            <div class="space-y-6 mb-6">
              ${menu.optionGroups.map((group, index) => createOptionGroup(group, index)).join('')}
            </div>
          ` : ''}
          
          <!-- 수량 선택 -->
          <div class="border-t pt-6">
            <h3 class="font-bold text-lg mb-3">수량</h3>
            <div class="flex items-center gap-4">
              <button onclick="changeQuantity(-1)" class="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center">
                <i class="fas fa-minus"></i>
              </button>
              <span id="menu-quantity" class="text-2xl font-bold">1</span>
              <button onclick="changeQuantity(1)" class="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          
          <!-- 총 가격 -->
          <div class="border-t pt-6 mt-6">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-semibold">총 가격</span>
              <span id="menu-total-price" class="text-2xl font-bold text-orange-600">₩${basePrice.toLocaleString()}</span>
            </div>
            
            <!-- 장바구니에 담기 버튼 -->
            <button onclick="addToCartFromModal(${menuId}, ${restaurantId}, ${basePrice})" class="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg transition">
              <i class="fas fa-shopping-cart mr-2"></i>
              장바구니에 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';
  
  // 초기 가격 계산
  updateMenuTotalPrice(basePrice);
}

// 옵션 그룹 HTML 생성
function createOptionGroup(group, groupIndex) {
  const isRequired = group.required === 1;
  const isSingle = group.type === 'single';
  
  return `
    <div class="option-group" data-group-id="${group.id}" data-type="${group.type}" data-required="${isRequired}">
      <h3 class="font-bold text-lg mb-3">
        ${group.name}
        ${isRequired ? '<span class="text-red-500 ml-1">*</span>' : '<span class="text-gray-400 text-sm ml-2">(선택사항)</span>'}
      </h3>
      <div class="space-y-2">
        ${group.items.map((item, itemIndex) => createOptionItem(item, group, groupIndex, itemIndex)).join('')}
      </div>
    </div>
  `;
}

// 옵션 아이템 HTML 생성
function createOptionItem(item, group, groupIndex, itemIndex) {
  const isSingle = group.type === 'single';
  const inputType = isSingle ? 'radio' : 'checkbox';
  const inputName = `option-group-${group.id}`;
  const inputId = `option-${group.id}-${item.id}`;
  const isDefault = item.is_default === 1;
  
  return `
    <label class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
      <div class="flex items-center">
        <input 
          type="${inputType}" 
          name="${inputName}" 
          id="${inputId}"
          value="${item.id}"
          data-price="${item.price}"
          data-name="${item.name}"
          ${isDefault ? 'checked' : ''}
          onchange="updateMenuTotalPrice()"
          class="mr-3"
        />
        <span class="font-medium">${item.name}</span>
      </div>
      ${item.price > 0 ? `<span class="text-orange-600 font-semibold">+₩${item.price.toLocaleString()}</span>` : ''}
    </label>
  `;
}

// 수량 변경
function changeQuantity(delta) {
  const quantityEl = document.getElementById('menu-quantity');
  let quantity = parseInt(quantityEl.textContent);
  quantity = Math.max(1, quantity + delta);
  quantityEl.textContent = quantity;
  updateMenuTotalPrice();
}

// 메뉴 총 가격 업데이트
function updateMenuTotalPrice(basePrice) {
  if (!basePrice) {
    // 모달에서 base price 추출
    const priceText = document.querySelector('#menu-detail-modal .text-orange-600.font-bold.text-3xl');
    if (priceText) {
      basePrice = parseInt(priceText.textContent.replace(/[^0-9]/g, ''));
    } else {
      return;
    }
  }
  
  const quantity = parseInt(document.getElementById('menu-quantity')?.textContent || 1);
  
  // 선택된 옵션 가격 합계
  let optionsPrice = 0;
  document.querySelectorAll('.option-group input:checked').forEach(input => {
    optionsPrice += parseInt(input.dataset.price || 0);
  });
  
  const totalPrice = (basePrice + optionsPrice) * quantity;
  const totalPriceEl = document.getElementById('menu-total-price');
  if (totalPriceEl) {
    totalPriceEl.textContent = `₩${totalPrice.toLocaleString()}`;
  }
}

// 모달에서 장바구니에 추가
function addToCartFromModal(menuId, restaurantId, basePrice) {
  const menus = menusByRestaurant[restaurantId] || [];
  const menu = menus.find(m => m.id === menuId);
  
  if (!menu) return;
  
  const quantity = parseInt(document.getElementById('menu-quantity').textContent);
  
  // 필수 옵션 체크
  const requiredGroups = document.querySelectorAll('.option-group[data-required="true"]');
  for (let group of requiredGroups) {
    const hasSelection = group.querySelector('input:checked');
    if (!hasSelection) {
      alert(`"${group.querySelector('h3').textContent.replace('*', '').trim()}" 옵션을 선택해주세요.`);
      return;
    }
  }
  
  // 선택된 옵션 수집
  const selectedOptions = [];
  let optionsPrice = 0;
  
  document.querySelectorAll('.option-group').forEach(group => {
    const groupName = group.querySelector('h3').textContent.replace('*', '').replace('(선택사항)', '').trim();
    const checkedInputs = group.querySelectorAll('input:checked');
    
    checkedInputs.forEach(input => {
      const optionPrice = parseInt(input.dataset.price || 0);
      selectedOptions.push({
        group: groupName,
        option: input.dataset.name,
        price: optionPrice
      });
      optionsPrice += optionPrice;
    });
  });
  
  const unitPrice = basePrice + optionsPrice;
  
  addToCart({
    menuId: menu.id,
    restaurantId: restaurantId,
    menuName: menu.name,
    quantity: quantity,
    selectedOptions: selectedOptions,
    unitPrice: unitPrice,
    image_url: menu.image_url
  });
  
  closeMenuModal();
  showToast(`${menu.name} ${quantity}개가 장바구니에 추가되었습니다!`);
}

// 장바구니에 추가
function addToCart(item) {
  // 같은 레스토랑이 아니면 경고
  if (cart.length > 0 && cart[0].restaurantId !== item.restaurantId) {
    if (!confirm('다른 맛집의 메뉴가 장바구니에 있습니다. 기존 장바구니를 비우고 추가하시겠습니까?')) {
      return;
    }
    cart = [];
  }
  
  // 동일한 메뉴와 옵션이 있는지 확인
  const existingIndex = cart.findIndex(c => 
    c.menuId === item.menuId && 
    JSON.stringify(c.selectedOptions) === JSON.stringify(item.selectedOptions)
  );
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push({
      ...item,
      addedAt: Date.now()
    });
  }
  
  saveCart();
}

// 메뉴 모달 닫기
function closeMenuModal(event) {
  if (event && event.target.id !== 'menu-detail-modal') return;
  
  const modal = document.getElementById('menu-detail-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

// 토스트 메시지 표시
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// 장바구니 플로팅 버튼 표시
function showCartButton() {
  const existingButton = document.getElementById('floating-cart-button');
  if (existingButton) return;
  
  const button = document.createElement('button');
  button.id = 'floating-cart-button';
  button.className = 'fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-40 transition';
  button.onclick = showCartModal;
  button.innerHTML = `
    <i class="fas fa-shopping-cart text-2xl"></i>
    <span id="cart-badge" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold" style="display: none;">0</span>
  `;
  
  document.body.appendChild(button);
}

// 장바구니 모달 표시
function showCartModal() {
  if (cart.length === 0) {
    alert('장바구니가 비어있습니다.');
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const deliveryFee = subtotal >= 30000 ? 0 : 3000; // 3만원 이상 무료배달
  const total = subtotal + deliveryFee;
  
  const modalHTML = `
    <div id="cart-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="closeCartModal(event)">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">
              <i class="fas fa-shopping-cart text-orange-500 mr-2"></i>
              장바구니
            </h2>
            <button onclick="closeCartModal()" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
          
          <!-- 장바구니 아이템 -->
          <div class="space-y-4 mb-6">
            ${cart.map((item, index) => createCartItemHTML(item, index)).join('')}
          </div>
          
          <!-- 가격 요약 -->
          <div class="border-t pt-4 space-y-3">
            <div class="flex justify-between text-gray-600">
              <span>메뉴 합계</span>
              <span>₩${subtotal.toLocaleString()}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>배달비</span>
              <span>${deliveryFee === 0 ? '무료' : `₩${deliveryFee.toLocaleString()}`}</span>
            </div>
            ${subtotal < 30000 ? `
              <div class="text-sm text-blue-600">
                <i class="fas fa-info-circle mr-1"></i>
                ₩${(30000 - subtotal).toLocaleString()} 더 주문하시면 무료배달!
              </div>
            ` : ''}
            <div class="flex justify-between text-xl font-bold text-orange-600 pt-3 border-t">
              <span>총 결제금액</span>
              <span>₩${total.toLocaleString()}</span>
            </div>
          </div>
          
          <!-- 주문하기 버튼 -->
          <button onclick="proceedToOrder()" class="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg mt-6 transition">
            <i class="fas fa-credit-card mr-2"></i>
            ₩${total.toLocaleString()} 주문하기
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';
}

// 장바구니 아이템 HTML
function createCartItemHTML(item, index) {
  return `
    <div class="flex gap-4 p-4 bg-gray-50 rounded-lg">
      <div class="w-20 h-20 flex-shrink-0">
        ${item.image_url ? `
          <img src="${item.image_url}" alt="${item.menuName}" class="w-full h-full object-cover rounded-lg" />
        ` : `
          <div class="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
            <i class="fas fa-utensils text-2xl text-orange-400"></i>
          </div>
        `}
      </div>
      
      <div class="flex-1">
        <h4 class="font-bold mb-1">${item.menuName}</h4>
        ${item.selectedOptions.length > 0 ? `
          <div class="text-sm text-gray-600 mb-2">
            ${item.selectedOptions.map(opt => `${opt.group}: ${opt.option}`).join(', ')}
          </div>
        ` : ''}
        <div class="flex items-center gap-2">
          <button onclick="updateCartQuantity(${index}, -1)" class="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center">
            <i class="fas fa-minus text-xs"></i>
          </button>
          <span class="font-semibold">${item.quantity}</span>
          <button onclick="updateCartQuantity(${index}, 1)" class="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center">
            <i class="fas fa-plus text-xs"></i>
          </button>
        </div>
      </div>
      
      <div class="text-right">
        <div class="font-bold text-orange-600">₩${(item.unitPrice * item.quantity).toLocaleString()}</div>
        <button onclick="removeFromCart(${index})" class="text-red-500 text-sm mt-2">
          <i class="fas fa-trash mr-1"></i>삭제
        </button>
      </div>
    </div>
  `;
}

// 장바구니 수량 업데이트
function updateCartQuantity(index, delta) {
  if (cart[index]) {
    cart[index].quantity = Math.max(1, cart[index].quantity + delta);
    saveCart();
    closeCartModal();
    showCartModal();
  }
}

// 장바구니에서 제거
function removeFromCart(index) {
  if (confirm('이 메뉴를 장바구니에서 삭제하시겠습니까?')) {
    cart.splice(index, 1);
    saveCart();
    closeCartModal();
    if (cart.length > 0) {
      showCartModal();
    }
  }
}

// 장바구니 모달 닫기
function closeCartModal(event) {
  if (event && event.target.id !== 'cart-modal') return;
  
  const modal = document.getElementById('cart-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

// 주문 진행
function proceedToOrder() {
  closeCartModal();
  showOrderForm();
}

// 주문 폼 표시
function showOrderForm() {
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const deliveryFee = subtotal >= 30000 ? 0 : 3000;
  const total = subtotal + deliveryFee;
  
  const modalHTML = `
    <div id="order-form-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="closeOrderForm(event)">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">
              <i class="fas fa-file-invoice text-orange-500 mr-2"></i>
              주문하기
            </h2>
            <button onclick="closeOrderForm()" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
          
          <form id="order-form" onsubmit="submitOrder(event)">
            <!-- 주문자 정보 -->
            <div class="mb-6">
              <h3 class="font-bold text-lg mb-3">주문자 정보</h3>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium mb-1">이름 <span class="text-red-500">*</span></label>
                  <input type="text" name="customerName" required class="w-full border rounded-lg px-4 py-2" placeholder="홍길동" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">전화번호 <span class="text-red-500">*</span></label>
                  <input type="tel" name="customerPhone" required class="w-full border rounded-lg px-4 py-2" placeholder="010-1234-5678" />
                </div>
              </div>
            </div>
            
            <!-- 배달 정보 -->
            <div class="mb-6">
              <h3 class="font-bold text-lg mb-3">배달 정보</h3>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium mb-1">배달 주소 <span class="text-red-500">*</span></label>
                  <input type="text" name="deliveryAddress" required class="w-full border rounded-lg px-4 py-2" placeholder="서울시 강남구 테헤란로 123" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">배달 요청사항</label>
                  <textarea name="deliveryRequest" class="w-full border rounded-lg px-4 py-2" rows="3" placeholder="문 앞에 놓아주세요"></textarea>
                </div>
              </div>
            </div>
            
            <!-- 결제 방법 -->
            <div class="mb-6">
              <h3 class="font-bold text-lg mb-3">결제 방법</h3>
              <div class="space-y-2">
                <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="paymentMethod" value="card" checked class="mr-3" />
                  <i class="fas fa-credit-card text-blue-500 mr-2"></i>
                  <span>신용/체크카드</span>
                </label>
                <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="paymentMethod" value="cash" class="mr-3" />
                  <i class="fas fa-money-bill-wave text-green-500 mr-2"></i>
                  <span>현금</span>
                </label>
                <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="paymentMethod" value="transfer" class="mr-3" />
                  <i class="fas fa-university text-purple-500 mr-2"></i>
                  <span>계좌이체</span>
                </label>
              </div>
            </div>
            
            <!-- 주문 요약 -->
            <div class="border-t pt-4 mb-6">
              <h3 class="font-bold text-lg mb-3">주문 요약</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>메뉴 합계</span>
                  <span>₩${subtotal.toLocaleString()}</span>
                </div>
                <div class="flex justify-between">
                  <span>배달비</span>
                  <span>${deliveryFee === 0 ? '무료' : `₩${deliveryFee.toLocaleString()}`}</span>
                </div>
                <div class="flex justify-between text-lg font-bold text-orange-600 pt-2 border-t">
                  <span>총 결제금액</span>
                  <span>₩${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <!-- 주문 버튼 -->
            <button type="submit" class="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg transition">
              <i class="fas fa-check-circle mr-2"></i>
              ₩${total.toLocaleString()} 결제하기
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';
}

// 주문 제출
function submitOrder(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const deliveryFee = subtotal >= 30000 ? 0 : 3000;
  const total = subtotal + deliveryFee;
  
  const order = {
    orderNumber: 'ORD' + Date.now(),
    sessionId: getSessionId(),
    restaurantId: cart[0].restaurantId,
    customerName: formData.get('customerName'),
    customerPhone: formData.get('customerPhone'),
    deliveryAddress: formData.get('deliveryAddress'),
    deliveryRequest: formData.get('deliveryRequest'),
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    total: total,
    paymentMethod: formData.get('paymentMethod'),
    status: 'pending',
    items: cart,
    orderedAt: new Date().toISOString()
  };
  
  // 주문 저장
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  
  // 장바구니 비우기
  cart = [];
  saveCart();
  
  closeOrderForm();
  showOrderConfirmation(order);
}

// 주문 확인 모달
function showOrderConfirmation(order) {
  const modalHTML = `
    <div id="order-confirm-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="closeOrderConfirmation(event)">
      <div class="bg-white rounded-2xl max-w-md w-full p-6" onclick="event.stopPropagation()">
        <div class="text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-check text-green-500 text-4xl"></i>
          </div>
          <h2 class="text-2xl font-bold mb-2">주문이 완료되었습니다!</h2>
          <p class="text-gray-600 mb-4">주문번호: ${order.orderNumber}</p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span>메뉴 합계</span>
                <span>₩${order.subtotal.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span>배달비</span>
                <span>${order.deliveryFee === 0 ? '무료' : `₩${order.deliveryFee.toLocaleString()}`}</span>
              </div>
              <div class="flex justify-between font-bold text-orange-600 pt-2 border-t">
                <span>총 결제금액</span>
                <span>₩${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <p class="text-sm text-gray-600 mb-6">
            예상 배달 시간: 약 30-40분
          </p>
          
          <div class="space-y-3">
            <button onclick="viewOrderHistory()" class="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
              주문 내역 보기
            </button>
            <button onclick="closeOrderConfirmation()" class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition">
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';
}

// 주문 폼 닫기
function closeOrderForm(event) {
  if (event && event.target.id !== 'order-form-modal') return;
  
  const modal = document.getElementById('order-form-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

// 주문 확인 모달 닫기
function closeOrderConfirmation(event) {
  if (event && event.target.id !== 'order-confirm-modal') return;
  
  const modal = document.getElementById('order-confirm-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

// 주문 내역 보기
function viewOrderHistory() {
  closeOrderConfirmation();
  
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  
  if (orders.length === 0) {
    alert('주문 내역이 없습니다.');
    return;
  }
  
  const modalHTML = `
    <div id="order-history-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="closeOrderHistory(event)">
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">
              <i class="fas fa-history text-orange-500 mr-2"></i>
              주문 내역
            </h2>
            <button onclick="closeOrderHistory()" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
          
          <div class="space-y-4">
            ${orders.reverse().map((order, index) => createOrderHistoryCard(order)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';
}

// 주문 내역 카드
function createOrderHistoryCard(order) {
  const statusText = {
    'pending': '주문 접수',
    'confirmed': '주문 확인',
    'preparing': '조리 중',
    'delivering': '배달 중',
    'completed': '배달 완료',
    'cancelled': '주문 취소'
  };
  
  const statusColor = {
    'pending': 'bg-yellow-100 text-yellow-600',
    'confirmed': 'bg-blue-100 text-blue-600',
    'preparing': 'bg-purple-100 text-purple-600',
    'delivering': 'bg-orange-100 text-orange-600',
    'completed': 'bg-green-100 text-green-600',
    'cancelled': 'bg-gray-100 text-gray-600'
  };
  
  return `
    <div class="border rounded-lg p-4">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="font-bold text-lg">${order.orderNumber}</h3>
          <p class="text-sm text-gray-600">${new Date(order.orderedAt).toLocaleString('ko-KR')}</p>
        </div>
        <span class="px-3 py-1 rounded-full text-sm font-semibold ${statusColor[order.status] || 'bg-gray-100 text-gray-600'}">
          ${statusText[order.status] || '알 수 없음'}
        </span>
      </div>
      
      <div class="space-y-2 mb-3">
        ${order.items.map(item => `
          <div class="flex justify-between text-sm">
            <span>${item.menuName} x ${item.quantity}</span>
            <span class="text-gray-600">₩${(item.unitPrice * item.quantity).toLocaleString()}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="border-t pt-3 flex justify-between font-bold text-orange-600">
        <span>총 결제금액</span>
        <span>₩${order.total.toLocaleString()}</span>
      </div>
      
      <div class="mt-3 text-sm text-gray-600">
        <div><i class="fas fa-map-marker-alt mr-2"></i>${order.deliveryAddress}</div>
        <div><i class="fas fa-phone mr-2"></i>${order.customerPhone}</div>
      </div>
    </div>
  `;
}

// 주문 내역 모달 닫기
function closeOrderHistory(event) {
  if (event && event.target.id !== 'order-history-modal') return;
  
  const modal = document.getElementById('order-history-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
  loadCart();
  loadMenus();
  showCartButton();
});
