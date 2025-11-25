-- 전라도 로컬 미식 슈퍼로드 - 확장 기능
-- Phase 2: 축제, 숙박, 교통, 촬영지, 금융기관

-- ===========================================
-- 1. 지역 축제 테이블
-- ===========================================
CREATE TABLE IF NOT EXISTS festivals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 기본 정보
  name_ko TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  name_ja TEXT,
  
  -- 설명
  description_ko TEXT,
  description_en TEXT,
  description_zh TEXT,
  description_ja TEXT,
  
  -- 위치
  region_id INTEGER,
  address TEXT,
  lat REAL,
  lng REAL,
  
  -- 기간
  start_date TEXT NOT NULL, -- ISO date
  end_date TEXT NOT NULL,
  
  -- 카테고리
  category TEXT, -- '음식', '문화', '전통', '체험'
  
  -- 연락처
  phone TEXT,
  website TEXT,
  
  -- 이미지
  image_url TEXT,
  thumbnail_url TEXT,
  
  -- 상태
  status TEXT DEFAULT 'active',
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- ===========================================
-- 2. 숙박업소 테이블
-- ===========================================
CREATE TABLE IF NOT EXISTS accommodations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 기본 정보
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- '호텔', '펜션', '한옥', '게스트하우스'
  
  -- 설명 (다국어)
  description_ko TEXT,
  description_en TEXT,
  description_zh TEXT,
  description_ja TEXT,
  
  -- 위치
  region_id INTEGER,
  address TEXT NOT NULL,
  lat REAL,
  lng REAL,
  
  -- 연락처
  phone TEXT,
  website TEXT,
  
  -- 가격
  price_range TEXT, -- '₩50,000-₩150,000'
  
  -- 편의시설
  amenities TEXT, -- JSON array: ['wifi', 'parking', 'breakfast']
  
  -- 평점
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- 이미지
  image_url TEXT,
  images TEXT, -- JSON array
  
  -- 출처 (한국관광공사 등)
  source TEXT,
  source_id TEXT,
  
  -- 상태
  status TEXT DEFAULT 'active',
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- ===========================================
-- 3. 교통편 테이블 (공항, 터미널, 역)
-- ===========================================
CREATE TABLE IF NOT EXISTS transportation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 기본 정보
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'airport', 'bus_terminal', 'train_station', 'port'
  
  -- 설명 (다국어)
  description_ko TEXT,
  description_en TEXT,
  description_zh TEXT,
  description_ja TEXT,
  
  -- 위치
  region_id INTEGER,
  address TEXT NOT NULL,
  lat REAL,
  lng REAL,
  
  -- 연락처
  phone TEXT,
  website TEXT,
  
  -- 노선 정보
  routes TEXT, -- JSON array of routes
  
  -- 운영 시간
  operating_hours TEXT,
  
  -- 편의시설
  facilities TEXT, -- JSON array
  
  -- 이미지
  image_url TEXT,
  
  -- 상태
  status TEXT DEFAULT 'active',
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- ===========================================
-- 4. 촬영지 테이블 (드라마, 영화, 예능)
-- ===========================================
CREATE TABLE IF NOT EXISTS filming_locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 장소 정보
  location_name TEXT NOT NULL,
  
  -- 작품 정보
  content_title_ko TEXT NOT NULL,
  content_title_en TEXT,
  content_title_zh TEXT,
  content_title_ja TEXT,
  
  -- 작품 타입
  content_type TEXT NOT NULL, -- 'drama', 'movie', 'variety'
  
  -- 제작 정보
  year INTEGER,
  network TEXT, -- 'tvN', 'JTBC', 'Netflix'
  
  -- 설명
  description_ko TEXT,
  description_en TEXT,
  description_zh TEXT,
  description_ja TEXT,
  
  -- 장면 설명
  scene_description TEXT,
  
  -- 위치
  region_id INTEGER,
  address TEXT,
  lat REAL,
  lng REAL,
  
  -- 이미지
  image_url TEXT,
  images TEXT, -- JSON array
  
  -- 한류 관련
  korean_wave BOOLEAN DEFAULT 1, -- 한류 콘텐츠 여부
  
  -- 방문 정보
  visit_available BOOLEAN DEFAULT 1,
  entry_fee INTEGER DEFAULT 0,
  
  -- 상태
  status TEXT DEFAULT 'active',
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- ===========================================
-- 5. 금융기관 테이블 (농협, 하나로마트)
-- ===========================================
CREATE TABLE IF NOT EXISTS financial_institutions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 기본 정보
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'nonghyup', 'hanaro_mart', 'local_food_market'
  
  -- 위치
  region_id INTEGER,
  address TEXT NOT NULL,
  lat REAL,
  lng REAL,
  
  -- 상세 주소 (읍면 단위)
  district TEXT, -- 읍/면/동
  
  -- 연락처
  phone TEXT,
  
  -- 운영 시간
  business_hours TEXT,
  closed_days TEXT,
  
  -- 취급 상품 (하나로마트/로컬푸드)
  products TEXT, -- JSON array
  
  -- 지역 상품권 취급 여부
  local_currency_accepted BOOLEAN DEFAULT 1,
  
  -- 이미지
  image_url TEXT,
  
  -- 상태
  status TEXT DEFAULT 'active',
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- ===========================================
-- 6. 지역 상품권 정보 테이블
-- ===========================================
CREATE TABLE IF NOT EXISTS local_currencies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- 상품권 정보
  name TEXT NOT NULL,
  region_id INTEGER,
  
  -- 설명
  description_ko TEXT,
  description_en TEXT,
  description_zh TEXT,
  description_ja TEXT,
  
  -- 할인율
  discount_rate REAL, -- 0.06 = 6% 할인
  
  -- 사용처
  accepted_at TEXT, -- JSON array of business types
  
  -- 구매 방법
  purchase_method TEXT,
  
  -- 유효기간
  validity_period TEXT,
  
  -- 이미지
  image_url TEXT,
  
  -- 상태
  status TEXT DEFAULT 'active',
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- ===========================================
-- 7. 인덱스 생성
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_festivals_region ON festivals(region_id);
CREATE INDEX IF NOT EXISTS idx_festivals_dates ON festivals(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_accommodations_region ON accommodations(region_id);
CREATE INDEX IF NOT EXISTS idx_accommodations_type ON accommodations(type);
CREATE INDEX IF NOT EXISTS idx_transportation_region ON transportation(region_id);
CREATE INDEX IF NOT EXISTS idx_transportation_type ON transportation(type);
CREATE INDEX IF NOT EXISTS idx_filming_locations_region ON filming_locations(region_id);
CREATE INDEX IF NOT EXISTS idx_filming_locations_type ON filming_locations(content_type);
CREATE INDEX IF NOT EXISTS idx_filming_locations_korean_wave ON filming_locations(korean_wave);
CREATE INDEX IF NOT EXISTS idx_financial_institutions_region ON financial_institutions(region_id);
CREATE INDEX IF NOT EXISTS idx_financial_institutions_type ON financial_institutions(type);
CREATE INDEX IF NOT EXISTS idx_local_currencies_region ON local_currencies(region_id);
