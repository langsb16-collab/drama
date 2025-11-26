-- 메뉴 옵션 그룹과 옵션 아이템 삽입

-- 메뉴 옵션 그룹 테이블 생성
CREATE TABLE IF NOT EXISTS menu_option_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  menu_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  required INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menu_option_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  option_group_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price INTEGER DEFAULT 0,
  is_default INTEGER DEFAULT 0,
  is_available INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 떡갈비 정식 옵션 (menu_id: 1)
INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (1, '맵기 조절', 'single', 1);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(1, '순한맛', 0, 1),
(1, '보통맛', 0, 0),
(1, '매운맛', 0, 0);

INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (1, '추가 옵션', 'multiple', 0);
INSERT INTO menu_option_items (option_group_id, name, price) VALUES 
(2, '곁들이 김치 추가', 2000),
(2, '공기밥 추가', 1000),
(2, '계란 후라이', 1500);

-- 나주곰탕 옵션 (menu_id: 11)
INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (11, '고기 양', 'single', 1);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(3, '기본', 0, 1),
(3, '고기 추가 (100g)', 5000, 0),
(3, '고기 많이 (200g)', 8000, 0);

INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (11, '국물', 'single', 0);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(4, '기본 국물', 0, 1),
(4, '진한 국물', 1000, 0),
(4, '맑은 국물', 0, 0);

-- 홍어삼합 옵션 (menu_id: 16)
INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (16, '홍어 숙성도', 'single', 1);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(5, '약하게', 0, 0),
(5, '중간', 0, 1),
(5, '강하게', 0, 0);

-- 전주비빔밥 옵션 (menu_id: 21)
INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (21, '맵기 조절', 'single', 1);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(6, '안 맵게', 0, 0),
(6, '보통', 0, 1),
(6, '매운맛', 0, 0),
(6, '아주 맵게', 0, 0);

INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (21, '계란 옵션', 'single', 0);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(7, '반숙 계란', 0, 1),
(7, '완숙 계란', 0, 0),
(7, '계란 없이', 0, 0);

-- 세발낙지 볶음 옵션 (menu_id: 26)
INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (26, '맵기 조절', 'single', 1);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(8, '덜 맵게', 0, 0),
(8, '보통 매운맛', 0, 1),
(8, '아주 맵게', 1000, 0);

INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (26, '추가 토핑', 'multiple', 0);
INSERT INTO menu_option_items (option_group_id, name, price) VALUES 
(9, '낙지 추가', 10000),
(9, '야채 추가', 3000),
(9, '공기밥 추가', 1000);

-- 오리탕 옵션 (menu_id: 31)
INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (31, '크기', 'single', 1);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(10, '소 (2-3인)', 0, 1),
(10, '중 (3-4인)', 10000, 0),
(10, '대 (5-6인)', 20000, 0);

-- 돌산갓김치 정식 옵션 (menu_id: 36)
INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (36, '반찬 추가', 'multiple', 0);
INSERT INTO menu_option_items (option_group_id, name, price) VALUES 
(11, '갓김치 리필', 3000),
(11, '반찬 모듬 추가', 5000),
(11, '공기밥 추가', 1000);

-- 짱뚱어탕 옵션 (menu_id: 41)
INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (41, '맵기 조절', 'single', 1);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(12, '순한맛', 0, 1),
(12, '보통맛', 0, 0),
(12, '매운맛', 1000, 0);

-- 담양떡갈비 옵션 (menu_id: 46)
INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (46, '굽기 정도', 'single', 1);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(13, '웰던 (완전히)', 0, 0),
(13, '미디엄 (적당히)', 0, 1),
(13, '레어 (약하게)', 0, 0);

INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (46, '추가 옵션', 'multiple', 0);
INSERT INTO menu_option_items (option_group_id, name, price) VALUES 
(14, '떡갈비 1개 추가', 7000),
(14, '쌈야채 추가', 3000);

-- 광양불고기 옵션 (menu_id: 51)
INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (51, '고기 양', 'single', 1);
INSERT INTO menu_option_items (option_group_id, name, price, is_default) VALUES 
(15, '기본 (200g)', 0, 1),
(15, '곱빼기 (300g)', 5000, 0),
(15, '더블 (400g)', 10000, 0);

INSERT INTO menu_option_groups (menu_id, name, type, required) VALUES (51, '추가 옵션', 'multiple', 0);
INSERT INTO menu_option_items (option_group_id, name, price) VALUES 
(16, '쌈야채 세트', 3000),
(16, '마늘 추가', 2000),
(16, '된장찌개 추가', 5000);
