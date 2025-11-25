-- 전라도 로컬 미식 슈퍼로드 - 초기 스키마
-- Phase 1: 핵심 테이블 (맛집, 카테고리, 지역)

-- ===========================================
-- 1. 지역 테이블 (전라남도, 전라북도)
-- ===========================================
CREATE TABLE IF NOT EXISTS regions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  name_ja TEXT,
  province TEXT NOT NULL, -- '전라남도' or '전라북도'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- 2. 카테고리 테이블 (맛집 업종)
-- ===========================================
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  name_ja TEXT,
  icon TEXT, -- Font Awesome icon class
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- 3. 맛집 테이블 (핵심 테이블)
-- ===========================================
CREATE TABLE IF NOT EXISTS restaurants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 기본 정보
  name TEXT NOT NULL,
  category_id INTEGER,
  region_id INTEGER,
  
  -- 다국어 설명
  description_ko TEXT,
  description_en TEXT,
  description_zh TEXT,
  description_ja TEXT,
  
  -- 위치 정보
  address TEXT NOT NULL,
  lat REAL,
  lng REAL,
  
  -- 연락처
  phone TEXT,
  website TEXT,
  
  -- 운영 정보
  business_hours TEXT, -- JSON format
  closed_days TEXT,
  
  -- 메뉴 및 가격
  signature_menu TEXT, -- 주력 메뉴 (최대 5개, comma separated)
  price_range TEXT, -- '₩5,000-₩15,000'
  menu_images TEXT, -- JSON array of image URLs (최대 5장)
  
  -- 배달/포장/예약
  delivery_available BOOLEAN DEFAULT 0,
  packaging_available BOOLEAN DEFAULT 1,
  reservation_available BOOLEAN DEFAULT 0,
  delivery_fee INTEGER DEFAULT 0, -- 배달비 (0 = 무료)
  
  -- 결제 방식
  payment_methods TEXT, -- JSON array: ['card', 'cash', 'transfer']
  
  -- 평점 및 리뷰
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- 이미지
  image_url TEXT,
  thumbnail_url TEXT,
  
  -- 상태
  verified BOOLEAN DEFAULT 0, -- 검증된 맛집 여부
  featured BOOLEAN DEFAULT 0, -- 추천 맛집 여부
  status TEXT DEFAULT 'active', -- 'active', 'pending', 'suspended'
  
  -- 출처 (어떤 플랫폼에서 추천됨)
  source_platform TEXT, -- 'naver', 'mango', 'kakao', 'dining_code', etc.
  
  -- 통계
  view_count INTEGER DEFAULT 0,
  order_count INTEGER DEFAULT 0,
  
  -- 타임스탬프
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- 외래 키
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- ===========================================
-- 4. 맛집 메뉴 테이블
-- ===========================================
CREATE TABLE IF NOT EXISTS restaurant_menus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurant_id INTEGER NOT NULL,
  
  -- 메뉴 정보
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT,
  
  -- 카테고리
  category TEXT, -- '메인', '사이드', '음료'
  
  -- 상태
  available BOOLEAN DEFAULT 1,
  popular BOOLEAN DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- ===========================================
-- 5. 인덱스 생성 (성능 최적화)
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_restaurants_region ON restaurants(region_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_category ON restaurants(category_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_status ON restaurants(status);
CREATE INDEX IF NOT EXISTS idx_restaurants_delivery ON restaurants(delivery_available);
CREATE INDEX IF NOT EXISTS idx_restaurants_rating ON restaurants(rating DESC);
CREATE INDEX IF NOT EXISTS idx_restaurant_menus_restaurant ON restaurant_menus(restaurant_id);
