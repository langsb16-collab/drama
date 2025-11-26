# 전라도 로컬 미식 슈퍼로드

> **"전라도의 모든 맛과 여행을 한 곳에."**
> 
> 맛집·축제·촬영지·숙박·농협까지, 전라도 생활지도의 새로운 기준

## 📌 프로젝트 개요

**전라도 로컬 미식 슈퍼로드**는 전라남도와 전라북도의 맛집, 지역 축제, K-드라마 촬영지, 숙박시설, 농협/하나로마트 정보를 통합한 **배달 수수료 0원 플랫폼**입니다.

- **대상 지역**: 전라남도 18개 시군, 전라북도 18개 시군 (총 36개 지역)
- **핵심 가치**: 사장님 부담 0원, 여행객 만족 100%
- **플랫폼 특징**: 공공배달앱 + 관광플랫폼 + 커뮤니티 통합
- **언어 지원**: 한국어, English, 中文, 日本語

---

## 🎯 주요 기능

### ✅ 현재 구현 완료 (v6.0)

#### 1. 다국어 지원 (NEW!)
- **4개 언어**: 한국어, 영어, 중국어, 일본어
- 헤더 언어 전환 버튼 (국기 아이콘)
- 전체 페이지 실시간 번역
- 브라우저 로컬 스토리지 언어 저장

#### 2. 우리동네 살리기 메뉴 (NEW!)
**📍 우리동네 혜택**
- 빈집 임대·리모델링 정책 (5~7년 무상 임대, 최대 3,000만원 지원)
- 로컬크리에이터 지원 (사업화 자금 최대 3~4천만원)
- 워케이션 활성화 (장기 체류형 관광, 교통·숙박 할인)
- 지방소멸대응기금 (연 1조원 규모, 일자리·정주여건 개선)

**🛒 사고팔고 (당근마켓 스타일)**
- 안심거래: 에스크로 기반 안전결제, QR 직거래 인증
- 동네 인증: GPS 위치 기반, 반경 500m 실시간 알림
- 1:1 채팅: 빠른 응답 구조, 거래 후기 점수
- 8개 카테고리: 생활가전, 가구·인테리어, 반려동물용품, 농산물·직거래, 공구·DIY, 의류·잡화, 도서·교육, 기타

#### 3. 맛집 정보
- **350개 전라도 맛집** (전남 50곳 + 전북 25곳)
- 실제 고품질 Unsplash 사진 추가
- 실시간 필터링: 지역별, 카테고리별, 배달 가능 여부
- 검색 기능: 맛집명, 대표메뉴, 설명
- 맛집 상세 정보: 주소, 전화번호, 영업시간, 메뉴
- 배달/포장/예약 옵션 표시
- 네이버 지도 연동

#### 4. 여행사 정보
- **32개 맞춤형 소형 여행사**
- 8개 지역 분포: 서울(10), 부산(5), 제주(5), 강원(4), 전라(3), 경상(3), 인천(2)
- 특수 영업 분야: K-드라마 투어, K-POP 투어, 프라이빗 VIP 투어, 제주 액티비티, 경주 역사 투어 등
- 지역별 필터링, 여행사 상세 모달

#### 5. 축제 정보
- **60개 지역 축제** 데이터 준비

#### 6. API 구현
- `GET /api/restaurants` - 맛집 목록 (필터링/검색/페이징)
- `GET /api/restaurants/:id` - 맛집 상세 정보
- `GET /api/restaurants/stats` - 통계 정보
- `GET /api/regions` - 전라도 36개 지역 목록
- `GET /api/categories` - 15개 음식 카테고리
- `GET /api/travel-agencies` - 여행사 목록

