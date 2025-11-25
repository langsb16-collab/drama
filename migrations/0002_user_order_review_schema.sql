-- 전라도 로컬 미식 슈퍼로드 - 사용자/주문/리뷰 시스템
-- Phase 1: 핵심 기능 테이블

-- ===========================================
-- 1. 사용자 테이블
-- ===========================================
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 기본 정보
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  
  -- 소셜 로그인 (추후 구현)
  social_provider TEXT, -- 'google', 'naver', 'kakao'
  social_id TEXT,
  
  -- 실명 인증 (리뷰 작성 권한)
  verified BOOLEAN DEFAULT 0,
  verification_method TEXT, -- 'phone', 'email', 'social'
  
  -- 사용자 타입
  user_type TEXT DEFAULT 'customer', -- 'customer', 'merchant', 'admin'
  
  -- 통계
  total_orders INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  
  -- 상태
  status TEXT DEFAULT 'active', -- 'active', 'suspended', 'deleted'
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- 2. 주문 테이블
-- ===========================================
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 주문 번호 (자동 생성)
  order_number TEXT UNIQUE NOT NULL,
  
  -- 사용자 및 맛집
  user_id INTEGER NOT NULL,
  restaurant_id INTEGER NOT NULL,
  
  -- 주문 타입
  order_type TEXT NOT NULL, -- 'delivery', 'packaging', 'reservation'
  
  -- 주문 상품 (JSON)
  items TEXT NOT NULL, -- JSON array of {menu_id, name, price, quantity}
  
  -- 가격
  subtotal INTEGER NOT NULL, -- 상품 합계
  delivery_fee INTEGER DEFAULT 0,
  discount INTEGER DEFAULT 0,
  total INTEGER NOT NULL,
  
  -- 배달 정보
  delivery_address TEXT,
  delivery_phone TEXT,
  delivery_memo TEXT,
  
  -- 예약 정보
  reservation_date TEXT, -- ISO datetime
  reservation_people INTEGER,
  reservation_memo TEXT,
  
  -- 결제
  payment_method TEXT NOT NULL, -- 'card', 'cash', 'transfer', 'local_currency'
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  
  -- 지역 상품권 사용
  local_currency_used INTEGER DEFAULT 0,
  local_currency_type TEXT, -- '전라남도 상품권', '전라북도 상품권'
  
  -- 주문 상태
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'preparing', 'ready', 'delivering', 'completed', 'cancelled'
  
  -- 타임스탬프
  ordered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed_at DATETIME,
  completed_at DATETIME,
  cancelled_at DATETIME,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- ===========================================
-- 3. 리뷰 테이블
-- ===========================================
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 사용자 및 맛집
  user_id INTEGER NOT NULL,
  restaurant_id INTEGER NOT NULL,
  order_id INTEGER, -- 주문 기반 리뷰 (optional)
  
  -- 리뷰 내용
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  
  -- 이미지
  images TEXT, -- JSON array of image URLs
  
  -- 메뉴 평가
  menu_name TEXT,
  taste_rating INTEGER CHECK(taste_rating >= 1 AND taste_rating <= 5),
  service_rating INTEGER CHECK(service_rating >= 1 AND service_rating <= 5),
  price_rating INTEGER CHECK(price_rating >= 1 AND price_rating <= 5),
  
  -- 상태
  status TEXT DEFAULT 'active', -- 'active', 'hidden', 'reported'
  verified BOOLEAN DEFAULT 1, -- 실명 인증된 리뷰
  
  -- 도움됨 카운트
  helpful_count INTEGER DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- ===========================================
-- 4. 가맹점 신청 테이블
-- ===========================================
CREATE TABLE IF NOT EXISTS merchant_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 신청자 정보
  user_id INTEGER,
  
  -- 사업자 정보
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  owner_phone TEXT NOT NULL,
  owner_email TEXT,
  
  -- 위치 정보
  address TEXT NOT NULL,
  region_id INTEGER,
  
  -- 업종 정보
  category_id INTEGER NOT NULL,
  signature_menu TEXT NOT NULL, -- 주력 먹거리 (comma separated, max 5)
  menu_images TEXT, -- JSON array of image URLs (max 5)
  
  -- 운영 정보
  business_hours TEXT,
  delivery_available BOOLEAN DEFAULT 0,
  packaging_available BOOLEAN DEFAULT 1,
  reservation_available BOOLEAN DEFAULT 0,
  delivery_fee INTEGER DEFAULT 0,
  
  -- 결제 방식
  payment_methods TEXT, -- JSON array
  
  -- 사업자 등록증
  business_license_url TEXT,
  
  -- 신청 상태
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reviewed_by INTEGER, -- admin user_id
  reviewed_at DATETIME,
  rejection_reason TEXT,
  
  -- 연결된 맛집 ID (승인 시 생성)
  restaurant_id INTEGER,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (region_id) REFERENCES regions(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- ===========================================
-- 5. 인덱스 생성
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_restaurant ON reviews(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_merchant_applications_status ON merchant_applications(status);
