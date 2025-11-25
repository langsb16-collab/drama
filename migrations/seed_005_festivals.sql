-- 전라도 지역 축제 30곳 데이터

INSERT INTO festivals (region_id, name_ko, name_en, description_ko, start_date, end_date, category, address, website) VALUES
-- 전라남도 축제 (15곳)
(1, '광주세계김치축제', 'Gwangju World Kimchi Festival', '광주 김치문화의 세계화를 위한 대표 축제', '2024-10-18', '2024-10-21', '음식', '광주 김대중컨벤션센터', 'https://kimchifestival.co.kr'),
(1, '광주비엔날레', 'Gwangju Biennale', '세계적인 현대미술 축제', '2024-09-07', '2024-12-01', '문화', '광주 비엔날레전시관', 'https://gwangjubiennale.org'),
(2, '목포항구축제', 'Mokpo Port Festival', '목포 해양문화를 기념하는 축제', '2024-10-01', '2024-10-05', '문화', '목포 북항', 'https://mokpoport.com'),
(3, '여수거북선축제', 'Yeosu Turtle Ship Festival', '이순신 장군의 거북선을 기념', '2024-05-01', '2024-05-05', '역사', '여수 이순신광장', 'https://turtleship.com'),
(3, '여수밤바다축제', 'Yeosu Night Sea Festival', '아름다운 여수 밤바다를 즐기는 축제', '2024-07-15', '2024-08-15', '관광', '여수 해양공원', 'http://festival.yeosu.go.kr'),
(4, '순천만국제정원박람회', 'Suncheon Bay Garden Expo', '세계적인 정원 박람회', '2024-04-01', '2024-10-31', '자연', '순천만국가정원', 'https://scbay.suncheon.go.kr'),
(5, '나주배축제', 'Naju Pear Festival', '나주 배의 우수성을 알리는 축제', '2024-09-20', '2024-09-23', '음식', '나주 배밭', 'http://najupear.com'),
(6, '담양대나무축제', 'Damyang Bamboo Festival', '대나무의 고장 담양을 알리는 축제', '2024-05-01', '2024-05-05', '자연', '담양 죽녹원', 'http://www.damyang.go.kr'),
(7, '광양매화축제', 'Gwangyang Maehwa Festival', '10만 그루 매화나무의 장관', '2024-03-08', '2024-03-17', '자연', '광양 섬진강 매화마을', 'http://www.gwangyang.go.kr'),
(8, '완도장보고축제', 'Wando Jangbogo Festival', '해상왕 장보고를 기념하는 축제', '2024-05-15', '2024-05-19', '역사', '완도 장보고공원', 'http://www.wando.go.kr'),
(9, '진도신비의바닷길축제', 'Jindo Miracle Sea Road Festival', '세계 3대 바닷길 축제', '2024-04-20', '2024-04-23', '자연', '진도 고군면 회동리', 'http://jindo.go.kr'),
(10, '해남땅끝마라톤', 'Haenam Land''s End Marathon', '한반도 땅끝에서 열리는 마라톤', '2024-11-10', '2024-11-10', '스포츠', '해남 땅끝마을', 'http://www.haenammarathon.com'),
(11, '영광불갑산상사화축제', 'Yeongwang Bulg apsan Lycoris Festival', '붉은 상사화의 향연', '2024-09-10', '2024-09-15', '자연', '영광 불갑산', 'http://www.yeongguang.go.kr'),
(15, '보성차밭빛축제', 'Boseong Green Tea Light Festival', '차밭을 빛으로 물들이는 축제', '2024-05-01', '2024-05-31', '관광', '보성 녹차밭', 'http://www.boseong.go.kr'),
(17, '곡성세계장미축제', 'Gokseong World Rose Festival', '100만 송이 장미의 향연', '2024-05-15', '2024-05-31', '자연', '곡성 기차마을', 'http://www.gokseong.go.kr'),

-- 전라북도 축제 (15곳)
(19, '전주국제영화제', 'Jeonju International Film Festival', '대안영화의 메카', '2024-04-25', '2024-05-04', '문화', '전주 한옥마을', 'https://www.jiff.or.kr'),
(19, '전주비빔밥축제', 'Jeonju Bibimbap Festival', '전주 비빔밥의 우수성을 알리는 축제', '2024-10-10', '2024-10-13', '음식', '전주 한옥마을', 'http://www.bibimbapfest.com'),
(19, '전주한지문화축제', 'Jeonju Hanji Culture Festival', '천년의 전통 한지 축제', '2024-05-01', '2024-05-05', '문화', '전주 한지산업지원센터', 'http://hanji.jeonju.go.kr'),
(20, '군산시간여행축제', 'Gunsan Time Travel Festival', '근대문화유산을 체험하는 축제', '2024-10-01', '2024-10-07', '역사', '군산 근대역사문화거리', 'http://www.gunsan.go.kr'),
(21, '익산서동축제', 'Iksan Seodong Festival', '서동과 선화공주의 사랑 이야기', '2024-05-01', '2024-05-05', '역사', '익산 서동공원', 'http://www.iksan.go.kr'),
(22, '정읍사축제', 'Jeongeup song Festival', '정읍사의 전통을 기리는 축제', '2024-10-15', '2024-10-18', '문화', '정읍 내장산', 'http://www.jeongeup.go.kr'),
(23, '남원춘향제', 'Namwon Chunhyang Festival', '춘향전의 고장에서 열리는 축제', '2024-05-01', '2024-05-05', '문화', '남원 광한루원', 'http://www.chunhyang.org'),
(24, '김제지평선축제', 'Gimje Horizon Festival', '드넓은 지평선과 황금 들녘', '2024-10-01', '2024-10-10', '농업', '김제 벽골제', 'http://www.horizonfestival.com'),
(25, '고창모양성제', 'Gochang Moyang Fortress Festival', '유네스코 세계유산 모양성 축제', '2024-10-01', '2024-10-05', '역사', '고창 모양성', 'http://www.gochang.go.kr'),
(25, '고창복분자축제', 'Gochang Bokbunja Festival', '고창 복분자의 우수성을 알리는 축제', '2024-05-15', '2024-05-19', '음식', '고창 복분자체험장', 'http://www.bokbunja.com'),
(26, '완주와일드푸드축제', 'Wanju Wild Food Festival', '자연에서 나는 산나물 축제', '2024-04-20', '2024-04-23', '음식', '완주 삼례문화예술촌', 'http://www.wanju.go.kr'),
(27, '무주반딧불축제', 'Muju Firefly Festival', '반딧불이와 함께하는 생태축제', '2024-06-01', '2024-06-10', '자연', '무주 반딧불공원', 'http://www.firefly.or.kr'),
(28, '진안홍삼축제', 'Jinan Red Ginseng Festival', '진안 홍삼의 우수성을 알리는 축제', '2024-10-15', '2024-10-20', '음식', '진안 홍삼타운', 'http://www.jinan.go.kr'),
(29, '장수한우랑사과랑축제', 'Jangsu Hanwoo & Apple Festival', '장수 한우와 사과의 축제', '2024-10-25', '2024-10-28', '음식', '장수 장수사과공원', 'http://www.jangsu.go.kr'),
(30, '임실치즈축제', 'Imsil Cheese Festival', '임실 치즈의 고장에서 열리는 축제', '2024-10-01', '2024-10-07', '음식', '임실 치즈테마파크', 'http://www.imsil.go.kr');