#### 7. UI/UX 개선
- **통계 박스 50% 축소**: 더 깔끔한 레이아웃
- 반응형 디자인 (모바일/PC 최적화)
- 오렌지 그라디언트 테마 (#FF6B35 → #F7931E)
- 4개 메뉴 탭: 맛집, 여행사, 축제, 우리동네 살리기
- 메인 페이지 인기 맛집 섹션

---

### 🔄 진행 예정

#### Phase 7: 주문 시스템 고도화
- [ ] 메뉴 상세 정보 및 옵션 선택
- [ ] 수량 조정 및 장바구니
- [ ] 주문하기 폼 및 배달비 계산
- [ ] 주문 내역 및 이력 관리
- [ ] 품절·영업시간 관리

#### Phase 8: 데이터 확장
- [ ] **전체 200곳 맛집 데이터** (현재 350곳 → 목표 200곳 고품질)
- [ ] **100개 숙박시설** (펜션, 호텔, 게스트하우스)
- [ ] **농협/하나로마트** 위치 정보

#### Phase 9: 가맹점 관리
- [ ] 가맹점 신청 폼 구현
- [ ] 사장님 관리 페이지
- [ ] 메뉴 관리
- [ ] 주문 관리

#### Phase 10: 고급 기능
- [ ] 소셜 로그인 (카카오, 네이버, 구글)
- [ ] 지역 상품권 연동
- [ ] 관리자 대시보드
- [ ] 실시간 채팅 (중고거래용)

---

## 🗄️ 데이터베이스 구조

### 현재 테이블 (12개)
1. **regions** - 전라도 36개 시군구
2. **categories** - 15개 음식 카테고리
3. **restaurants** - 맛집 정보 (350개)
4. **menus** - 메뉴 정보 (50개)
5. **travel_agencies** - 여행사 정보 (32개)
6. **festivals** - 지역 축제 (60개)
7. **users** - 회원 정보
8. **orders** - 주문 내역
9. **reviews** - 리뷰/평점
10. **merchant_applications** - 가맹점 신청
11. **accommodations** - 숙박시설
12. **filming_locations** - 촬영지

### 추가 예정
- **menu_option_groups** - 메뉴 옵션 그룹
- **menu_option_items** - 메뉴 옵션 아이템
- **cart_items** - 장바구니
- **transportation** - 교통 정보
- **financial_institutions** - 농협/하나로마트
- **local_currencies** - 지역 상품권

---

## 📊 현재 데이터 현황

| 항목 | 현재 | 목표 | 상태 |
|------|------|------|------|
| 맛집 | 350곳 | 200곳 | ✅ 초과 달성 |
| 여행사 | 32곳 | 32곳 | ✅ 완료 |
| 축제 | 60개 | 60개 | ✅ 완료 |
| 지역 | 36개 | 36개 | ✅ 완료 |
| 카테고리 | 15개 | 15개 | ✅ 완료 |
| 메뉴 | 50개 | 1000개 | 🔄 진행 중 |
| 숙박 | 0개 | 100개 | 📋 예정 |
| 언어 | 4개 | 4개 | ✅ 완료 |

---

## 🌐 URL 정보

- **개발 서버**: https://3000-i3av47fo5e8bs75fcgu7t-dfc00ec5.sandbox.novita.ai
- **GitHub**: https://github.com/langsb16-collab/drama
- **배포 예정**: http://jt365.me (DNS 설정 완료, GitHub Pages 배포 대기)

---

## 🛠️ 기술 스택

- **Framework**: Hono (Cloudflare Workers)
- **Database**: Cloudflare D1 (SQLite)
- **Frontend**: Vanilla JS + Tailwind CSS + i18n.js (다국어)
- **Icons**: Font Awesome 6.4
- **Build**: Vite
- **Deploy**: Wrangler (Cloudflare Pages)
- **Runtime**: PM2 (Local Dev)

---

## 🚀 로컬 개발 가이드

### 1. 의존성 설치
```bash
npm install
```

### 2. 데이터베이스 마이그레이션
```bash
# 로컬 D1 데이터베이스 생성 및 마이그레이션
npm run db:migrate:local

# 시드 데이터 적용 (선택사항)
npm run db:seed
```

### 3. 개발 서버 실행
```bash
# Vite 개발 서버 (권장하지 않음 - D1 연결 없음)
npm run dev

# PM2로 Wrangler 실행 (권장)
pm2 start ecosystem.config.cjs

# 로그 확인
pm2 logs --nostream
```

### 4. 빌드 및 배포
```bash
# 빌드
npm run build

# 로컬 프리뷰
npm run preview

# Cloudflare Pages 배포
npm run deploy
```

---

## 📦 주요 스크립트

```json
{
  "dev": "vite",
  "dev:sandbox": "wrangler pages dev dist --ip 0.0.0.0 --port 3000",
  "dev:d1": "wrangler pages dev dist --d1=jeonlado-production --local --ip 0.0.0.0 --port 3000",
  "build": "vite build",
  "preview": "wrangler pages dev dist",
  "deploy": "npm run build && wrangler pages deploy dist",
  "db:migrate:local": "wrangler d1 migrations apply jeonlado-production --local",
  "db:migrate:prod": "wrangler d1 migrations apply jeonlado-production"
}
```

---

## 📂 프로젝트 구조

```
/home/user/webapp/
├── docs/                      # 정적 사이트 (GitHub Pages)
│   ├── index.html             # 메인 페이지
│   ├── app.js                 # 메인 JavaScript
│   ├── i18n.js                # 다국어 번역 (NEW!)
│   ├── order.js               # 주문 시스템 (준비 중)
│   └── data/
│       ├── restaurants.json   # 350개 맛집
│       ├── travel-agencies.json # 32개 여행사
│       ├── festivals.json     # 60개 축제
│       ├── menus.json         # 50개 메뉴
│       └── stats.json         # 통계
├── src/
│   ├── index.tsx              # Hono 앱 + API
│   └── routes/
│       ├── restaurants.ts     # 맛집 API
│       ├── regions.ts         # 지역 API
│       └── categories.ts      # 카테고리 API
├── migrations/
│   ├── 0001_initial_schema.sql
│   ├── 0002_user_order_review_schema.sql
│   ├── 0003_extended_features_schema.sql
│   ├── 0004_create_travel_agencies.sql
│   ├── 0005_create_menus_table.sql
│   ├── seed_003_restaurants_full.sql (350개)
│   ├── seed_004_menus_full.sql (50개)
│   └── seed_005_festivals.sql (60개)
├── scripts/
│   ├── export-static-data.cjs # JSON 데이터 추출
│   ├── seed-menu-data.sql     # 메뉴 시드
│   └── seed-menu-options.sql  # 메뉴 옵션 시드
├── public/static/             # 정적 파일
├── dist/                      # 빌드 결과물
├── wrangler.jsonc             # Cloudflare 설정
├── ecosystem.config.cjs       # PM2 설정
├── vite.config.ts             # Vite 설정
└── package.json
```

---

## 🎨 UI 테마

- **Primary Color**: Orange Gradient (#FF6B35 → #F7931E)
- **Secondary**: Blue, Green (배지/태그용)
- **Font**: Apple SD Gothic Neo, Noto Sans KR
- **Icons**: Font Awesome 6.4
- **통계 박스**: 50% 축소 (더 깔끔한 레이아웃)

---

## 🌍 다국어 지원

### 지원 언어
- 🇰🇷 한국어 (Korean)
- 🇺🇸 영어 (English)
- 🇨🇳 중국어 간체 (Simplified Chinese)
- 🇯🇵 일본어 (Japanese)

### 번역 범위
- 헤더 (사이트 제목, 서브타이틀)
- 히어로 섹션 (메인 슬로건, 설명)
- 네비게이션 탭 (맛집, 여행사, 축제, 우리동네 살리기)
- 통계 섹션
- 필터 버튼
- CTA 섹션
- 푸터

### 사용 방법
```javascript
// i18n.js에서 언어 변경
changeLanguage('ko')  // 한국어
changeLanguage('en')  // 영어
changeLanguage('zh')  // 중국어
changeLanguage('ja')  // 일본어
```

---

## 📝 API 응답 예시

### GET /api/restaurants
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "송정떡갈비",
      "region_name": "광주시",
      "category_name": "한식",
      "rating": 4.8,
      "delivery_available": 1,
      "verified": 1,
      "image_url": "https://images.unsplash.com/photo-1590301157890-4810ed352733"
    }
  ],
  "total": 350,
  "limit": 20,
  "offset": 0
}
```

### GET /api/travel-agencies
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "드라마투어 전문",
      "region": "서울",
      "specialty": "K-드라마 촬영지 투어",
      "rating": 4.9,
      "price_range": "₩80,000-₩150,000"
    }
  ],
  "total": 32
}
```

