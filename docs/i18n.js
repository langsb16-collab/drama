// i18n.js - 다국어 번역 데이터
const translations = {
  ko: {
    // Header
    siteTitle: '전라도 미식',
    siteTitleLine2: '슈퍼로드',
    siteSubtitle: 'Jeonlado Local Food Superroad',
    
    // Hero Section
    heroTitle: '전라도의 맛과 여행을 한 곳에',
    heroDescription: '지역 맛집·축제·촬영지·여행사·근처 농협, 지역민 중고거래, 무료 배달앱 전라도 생활지도의 새로운 기준',
    
    // Navigation Tabs
    tabRestaurants: '맛집, 무료배달',
    tabTravel: '여행사',
    tabFestivals: '축제',
    tabMarketplace: '사고팔고',
    tabCommunity: '우리동네 살리기',
    
    // Community Sub-menus
    communityBenefits: '우리동네 혜택',
    communityMarket: '사고팔고',
    
    // Stats
    statRestaurants: '전라도 맛집',
    statFestivals: '지역 축제',
    statAgencies: '맞춤 여행사',
    statAccommodation: '숙박업소',
    
    // Restaurants Section
    restaurantsTitle: '전라도 맛집 200곳',
    restaurantsDescription: '전라남도와 전라북도의 엄선된 맛집을 만나보세요',
    filterAll: '전체',
    filterJeonnam: '전라남도',
    filterJeonbuk: '전라북도',
    loadingText: '맛집 정보를 불러오는 중...',
    loadMore: '더 보기',
    
    // Travel Section
    travelTitle: '맞춤형 소형 여행사 32곳',
    travelDescription: '특별한 경험을 제공하는 전문 여행사를 만나보세요',
    
    // Festivals Section
    festivalTitle: '전라도 지역 축제',
    festivalDesc: '전라도 지역의 다채로운 축제와 문화 행사 정보',
    festivalMainTitle: '전라도 주요 축제',
    festivalNationalTitle: '전국 주요 축제 (문화관광축제 선정)',
    festivalSeoulTitle: '서울·수도권 축제',
    festivalOtherTitle: '기타 지역 축제',
    festivalNotice: '축제 정보는 2024년 기준입니다. 최신 일정과 참가 방법은 각 지자체 및 축제 공식 홈페이지를 확인해주세요.',
    
    // Festival Categories
    festCatFilm: '국제영화제',
    festCatWater: '물/해양',
    festCatPort: '항구/해양',
    festCatMusic: '전통음악',
    festCatCulture: '문화체험',
    festCatFood: '음식축제',
    festCatFolk: '전통민속',
    festCatHistory: '역사문화',
    festCatWinter: '겨울체험',
    festCatCraft: '공예/전통',
    festCatPerform: '전통공연',
    festCatMusicFest: '음악축제',
    festCatFireworks: '불꽃/공연',
    festCatFilmFood: '영화+맛집',
    festCatHeritage: '문화유산',
    festCatClassical: '클래식음악',
    
    // CTA Section
    ctaTitle: '배달 수수료 0원!',
    ctaDescription: '사장님 부담 없는 배달, 지금 무료로 입점하세요',
    ctaFee: '수수료 0원',
    ctaFeeDesc: '100% 매출 보장',
    ctaFast: '빠른 심사',
    ctaFastDesc: '2-3일 내 심사 완료',
    ctaSupport: '전담 지원',
    ctaSupportDesc: '1:1 맞춤 운영',
    ctaButton: '가맹점 문의하기',
    
    // Footer
    footerLinks: '바로가기',
    footerContact: '문의',
    footerRights: '전라도 로컬 미식 슈퍼로드. All rights reserved.',
    
    // Community Benefits Page
    benefitsTitle: '우리동네 혜택',
    benefitsDescription: '전국 지방자치단체 지원정책 안내',
    
    // Marketplace Page
    marketplaceTitle: '사고팔고',
    marketplaceDescription: '우리 동네 중고거래 플랫폼',
    
    // Footer
    footerTitle: '전라도 미식 슈퍼로드',
    footerDesc: '전라도의 모든 맛과 여행을 한 곳에서 만나보세요',
    footerQuickLinks: '바로가기',
    footerRestaurants: '맛집',
    footerFestivals: '축제',
    footerContact: '가맹점 문의',
    footerContactTitle: '문의',
    footerCopyright: '© 2024 전라도 미식 슈퍼로드. All rights reserved.',
    
    // Auth
    login: '로그인',
    register: '회원가입',
    logout: '로그아웃',
    email: '이메일',
    password: '비밀번호',
    name: '이름',
    loginDescription: '전라도 로컬 미식 슈퍼로드에 오신 것을 환영합니다',
    registerDescription: '새로운 계정을 만들어보세요',
    noAccount: '계정이 없으신가요?',
    hasAccount: '이미 계정이 있으신가요?',
    adminHint: '관리자 테스트:',
    
    // Order System
    orderTitle: '주문·예약',
    orderMenu: '주문 음식',
    orderQuantity: '수량',
    orderAllergy: '알레르기 정보 (선택사항)',
    orderAllergyPlaceholder: '알레르기가 있으시면 입력해주세요 (예: 새우, 땅콩 알레르기)',
    orderOptions: '옵션',
    orderSpicy: '맵기 조절',
    orderSpicyMild: '순한맛',
    orderSpicyHot: '매운맛 🌶️',
    orderExtra: '곱빼기',
    orderTopping: '토핑 추가',
    orderSoup: '국물 추가',
    orderBasePrice: '기본 가격',
    orderOptionPrice: '추가 옵션',
    orderDeliveryFee: '배달비 (예상)',
    orderTotal: '예상 총 금액',
    orderCookTime: '조리 시간:',
    orderDeliveryTime: '배달 가능 시간:',
    orderStatus: '영업 중',
    orderSubmit: '주문하기',
    orderCancel: '취소',
    orderSelectMenu: '메뉴를 선택해주세요',
  },
  
  en: {
    // Header
    siteTitle: 'Jeonlado Gourmet',
    siteTitleLine2: 'Superroad',
    siteSubtitle: 'Discover Authentic Korean Cuisine & Culture',
    
    // Hero Section
    heroTitle: 'Taste and Travel of Jeonlado in One Place',
    heroDescription: 'Local restaurants, festivals, filming locations, travel agencies, nearby agricultural cooperatives, local marketplace, free delivery app - A new standard for Jeonlado living map',
    
    // Navigation Tabs
    tabRestaurants: 'Restaurants, Free Delivery',
    tabTravel: 'Travel',
    tabFestivals: 'Festivals',
    tabMarketplace: 'Marketplace',
    tabCommunity: 'Community Support',
    
    // Community Sub-menus
    communityBenefits: 'Local Benefits',
    communityMarket: 'Marketplace',
    
    // Stats
    statRestaurants: 'Local Restaurants',
    statFestivals: 'Regional Festivals',
    statAgencies: 'Travel Agencies',
    statAccommodation: 'Accommodations',
    
    // Restaurants Section
    restaurantsTitle: '200 Restaurants in Jeonlado',
    restaurantsDescription: 'Discover carefully selected restaurants in Jeollanam-do and Jeollabuk-do',
    filterAll: 'All',
    filterJeonnam: 'Jeollanam-do',
    filterJeonbuk: 'Jeollabuk-do',
    loadingText: 'Loading restaurant information...',
    loadMore: 'Load More',
    
    // Travel Section
    travelTitle: '32 Specialized Travel Agencies',
    travelDescription: 'Meet professional travel agencies offering unique experiences',
    
    // Festivals Section
    festivalTitle: 'Jeolla Region Festivals',
    festivalDesc: 'Diverse festivals and cultural events in the Jeolla region',
    festivalMainTitle: 'Major Jeolla Festivals',
    festivalNationalTitle: 'Major National Festivals (Cultural Tourism Festivals)',
    festivalSeoulTitle: 'Seoul & Metropolitan Area Festivals',
    festivalOtherTitle: 'Other Regional Festivals',
    festivalNotice: 'Festival information is based on 2024. Please check official websites for latest schedules and participation details.',
    
    // Festival Categories
    festCatFilm: 'Int\'l Film Festival',
    festCatWater: 'Water/Marine',
    festCatPort: 'Port/Marine',
    festCatMusic: 'Traditional Music',
    festCatCulture: 'Cultural Experience',
    festCatFood: 'Food Festival',
    festCatFolk: 'Traditional Folk',
    festCatHistory: 'Historical Culture',
    festCatWinter: 'Winter Experience',
    festCatCraft: 'Craft/Traditional',
    festCatPerform: 'Traditional Performance',
    festCatMusicFest: 'Music Festival',
    festCatFireworks: 'Fireworks/Performance',
    festCatFilmFood: 'Film+Food',
    festCatHeritage: 'Cultural Heritage',
    festCatClassical: 'Classical Music',
    
    // CTA Section
    ctaTitle: 'Zero Delivery Fee!',
    ctaDescription: 'Join us now with no burden on restaurant owners',
    ctaFee: 'Zero Fee',
    ctaFeeDesc: '100% Revenue Guarantee',
    ctaFast: 'Fast Review',
    ctaFastDesc: 'Approved in 2-3 days',
    ctaSupport: 'Dedicated Support',
    ctaSupportDesc: '1:1 Customized Service',
    ctaButton: 'Contact Us',
    
    // Footer
    footerTitle: 'Jeonlado Gourmet Superroad',
    footerDesc: 'Discover all the flavors and travel of Jeolla in one place',
    footerQuickLinks: 'Quick Links',
    footerRestaurants: 'Restaurants',
    footerFestivals: 'Festivals',
    footerContact: 'Contact',
    footerContactTitle: 'Contact',
    footerCopyright: '© 2024 Jeonlado Gourmet Superroad. All rights reserved.',
    
    // Community Benefits Page
    benefitsTitle: 'Local Benefits',
    benefitsDescription: 'Local Government Support Programs',
    
    // Marketplace Page
    marketplaceTitle: 'Marketplace',
    marketplaceDescription: 'Local Second-hand Trading Platform',
    
    // Auth
    login: 'Login',
    register: 'Sign Up',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    loginDescription: 'Welcome to Jeonlado Local Food Superroad',
    registerDescription: 'Create your new account',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    adminHint: 'Admin Test:',
    
    // Order System
    orderTitle: 'Order · Reservation',
    orderMenu: 'Select Menu',
    orderQuantity: 'Quantity',
    orderAllergy: 'Allergy Information (Optional)',
    orderAllergyPlaceholder: 'Please enter any allergies (e.g., shrimp, peanuts)',
    orderOptions: 'Options',
    orderSpicy: 'Spice Level',
    orderSpicyMild: 'Mild',
    orderSpicyHot: 'Spicy 🌶️',
    orderExtra: 'Extra Portion',
    orderTopping: 'Add Toppings',
    orderSoup: 'Extra Soup',
    orderBasePrice: 'Base Price',
    orderOptionPrice: 'Additional Options',
    orderDeliveryFee: 'Delivery Fee (Est.)',
    orderTotal: 'Estimated Total',
    orderCookTime: 'Cooking Time:',
    orderDeliveryTime: 'Delivery Hours:',
    orderStatus: 'Open Now',
    orderSubmit: 'Place Order',
    orderCancel: 'Cancel',
    orderSelectMenu: 'Please select a menu',
  },
  
  zh: {
    // Header
    siteTitle: '全罗道美食',
    siteTitleLine2: '超级公路',
    siteSubtitle: '探索韩国地道美食与文化',
    
    // Hero Section
    heroTitle: '全罗道的美食与旅行集于一处',
    heroDescription: '当地餐厅、节日、拍摄地、旅行社、附近农协、当地二手交易、免费配送应用 - 全罗道生活地图的新标准',
    
    // Navigation Tabs
    tabRestaurants: '餐厅, 免费配送',
    tabTravel: '旅行社',
    tabFestivals: '节日',
    tabMarketplace: '二手交易',
    tabCommunity: '社区支持',
    
    // Community Sub-menus
    communityBenefits: '地方福利',
    communityMarket: '二手交易',
    
    // Stats
    statRestaurants: '本地餐厅',
    statFestivals: '地区节日',
    statAgencies: '旅行社',
    statAccommodation: '住宿',
    
    // Restaurants Section
    restaurantsTitle: '全罗道200家餐厅',
    restaurantsDescription: '探索全罗南道和全罗北道的精选餐厅',
    filterAll: '全部',
    filterJeonnam: '全罗南道',
    filterJeonbuk: '全罗北道',
    loadingText: '正在加载餐厅信息...',
    loadMore: '查看更多',
    
    // Travel Section
    travelTitle: '32家专业旅行社',
    travelDescription: '提供独特体验的专业旅行社',
    
    // Festivals Section
    festivalTitle: '全罗道地区庆典',
    festivalDesc: '全罗道地区丰富多彩的庆典和文化活动信息',
    festivalMainTitle: '全罗道主要庆典',
    festivalNationalTitle: '全国主要庆典 (文化旅游庆典)',
    festivalSeoulTitle: '首尔·首都圈庆典',
    festivalOtherTitle: '其他地区庆典',
    festivalNotice: '庆典信息以2024年为准。最新日程和参与方法请查看各地方政府及庆典官方网站。',
    
    // Festival Categories
    festCatFilm: '国际电影节',
    festCatWater: '水/海洋',
    festCatPort: '港口/海洋',
    festCatMusic: '传统音乐',
    festCatCulture: '文化体验',
    festCatFood: '美食节',
    festCatFolk: '传统民俗',
    festCatHistory: '历史文化',
    festCatWinter: '冬季体验',
    festCatCraft: '工艺/传统',
    festCatPerform: '传统表演',
    festCatMusicFest: '音乐节',
    festCatFireworks: '烟火/表演',
    festCatFilmFood: '电影+美食',
    festCatHeritage: '文化遗产',
    festCatClassical: '古典音乐',
    
    // CTA Section
    ctaTitle: '配送费零元！',
    ctaDescription: '现在免费入驻，无负担',
    ctaFee: '零手续费',
    ctaFeeDesc: '100%销售额保证',
    ctaFast: '快速审核',
    ctaFastDesc: '2-3天内审核完成',
    ctaSupport: '专属支持',
    ctaSupportDesc: '1对1定制服务',
    ctaButton: '联系我们',
    
    // Footer
    footerTitle: '全罗道美食超级公路',
    footerDesc: '在一处探索全罗道所有美食与旅行',
    footerQuickLinks: '快速链接',
    footerRestaurants: '餐厅',
    footerFestivals: '庆典',
    footerContact: '商家咨询',
    footerContactTitle: '联系方式',
    footerCopyright: '© 2024 全罗道美食超级公路。保留所有权利。',
    
    // Community Benefits Page
    benefitsTitle: '地方福利',
    benefitsDescription: '地方政府支持政策',
    
    // Marketplace Page
    marketplaceTitle: '二手交易',
    marketplaceDescription: '本地二手交易平台',
    
    // Auth
    login: '登录',
    register: '注册',
    logout: '退出登录',
    email: '电子邮箱',
    password: '密码',
    name: '姓名',
    loginDescription: '欢迎来到全罗道本地美食超级公路',
    registerDescription: '创建您的新账户',
    noAccount: '还没有账户？',
    hasAccount: '已有账户？',
    adminHint: '管理员测试：',
    
    // Order System
    orderTitle: '订单·预订',
    orderMenu: '选择菜单',
    orderQuantity: '数量',
    orderAllergy: '过敏信息（可选）',
    orderAllergyPlaceholder: '如有过敏请输入（例：虾、花生过敏）',
    orderOptions: '选项',
    orderSpicy: '辣度调节',
    orderSpicyMild: '微辣',
    orderSpicyHot: '辣 🌶️',
    orderExtra: '加大份',
    orderTopping: '加配料',
    orderSoup: '加汤',
    orderBasePrice: '基础价格',
    orderOptionPrice: '附加选项',
    orderDeliveryFee: '配送费（预估）',
    orderTotal: '预估总价',
    orderCookTime: '烹饪时间：',
    orderDeliveryTime: '配送时间：',
    orderStatus: '营业中',
    orderSubmit: '下单',
    orderCancel: '取消',
    orderSelectMenu: '请选择菜单',
  },
  
  ja: {
    // Header
    siteTitle: '全羅道グルメ',
    siteTitleLine2: 'スーパーロード',
    siteSubtitle: '本場の韓国料理と文化を発見',
    
    // Hero Section
    heroTitle: '全羅道の味と旅を一か所で',
    heroDescription: '地域レストラン、祭り、撮影地、旅行会社、近くの農協、地域住民中古取引、無料配送アプリ - 全羅道生活地図の新しい基準',
    
    // Navigation Tabs
    tabRestaurants: 'レストラン, 無料配送',
    tabTravel: '旅行会社',
    tabFestivals: '祭り',
    tabMarketplace: '中古取引',
    tabCommunity: 'コミュニティ支援',
    
    // Community Sub-menus
    communityBenefits: '地域特典',
    communityMarket: '中古取引',
    
    // Stats
    statRestaurants: '地元レストラン',
    statFestivals: '地域祭り',
    statAgencies: '旅行会社',
    statAccommodation: '宿泊施設',
    
    // Restaurants Section
    restaurantsTitle: '全羅道のレストラン200軒',
    restaurantsDescription: '全羅南道と全羅北道の厳選されたレストランを発見',
    filterAll: 'すべて',
    filterJeonnam: '全羅南道',
    filterJeonbuk: '全羅北道',
    loadingText: 'レストラン情報を読み込み中...',
    loadMore: 'もっと見る',
    
    // Travel Section
    travelTitle: '専門旅行会社32社',
    travelDescription: '特別な体験を提供する専門旅行会社',
    
    // Festivals Section
    festivalTitle: '全羅道地域の祭り',
    festivalDesc: '全羅道地域の多彩な祭りと文化イベント情報',
    festivalMainTitle: '全羅道主要祭り',
    festivalNationalTitle: '全国主要祭り (文化観光祭り)',
    festivalSeoulTitle: 'ソウル・首都圏の祭り',
    festivalOtherTitle: 'その他の地域祭り',
    festivalNotice: '祭り情報は2024年基準です。最新スケジュールと参加方法は各自治体と祭り公式ホームページをご確認ください。',
    
    // Festival Categories
    festCatFilm: '国際映画祭',
    festCatWater: '水/海洋',
    festCatPort: '港/海洋',
    festCatMusic: '伝統音楽',
    festCatCulture: '文化体験',
    festCatFood: '食の祭り',
    festCatFolk: '伝統民俗',
    festCatHistory: '歴史文化',
    festCatWinter: '冬の体験',
    festCatCraft: '工芸/伝統',
    festCatPerform: '伝統公演',
    festCatMusicFest: '音楽祭',
    festCatFireworks: '花火/公演',
    festCatFilmFood: '映画+グルメ',
    festCatHeritage: '文化遺産',
    festCatClassical: 'クラシック音楽',
    
    // CTA Section
    ctaTitle: '配送料無料！',
    ctaDescription: '今すぐ無料で出店、負担なし',
    ctaFee: '手数料ゼロ',
    ctaFeeDesc: '100%売上保証',
    ctaFast: '迅速審査',
    ctaFastDesc: '2-3日以内に審査完了',
    ctaSupport: '専属サポート',
    ctaSupportDesc: '1対1カスタマイズサービス',
    ctaButton: 'お問い合わせ',
    
    // Footer
    footerTitle: '全羅道グルメスーパーロード',
    footerDesc: '全羅道のすべての味と旅を一箇所で',
    footerQuickLinks: 'クイックリンク',
    footerRestaurants: 'レストラン',
    footerFestivals: '祭り',
    footerContact: '加盟店お問い合わせ',
    footerContactTitle: 'お問い合わせ',
    footerCopyright: '© 2024 全羅道グルメスーパーロード。全著作権所有。',
    
    // Community Benefits Page
    benefitsTitle: '地域特典',
    benefitsDescription: '地方自治体支援政策',
    
    // Marketplace Page
    marketplaceTitle: '中古取引',
    marketplaceDescription: '地域中古取引プラットフォーム',
    
    // Auth
    login: 'ログイン',
    register: '新規登録',
    logout: 'ログアウト',
    email: 'メールアドレス',
    password: 'パスワード',
    name: '名前',
    loginDescription: '全羅道ローカルグルメスーパーロードへようこそ',
    registerDescription: '新しいアカウントを作成',
    noAccount: 'アカウントをお持ちでないですか？',
    hasAccount: 'すでにアカウントをお持ちですか？',
    adminHint: '管理者テスト：',
    
    // Order System
    orderTitle: '注文·予約',
    orderMenu: 'メニュー選択',
    orderQuantity: '数量',
    orderAllergy: 'アレルギー情報（任意）',
    orderAllergyPlaceholder: 'アレルギーがある場合は入力してください（例：エビ、ピーナッツ）',
    orderOptions: 'オプション',
    orderSpicy: '辛さ調節',
    orderSpicyMild: 'マイルド',
    orderSpicyHot: '辛い 🌶️',
    orderExtra: '大盛り',
    orderTopping: 'トッピング追加',
    orderSoup: 'スープ追加',
    orderBasePrice: '基本価格',
    orderOptionPrice: '追加オプション',
    orderDeliveryFee: '配送料（予想）',
    orderTotal: '予想合計金額',
    orderCookTime: '調理時間：',
    orderDeliveryTime: '配送可能時間：',
    orderStatus: '営業中',
    orderSubmit: '注文する',
    orderCancel: 'キャンセル',
    orderSelectMenu: 'メニューを選択してください',
  }
};

