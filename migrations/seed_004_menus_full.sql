-- 주요 맛집 메뉴 데이터 추가
-- 각 맛집당 3-5개 메뉴 추가

-- 광주 맛집 메뉴 - 송정떡갈비 (ID: 51)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(51, '송정떡갈비', '광주 대표 떡갈비', 15000, '메인', 1, 1),
(51, '떡갈비정식', '떡갈비 + 반찬', 18000, '세트', 1, 1),
(51, '갈비탕', '사골 갈비탕', 12000, '탕', 1, 0);

-- 목포 맛집 메뉴 - 목포해물탕 (ID: 71)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(71, '대구탕', '신선한 대구 매운탕', 40000, '탕', 1, 1),
(71, '해물탕', '각종 해산물', 45000, '탕', 1, 1),
(71, '아귀찜', '매콤한 아귀찜', 50000, '찜', 1, 0);

-- 목포세발낙지 (ID: 72)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(72, '연포탕', '세발낙지 연포탕', 35000, '탕', 1, 1),
(72, '낙지볶음', '매콤한 낙지볶음', 30000, '볶음', 1, 1),
(72, '낙지탕탕이', '산낙지', 25000, '회', 1, 0);

-- 여수 맛집 메뉴 - 여수돌산갓김치 (ID: 81)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(81, '갓김치백반', '돌산 갓김치 정식', 12000, '정식', 1, 1),
(81, '갓김치회무침', '회와 갓김치', 35000, '회', 1, 1),
(81, '전복돌솥밥', '전복과 갓김치', 18000, '밥', 1, 0);

-- 여수게장백반 (ID: 82)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(82, '간장게장정식', '간장게장 2마리', 25000, '정식', 1, 1),
(82, '양념게장정식', '양념게장 2마리', 25000, '정식', 1, 1),
(82, '게장백반', '게장 + 반찬', 15000, '백반', 1, 1);

-- 순천 맛집 메뉴 - 순천만정원식당 (ID: 91)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(91, '순천만한정식', '남도 한정식', 25000, '정식', 1, 1),
(91, '갈치조림정식', '갈치조림 정식', 18000, '정식', 1, 1),
(91, '백반', '가정식 백반', 10000, '백반', 1, 0);

-- 나주 맛집 메뉴 - 나주곰탕 (ID: 101)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(101, '나주곰탕', '나주 대표 곰탕', 12000, '탕', 1, 1),
(101, '특곰탕', '고기 많은 곰탕', 15000, '탕', 1, 1),
(101, '갈비탕', '사골 갈비탕', 13000, '탕', 1, 0),
(101, '도가니탕', '도가니 곰탕', 16000, '탕', 1, 0);

-- 담양 맛집 메뉴 - 담양대통밥 (ID: 106)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(106, '대통밥정식', '대나무통밥', 15000, '정식', 1, 1),
(106, '죽순정식', '죽순 요리', 18000, '정식', 1, 1),
(106, '산채비빔밥', '산채 비빔밥', 12000, '밥', 1, 0);

-- 담양떡갈비 (ID: 107)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(107, '떡갈비정식', '담양 떡갈비', 16000, '정식', 1, 1),
(107, '양념갈비', '양념 갈비', 18000, '고기', 1, 1),
(107, '갈비탕', '사골 갈비탕', 12000, '탕', 1, 0);

-- 전주 맛집 메뉴 - 전주한옥마을비빔밥 (ID: 126)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(126, '전주비빔밥', '전주 비빔밥', 12000, '밥', 1, 1),
(126, '돌솥비빔밥', '돌솥 비빔밥', 13000, '밥', 1, 1),
(126, '육회비빔밥', '육회 비빔밥', 15000, '밥', 1, 1),
(126, '콩나물국밥', '콩나물국밥', 8000, '밥', 1, 0);

-- 전주콩나물국밥 (ID: 127)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(127, '콩나물국밥', '전주 콩나물국밥', 8000, '밥', 1, 1),
(127, '콩나물해장국', '해장국', 9000, '국', 1, 1),
(127, '순대국밥', '순대국밥', 9000, '밥', 1, 0);

-- 가족회관 (기존 ID: 26)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(26, '전주비빔밥', '전주 대표 비빔밥', 12000, '밥', 1, 1),
(26, '콩나물국밥', '콩나물국밥', 8000, '밥', 1, 1),
(26, '육회비빔밥', '육회 비빔밥', 15000, '밥', 1, 1);

-- 군산 맛집 메뉴 - 이성당 (기존 ID: 36)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(36, '단팥빵', '군산 대표 빵', 2500, '빵', 1, 1),
(36, '야채빵', '야채빵', 2000, '빵', 1, 1),
(36, '크림빵', '크림빵', 2200, '빵', 1, 1),
(36, '소보로빵', '소보로빵', 2300, '빵', 1, 0);

-- 군산회국수 (ID: 143)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(143, '회국수', '군산 회국수', 10000, '국수', 1, 1),
(143, '물회', '물회', 12000, '회', 1, 1),
(143, '비빔국수', '비빔국수', 9000, '국수', 1, 0);

-- 남원 맛집 메뉴 - 남원추어탕 (ID: 161)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(161, '추어탕', '남원 추어탕', 11000, '탕', 1, 1),
(161, '추어튀김', '추어튀김', 15000, '튀김', 1, 1),
(161, '추어탕정식', '추어탕 정식', 13000, '정식', 1, 1);

-- 광양불고기 (ID: 116)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(116, '광양불고기', '광양식 불고기', 18000, '고기', 1, 1),
(116, '불고기정식', '불고기 정식', 20000, '정식', 1, 1),
(116, '돌솥밥', '돌솥밥', 8000, '밥', 1, 0);

-- 완도전복 (ID: 117)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(117, '전복죽', '완도 전복죽', 15000, '죽', 1, 1),
(117, '전복구이', '전복 구이', 25000, '구이', 1, 1),
(117, '전복회', '전복회', 30000, '회', 1, 1);

-- 영광굴비 (ID: 120)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(120, '영광굴비정식', '법성포 굴비', 35000, '정식', 1, 1),
(120, '굴비백반', '굴비 백반', 18000, '백반', 1, 1),
(120, '굴비구이', '굴비구이', 25000, '구이', 1, 0);

-- 보성녹돈 (ID: 124)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(124, '녹돈구이', '보성 녹돈', 16000, '고기', 1, 1),
(124, '녹돈삼겹살', '녹돈 삼겹살', 15000, '고기', 1, 1),
(124, '녹돈목살', '녹돈 목살', 15000, '고기', 1, 1);

-- 고창복분자 (ID: 171)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(171, '복분자정식', '복분자 요리', 20000, '정식', 1, 1),
(171, '복분자한정식', '복분자 한정식', 25000, '정식', 1, 1),
(171, '복분자주', '복분자주', 15000, '주류', 1, 0);

-- 진안한우 (ID: 178)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(178, '진안한우등심', '진안 한우 등심', 45000, '고기', 1, 1),
(178, '진안한우갈비', '진안 한우 갈비', 40000, '고기', 1, 1),
(178, '한우육회', '한우 육회', 30000, '회', 1, 1);

-- 임실치즈 (ID: 180)
INSERT INTO restaurant_menus (restaurant_id, name, description, price, category, available, popular) VALUES
(180, '치즈피자', '임실 치즈 피자', 18000, '피자', 1, 1),
(180, '치즈돈까스', '치즈 돈까스', 12000, '돈까스', 1, 1),
(180, '치즈볼', '치즈볼', 8000, '사이드', 1, 0);
