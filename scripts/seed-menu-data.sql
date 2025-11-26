-- 대표 맛집 10곳의 메뉴 데이터 삽입 (각 5개 메뉴)

-- Restaurant 1: 송정떡갈비 메뉴
INSERT INTO menus (restaurant_id, name, description, price, category, image_url, is_available) VALUES
(1, '떡갈비 정식', '광주 대표 떡갈비를 정갈한 반찬과 함께', 15000, '메인', 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800', 1),
(1, '갈비탕', '사골육수에 푹 고아낸 진한 갈비탕', 12000, '탕/국', 'https://images.unsplash.com/photo-1580397209033-d14ab89c4d3c?w=800', 1),
(1, '된장찌개', '구수한 된장에 두부와 채소를 듬뿍', 8000, '찌개', 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800', 1),
(1, '떡갈비 2인 세트', '떡갈비 2인분 + 갈비탕 + 반찬', 35000, '세트', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800', 1),
(1, '공기밥', '갓 지은 따뜻한 쌀밥', 1000, '사이드', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800', 1);

-- Restaurant 2: 나주곰탕 메뉴
INSERT INTO menus (restaurant_id, name, description, price, category, image_url, is_available) VALUES
(2, '나주곰탕', '24시간 푹 고아낸 진한 사골국물', 10000, '메인', 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800', 1),
(2, '특곰탕', '고기를 더 듬뿍 넣은 특별한 곰탕', 13000, '메인', 'https://images.unsplash.com/photo-1587748966537-0915c76cdee6?w=800', 1),
(2, '수육', '쫄깃하고 부드러운 삶은 고기', 18000, '사이드', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', 1),
(2, '곰탕+수육 세트', '곰탕과 수육을 함께', 25000, '세트', 'https://images.unsplash.com/photo-1596040033229-a0b55b3dbdcd?w=800', 1),
(2, '소주', '참이슬', 4000, '주류', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800', 1);

-- Restaurant 3: 홍어삼합 메뉴
INSERT INTO menus (restaurant_id, name, description, price, category, image_url, is_available) VALUES
(3, '홍어삼합', '홍어 + 삼겹살 + 김치의 황홀한 조화', 45000, '메인', 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800', 1),
(3, '홍어회', '신선한 홍어를 얇게 썬 회', 35000, '메인', 'https://images.unsplash.com/photo-1580397209033-d14ab89c4d3c?w=800', 1),
(3, '삼겹살', '두툼하게 썬 국내산 삼겹살', 15000, '사이드', 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800', 1),
(3, '막걸리', '나주 쌀막걸리', 5000, '주류', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800', 1),
(3, '파전', '바삭한 해물파전', 12000, '사이드', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800', 1);

-- Restaurant 4: 전주비빔밥 메뉴
INSERT INTO menus (restaurant_id, name, description, price, category, image_url, is_available) VALUES
(4, '전주비빔밥', '30가지 나물이 들어간 정통 비빔밥', 11000, '메인', 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800', 1),
(4, '육회비빔밥', '신선한 육회를 올린 비빔밥', 15000, '메인', 'https://images.unsplash.com/photo-1587748966537-0915c76cdee6?w=800', 1),
(4, '콩나물국밥', '얼큰한 콩나물국밥', 8000, '메인', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', 1),
(4, '전주식 떡갈비', '전주 스타일 떡갈비', 13000, '메인', 'https://images.unsplash.com/photo-1596040033229-a0b55b3dbdcd?w=800', 1),
(4, '막걸리', '전주 이강주', 6000, '주류', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800', 1);

-- Restaurant 5: 목포세발낙지 메뉴
INSERT INTO menus (restaurant_id, name, description, price, category, image_url, is_available) VALUES
(5, '세발낙지 볶음', '매콤하게 볶은 싱싱한 세발낙지', 25000, '메인', 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800', 1),
(5, '낙지연포탕', '시원한 낙지 국물 요리', 22000, '메인', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800', 1),
(5, '낙지비빔밥', '낙지를 넣은 매콤한 비빔밥', 12000, '메인', 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=800', 1),
(5, '낙지탕탕이', '살아있는 낙지 숙회', 30000, '메인', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800', 1),
(5, '공기밥', '갓 지은 쌀밥', 1000, '사이드', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800', 1);

-- Restaurant 6: 광주오리탕 메뉴
INSERT INTO menus (restaurant_id, name, description, price, category, image_url, is_available) VALUES
(6, '오리탕', '보양식 오리고기를 푹 끓인 탕', 35000, '메인', 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=800', 1),
(6, '오리주물럭', '양념에 재운 오리고기 구이', 32000, '메인', 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800', 1),
(6, '오리훈제', '담백한 오리 훈제', 28000, '메인', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800', 1),
(6, '오리백숙', '깔끔한 오리백숙', 38000, '메인', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800', 1),
(6, '소주', '참이슬 후레쉬', 4000, '주류', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800', 1);

-- Restaurant 7: 여수돌산갓김치 메뉴
INSERT INTO menus (restaurant_id, name, description, price, category, image_url, is_available) VALUES
(7, '돌산갓김치 정식', '매콤한 갓김치와 반찬', 9000, '메인', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800', 1),
(7, '갓김치찌개', '얼큰한 갓김치찌개', 10000, '찌개', 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=800', 1),
(7, '생선구이 정식', '갓김치와 함께하는 생선구이', 15000, '메인', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800', 1),
(7, '갓김치 포장', '집에서 즐기는 갓김치 1kg', 12000, '포장', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800', 1),
(7, '공기밥', '쌀밥', 1000, '사이드', 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=800', 1);

-- Restaurant 8: 순천만짱뚱어탕 메뉴
INSERT INTO menus (restaurant_id, name, description, price, category, image_url, is_available) VALUES
(8, '짱뚱어탕', '순천만 특산 짱뚱어탕', 18000, '메인', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', 1),
(8, '짱뚱어튀김', '바삭한 짱뚱어 튀김', 15000, '사이드', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', 1),
(8, '장어구이', '통통한 민물장어 구이', 30000, '메인', 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800', 1),
(8, '짱뚱어탕+튀김 세트', '탕과 튀김을 함께', 28000, '세트', 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800', 1),
(8, '소주', '진로', 4000, '주류', 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800', 1);

-- Restaurant 9: 담양떡갈비 메뉴
INSERT INTO menus (restaurant_id, name, description, price, category, image_url, is_available) VALUES
(9, '담양식 떡갈비', '참나무 숯불에 구운 떡갈비', 14000, '메인', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800', 1),
(9, '떡갈비+불고기 세트', '떡갈비와 불고기 2인 세트', 32000, '세트', 'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?w=800', 1),
(9, '갈비찜', '양념이 깊게 밴 갈비찜', 38000, '메인', 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=800', 1),
(9, '된장찌개', '시골된장 찌개', 7000, '찌개', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800', 1),
(9, '공기밥', '현미밥', 1000, '사이드', 'https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=800', 1);

-- Restaurant 10: 광양불고기 메뉴
INSERT INTO menus (restaurant_id, name, description, price, category, image_url, is_available) VALUES
(10, '광양불고기', '참숯에 구운 광양식 불고기', 16000, '메인', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', 1),
(10, '불고기 2인 세트', '불고기 2인분 + 반찬', 35000, '세트', 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800', 1),
(10, '불고기전골', '얼큰한 불고기전골', 40000, '메인', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', 1),
(10, '된장찌개', '구수한 된장찌개', 7000, '찌개', 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800', 1),
(10, '소주', '처음처럼', 4000, '주류', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', 1);