// 현재 언어 설정 (기본값: 한국어)
let currentLanguage = localStorage.getItem('language') || 'ko';
window.currentLanguage = currentLanguage; // Make it globally accessible

// 언어 변경 함수
function changeLanguage(lang) {
  currentLanguage = lang;
  window.currentLanguage = lang; // Update global variable
  localStorage.setItem('language', lang);
  updatePageLanguage();
  
  // 버튼 활성화 상태 업데이트 - 각 언어별 고유 색상
  const btnKo = document.querySelector('[data-lang="ko"]');
  const btnEn = document.querySelector('[data-lang="en"]');
  const btnZh = document.querySelector('[data-lang="zh"]');
  const btnJa = document.querySelector('[data-lang="ja"]');
  
  // Reset all buttons to inactive state (opacity reduced)
  if (btnKo) btnKo.className = 'lang-btn px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold transition shadow-md hover:shadow-lg hidden md:block opacity-50';
  if (btnEn) btnEn.className = 'lang-btn px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold transition shadow-md hover:shadow-lg hidden md:block opacity-50';
  if (btnZh) btnZh.className = 'lang-btn px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold transition shadow-md hover:shadow-lg hidden md:block opacity-50';
  if (btnJa) btnJa.className = 'lang-btn px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold transition shadow-md hover:shadow-lg hidden md:block opacity-50';
  
  // Set active button (full opacity)
  const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
  if (activeBtn) {
    if (lang === 'ko') {
      activeBtn.className = 'lang-btn px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold transition shadow-md hover:shadow-lg hidden md:block';
    } else if (lang === 'en') {
      activeBtn.className = 'lang-btn px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold transition shadow-md hover:shadow-lg hidden md:block';
    } else if (lang === 'zh') {
      activeBtn.className = 'lang-btn px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold transition shadow-md hover:shadow-lg hidden md:block';
    } else if (lang === 'ja') {
      activeBtn.className = 'lang-btn px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold transition shadow-md hover:shadow-lg hidden md:block';
    }
  }
}

// 페이지 언어 업데이트
function updatePageLanguage() {
  const t = translations[currentLanguage];
  
  // 각 텍스트 요소 업데이트
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (t[key]) {
      element.textContent = t[key];
    }
  });
}

// 페이지 로드 시 언어 초기화
document.addEventListener('DOMContentLoaded', () => {
  updatePageLanguage();
  
  // 활성 언어 버튼 표시 - 초기 로드 시에도 각 언어별 색상 적용
  changeLanguage(currentLanguage);
});