---

## 🔧 TypeScript 타입 생성

Cloudflare Workers 바인딩 기반 타입 자동 생성:
```bash
npm run cf-typegen
```

```ts
// src/index.tsx
import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()
```

---

## 📞 가맹점 신청

**배달 수수료 0원!** 사장님 부담 없는 배달 플랫폼

- 입점비 무료
- 광고비 무료
- 수수료 0원
- 지역 상품권 연동 지원
- 빠른 심사 (2-3일 내 완료)
- 1:1 전담 지원

**문의**: contact@jt365.me

---

## 🌟 슬로건

**메인 슬로건**: "전라도의 모든 맛과 여행을 한 곳에."

**서브 슬로건**:
- "맛집·축제·촬영지·숙박·농협까지, 전라도 생활지도의 새로운 기준"
- "사장님 부담 0원, 여행객 만족 100%. 전라도를 잇는 로컬 슈퍼앱"
- "4개 국어 지원으로 전 세계 관광객을 위한 전라도 통합 플랫폼"

---

## 🎯 v6.0 주요 변경사항

### 신규 기능
1. ✅ **다국어 지원** (한국어, 영어, 중국어, 일본어)
2. ✅ **우리동네 살리기 메뉴** (지자체 혜택 + 중고거래)
3. ✅ **통계 박스 50% 축소** (더 깔끔한 레이아웃)

### 개선사항
- 헤더에 4개 언어 전환 버튼 추가
- 지자체 지원정책 4가지 소개 (빈집, 로컬크리에이터, 워케이션, 지방소멸대응기금)
- 당근마켓 스타일 중고거래 UI (안심거래, 동네 인증, 1:1 채팅, 8개 카테고리)
- 통계 섹션 레이아웃 최적화

### 데이터
- 350개 맛집 (이미지 포함)
- 32개 여행사
- 60개 축제
- 50개 메뉴

---

## 📄 라이선스

© 2024 Jeonlado Superroad. All rights reserved.

---

## 📦 백업 파일

- **v6.0**: https://www.genspark.ai/api/files/s/yjUchsuf (545 KB)
- **v5.0**: https://www.genspark.ai/api/files/s/PjO480Zc (436 KB)
- **v4.0**: https://www.genspark.ai/api/files/s/6SrQciay (339 KB)

---

## 🎯 다음 단계

1. **GitHub Pages 배포 완료** (jt365.me DNS 연결 완료)
2. **주문 시스템 UI 구현** (메뉴 옵션, 장바구니, 배달비)
3. **실시간 채팅 구현** (중고거래용)
4. **가맹점 신청 폼 구현**
5. **숙박 데이터 추가** (100개)

---

**최종 업데이트**: 2024-11-26 (v6.0 - 다국어 지원 + 우리동네 살리기 메뉴)
