// Chatbot Q&A Database
const chatbotQA = {
  ko: [
    { q: 'JT365가 뭐예요?', a: 'JT365는 "전라도 로컬 미식 + 여행 + 지역 커뮤니티 + 거래" 정보를 한데 모은 플랫폼입니다. 맛집, 축제, 여행, 숙박, 중고거래, 지역 정책 정보 등을 제공합니다.' },
    { q: '어떤 종류의 정보가 있어요?', a: '맛집 정보, 지역 축제, 숙박업소, 여행사, 지역 특화 여행/관광지, 중고거래 매물, 지역 정책/혜택 정보 등을 볼 수 있어요' },
    { q: '중고거래는 어떻게 되나요?', a: '"사고팔고" 섹션을 통해 지역 기반 중고거래가 가능합니다. 에스크로 결제, QR 직거래 인증, GPS 기반 동네 인증, 1:1 채팅, 후기 시스템 등이 적용돼요.' },
    { q: '에스크로 결제 방식은 어떤 건가요?', a: '구매자가 결제하면 금액은 먼저 에스크로로 보관되고, 구매확정 후 판매자에게 송금됩니다. 미수령 또는 문제 발생 시 환불 처리도 가능합니다.' },
    { q: '직거래 인증은 어떻게 하나요?', a: '상품 단위로 생성된 QR을 구매자가 스캔하면 "직거래 완료" 인증이 가능해요. 판매자 단말기 없이도 모바일만으로 구현됩니다.' },
    { q: '이용 가능한 상품 카테고리는 뭐가 있나요?', a: '생활가전, 가구/인테리어, 반려동물용품, 농산물/직거래, 공구/DIY, 의류/잡화, 도서/교육, 기타 — 다양한 카테고리를 지원합니다.' },
    { q: '회원가입 & 로그인은 어떻게 해요?', a: '홈페이지 상단의 "회원가입" 또는 "로그인" 버튼을 클릭하여, 이메일과 비밀번호로 계정을 만들거나 로그인할 수 있습니다.' },
    { q: '맛집/여행 정보는 어디서 찾나요?', a: '메인 메뉴에서 "맛집", "축제", "숙박", "여행사" 항목을 선택하면, 해당 지역의 맛집, 숙소, 맞춤여행사 정보를 볼 수 있어요.' },
    { q: '회원으로서 무엇이 가능한가요?', a: '회원 가입 후, 중고거래 참여, 후기 작성, 관심 지역/가게 저장, 여행사 문의, 게시물 조회 등이 가능합니다.' },
    { q: '지역 정책/지원 정보도 있나요?', a: '네 — "우리동네 혜택" 섹션에서는 빈집 임대·리모델링, 로컬크리에이터 지원, 워케이션, 지방소멸 대응 사업 등 지역 정책 및 지원 정보를 안내합니다.' },
    { q: '어떤 지역을 다루나요?', a: '주로 "전라도(전라남도, 전라북도)" 중심이지만, 여행사 정보는 전국(서울, 부산, 제주, 강원 등)까지 포함된 경우가 있습니다.' },
    { q: '여행사 등록 또는 가맹 문의는 어떻게 하나요?', a: '홈페이지 내 "가맹점 문의하기" 또는 여행사 섹션 내 문의 양식을 통해 신청할 수 있어요.' },
    { q: '회원간 후기나 평점 시스템이 있나요?', a: '네 — 거래가 성사된 사용자만 후기를 남길 수 있으며, 후기 작성 유도를 위한 자동 알림 기능이 포함됩니다.' },
    { q: '플랫폼의 목표는 뭐예요?', a: '지역 미식과 여행 정보를 통합하고, 지역 주민·소상공인·여행사·커뮤니티를 연결해 "우리동네 활성화"를 돕는 것이 목표입니다.' }
  ],
  en: [
    { q: 'What is JT365?', a: 'JT365 is a platform that brings together information about Jeolla local cuisine, travel, community, and marketplace services. It provides restaurant guides, festivals, travel, lodging, secondhand trading, and local policy information.' },
    { q: 'What kind of information does it offer?', a: 'You can find restaurant information, local festivals, accommodations, travel agencies, regional tourist attractions, secondhand marketplace listings, and community policy/benefit information.' },
    { q: 'How does the secondhand marketplace work?', a: 'You can buy and sell locally through the "Buy & Sell" section. It includes escrow payment, QR-based face-to-face trade verification, GPS neighborhood authentication, 1:1 chat, and a review system.' },
    { q: 'How does the escrow payment system work?', a: 'When the buyer makes a payment, the amount is held in escrow first. After the purchase is confirmed, the money is transferred to the seller. If the item isn\'t received or a problem occurs, a refund is possible.' },
    { q: 'How do I verify a face-to-face transaction?', a: 'A QR code generated per product can be scanned by the buyer to verify a successful direct transaction. It works entirely on mobile—no seller terminal device required.' },
    { q: 'What product categories are available?', a: 'We support various categories: home appliances, furniture/interior, pet supplies, farm produce/local direct trade, tools/DIY, clothing/accessories, books/education, and more.' },
    { q: 'How do I sign up or log in?', a: 'Click the "Sign Up" or "Log In" button at the top of the website to create an account or log in using your email and password.' },
    { q: 'Where can I find restaurant or travel information?', a: 'Select "Restaurants", "Festivals", "Lodging", or "Travel Agencies" from the main menu to browse local restaurant lists, accommodations, and custom travel agency recommendations.' },
    { q: 'What can I do as a member?', a: 'After signing up, you can participate in secondhand trading, leave reviews, save favorite regions or stores, contact travel agencies, and view community posts.' },
    { q: 'Do you provide local policy information?', a: 'Yes — the "Local Benefits" section offers information on vacant house rental/remodeling programs, local creator support, workation programs, and regional revitalization initiatives.' },
    { q: 'Which regions are covered?', a: 'The main focus is Jeollanam-do and Jeollabuk-do (the Jeolla region), but some travel agency information includes nationwide areas such as Seoul, Busan, Jeju, and Gangwon.' },
    { q: 'How do I apply for a travel agency listing?', a: 'You can apply through the "Partner Inquiry" page on the website or by submitting the inquiry form in the travel agency section.' },
    { q: 'Is there a review or rating system?', a: 'Yes — only users who have completed a transaction can leave a review. Automatic reminders are also sent to encourage review submission.' },
    { q: 'What is the goal of the platform?', a: 'The goal is to integrate local food and travel information, connect residents, small businesses, travel agencies, and communities, and ultimately help revitalize the local region.' }
  ],
  zh: [
    { q: 'JT365 是什么？', a: 'JT365 是一个整合"全罗道当地美食 + 旅行 + 地区社区 + 二手交易"信息的平台。提供餐厅推荐、地方庆典、旅行、住宿、二手交易以及地方政策等内容。' },
    { q: '提供哪些类型的信息？', a: '您可以查看餐厅信息、地方庆典、住宿、旅行社、特色旅游景点、二手商品信息、地区政策与优惠资讯。' },
    { q: '二手交易怎么进行？在哪里使用？', a: '可以通过"买卖区（사고팔고）"进行基于地区的二手交易。\n支持托管支付、二维码当面交易认证、GPS 区域认证、1对1 聊天、交易评价系统等功能。' },
    { q: '托管支付是怎么运作的？', a: '买家付款后，金额会先存放在托管账户中；确认收货后再打款给卖家。如果未收到商品或发生问题，也可以申请退款。' },
    { q: '如何进行当面交易认证？', a: '商品会生成专属二维码，买家扫描后即可完成"当面交易认证"。整个过程只需手机，不需要卖家专用设备。' },
    { q: '有哪些可交易的商品类别？', a: '支持多种分类：家电、家具/室内装饰、宠物用品、农产品/直购、工具/DIY、服饰/配饰、图书/教育等。' },
    { q: '如何注册或登录？', a: '点击网站顶部的"注册"或"登录"按钮，通过邮箱与密码即可完成注册或登录。' },
    { q: '在哪里可以找到美食/旅行信息？', a: '在主菜单选择"美食（맛집）"、"庆典（축제）"、"住宿（숙박）"、"旅行社（여행사）"即可查看相关地区的餐厅、住宿与旅行社信息。' },
    { q: '成为会员后可以做什么？', a: '注册后可以参与二手交易、撰写评价、收藏喜欢的地区/商家、咨询旅行社、浏览帖子等。' },
    { q: '也提供地方政策或支援信息吗？', a: '是的，在"我们社区福利（우리동네 혜택）"中可查看空房租赁/改造、地方创作者支援、Workation、地区活化项目等政策信息。' },
    { q: '平台主要涵盖哪些地区？', a: '主要以"全罗道（全罗南道、全罗北道）"为核心，但旅行社相关信息也包含首尔、釜山、济州、江原等全国地区。' },
    { q: '如何申请旅行社入驻或合作？', a: '可通过网站的"商家入驻申请"或旅行社页面中的申请表进行提交。' },
    { q: '会员之间有评价系统吗？', a: '是的，只有完成交易的用户才能留下评价，并且系统会自动发送评价提醒。' },
    { q: '平台的目标是什么？', a: '目标是整合地方美食与旅游信息，连接居民、小商家、旅行社与社区，共同促进"我们的地方活力提升"。' }
  ],
  ja: [
    { q: 'JT365とは何ですか？', a: 'JT365は、"全羅道のローカルグルメ＋旅行＋地域コミュニティ＋取引"の情報をまとめて提供するプラットフォームです。飲食店、祭り、旅行、宿泊、フリマ取引、地域政策などの情報を閲覧できます。' },
    { q: 'どんな種類の情報がありますか？', a: '飲食店情報、地域の祭り、宿泊施設、旅行会社、地域特化の観光地、フリマ商品、地域の政策・支援情報などを見ることができます。' },
    { q: 'フリマ取引はどうやって行いますか？どこで利用できますか？', a: '『売ります・買います』セクションで地域ベースのフリマ取引ができます。\nエスクロー決済、QRによる対面取引認証、GPSによるエリア認証、1対1チャット、レビューシステムなどが利用可能です。' },
    { q: 'エスクロー決済はどのような仕組みですか？', a: '購入者が支払うと、金額はまずエスクローに保管されます。受取確認後に販売者へ送金されます。未受取やトラブル発生時には返金対応も可能です。' },
    { q: '対面取引の認証はどのように行いますか？', a: '商品ごとに生成されるQRコードを購入者がスキャンすると、『対面取引完了』の認証が可能です。販売者の専用端末は不要で、スマホだけで利用できます。' },
    { q: '利用できる商品カテゴリーは何がありますか？', a: '生活家電、家具・インテリア、ペット用品、農産物・直売、工具・DIY、衣類・雑貨、書籍・教育など、多様なカテゴリーに対応しています。' },
    { q: '会員登録やログインはどうすればいいですか？', a: 'ホームページ上部の『会員登録』または『ログイン』ボタンをクリックし、メールアドレスとパスワードで登録・ログインできます。' },
    { q: 'グルメ／旅行情報はどこで探せますか？', a: 'メインメニューの『グルメ』『祭り』『宿泊』『旅行会社』を選ぶと、地域の飲食店、宿泊先、旅行会社の情報を見ることができます。' },
    { q: '会員になると何ができますか？', a: '会員登録後、フリマ取引への参加、レビュー投稿、気になる地域や店舗の保存、旅行会社への問い合わせ、投稿閲覧などが可能です。' },
    { q: '地域政策や支援情報もありますか？', a: 'はい。『わたしの地域特典（우리동네 혜택）』では、空き家賃貸・リモデリング、ローカルクリエイター支援、ワーケーション、地域活性化事業などの政策や支援情報を案内しています。' },
    { q: 'どの地域を対象にしていますか？', a: '主に"全羅道（全羅南道・全羅北道）"が中心ですが、旅行会社の情報はソウル、釜山、済州、江原など全国を含む場合があります。' },
    { q: '旅行会社の登録や加盟申請はどうすればよいですか？', a: 'ホームページ内の『加盟店申請』または旅行会社ページの申請フォームから申し込みできます。' },
    { q: 'ユーザー間のレビューや評価システムはありますか？', a: 'はい。取引が成立したユーザーのみレビューを残せます。また、レビュー投稿を促す自動通知機能もあります。' },
    { q: 'プラットフォームの目的は何ですか？', a: '地域のグルメや旅行情報を統合し、住民・小規模事業者・旅行会社・コミュニティをつなぎ、"地域活性化"をサポートすることが目的です。' }
  ]
};

// Chatbot state (no need to declare currentLanguage - use window.currentLanguage from i18n.js)
let chatbotOpen = false;
let currentView = 'list'; // 'list' or 'answer'

// Toggle chatbot window
function toggleChatbot() {
  console.log('✅ toggleChatbot called');
  chatbotOpen = !chatbotOpen;
  const chatWindow = document.getElementById('chatbot-window');
  const bubble = document.getElementById('chatbot-bubble');
  
  console.log('📌 chatbotOpen:', chatbotOpen);
  console.log('📌 chatWindow:', chatWindow);
  console.log('📌 bubble:', bubble);
  
  if (chatbotOpen) {
    if (chatWindow) chatWindow.classList.remove('hidden');
    if (bubble) {
      bubble.style.opacity = '0';
      bubble.style.pointerEvents = 'none';
    }
    showQuestionList();
  } else {
    if (chatWindow) chatWindow.classList.add('hidden');
    if (bubble) {
      bubble.style.opacity = '1';
      bubble.style.pointerEvents = 'auto';
    }
  }
}

// Initialize event listeners
function initChatbot() {
  console.log('✅ initChatbot called');
  
  // Chatbot button click
  const chatbotButton = document.getElementById('chatbot-button');
  if (chatbotButton) {
    chatbotButton.addEventListener('click', toggleChatbot);
    console.log('✅ Chatbot button listener added');
  } else {
    console.error('❌ chatbot-button not found');
  }
  
  // Close button click
  const closeBtn = document.getElementById('chatbot-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', toggleChatbot);
    console.log('✅ Close button listener added');
  }
  
  // Send button click
  const sendBtn = document.getElementById('chatbot-send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', sendCustomMessage);
    console.log('✅ Send button listener added');
  }
  
  // Input enter key
  const input = document.getElementById('chatbot-input');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendCustomMessage();
      }
    });
    console.log('✅ Input enter listener added');
  }
}

// Show question list
function showQuestionList() {
  console.log('✅ showQuestionList called');
  const lang = window.currentLanguage || 'ko';
  const qa = chatbotQA[lang];
  const container = document.getElementById('chatbot-questions');
  
  console.log('📌 Current language:', lang);
  console.log('📌 QA data:', qa);
  console.log('📌 Container:', container);
  
  if (!container) {
    console.error('❌ chatbot-questions container not found!');
    return;
  }
  
  if (!qa || qa.length === 0) {
    console.error('❌ No QA data for language:', lang);
    return;
  }
  
  container.innerHTML = '';
  
  qa.forEach((item, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'bg-white border-2 border-indigo-100 rounded-lg p-3 hover:border-indigo-300 hover:shadow-md transition cursor-pointer';
    questionDiv.onclick = () => showAnswer(index);
    
    questionDiv.innerHTML = `
      <div class="flex items-start space-x-2">
        <span class="text-indigo-600 font-bold text-sm flex-shrink-0">${index + 1}.</span>
        <span class="text-sm text-gray-800 font-medium">${item.q}</span>
      </div>
    `;
    
    container.appendChild(questionDiv);
  });
  
  currentView = 'list';
}

// Show answer
function showAnswer(index) {
  console.log('✅ showAnswer called with index:', index);
  const lang = window.currentLanguage || 'ko';
  const qa = chatbotQA[lang];
  
  if (!qa || !qa[index]) {
    console.error('❌ Invalid question index:', index);
    return;
  }
  
  const item = qa[index];
  const container = document.getElementById('chatbot-questions');
  
  if (!container) {
    console.error('❌ chatbot-questions container not found!');
    return;
  }
  
  container.innerHTML = `
    <div class="space-y-4">
      <!-- Question -->
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-4">
        <div class="flex items-start space-x-2 mb-2">
          <span class="text-indigo-600 font-bold text-base">Q.</span>
          <span class="text-sm font-bold text-gray-800">${item.q}</span>
        </div>
      </div>
      
      <!-- Answer -->
      <div class="bg-white border-2 border-green-100 rounded-lg p-4 shadow-sm">
        <div class="flex items-start space-x-2">
          <span class="text-green-600 font-bold text-base flex-shrink-0">A.</span>
          <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">${item.a}</p>
        </div>
      </div>
      
      <!-- Back Button -->
      <div class="text-center pt-2">
        <button onclick="showQuestionList()" class="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-lg transition">
          ← 질문 목록으로 돌아가기
        </button>
      </div>
    </div>
  `;
  
  currentView = 'answer';
  container.scrollTop = 0;
}

// Send custom message (from input)
function sendCustomMessage() {
  const input = document.getElementById('chatbot-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Find matching question
  const lang = window.currentLanguage || 'ko';
  const qa = chatbotQA[lang];
  let foundIndex = -1;
  
  // Exact or partial match
  for (let i = 0; i < qa.length; i++) {
    if (qa[i].q.toLowerCase().includes(message.toLowerCase()) || 
        message.toLowerCase().includes(qa[i].q.toLowerCase())) {
      foundIndex = i;
      break;
    }
  }
  
  if (foundIndex !== -1) {
    showAnswer(foundIndex);
  } else {
    // Show "no match" message
    const container = document.getElementById('chatbot-questions');
    container.innerHTML = `
      <div class="text-center py-8">
        <div class="text-4xl mb-4">😕</div>
        <p class="text-gray-600 mb-4">죄송합니다. 일치하는 답변을 찾을 수 없습니다.</p>
        <button onclick="showQuestionList()" class="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-lg transition">
          질문 목록 보기
        </button>
      </div>
    `;
  }
  
  input.value = '';
}

// Update chatbot bubble text on language change
function updateChatbotBubble() {
  const lang = window.currentLanguage || 'ko';
  const bubbleText = document.getElementById('chatbot-bubble-text');
  
  const bubbleTexts = {
    ko: '궁금하신<br>질문은<br>자동응답봇에<br>문의하세요',
    en: 'Have<br>questions?<br>Ask our<br>chatbot',
    zh: '有疑问吗？<br>请询问<br>聊天<br>机器人',
    ja: '質問が<br>ありますか？<br>チャット<br>ボットに'
  };
  
  if (bubbleText) {
    bubbleText.innerHTML = bubbleTexts[lang];
  }
  
  // Update question list if chatbot is open
  if (chatbotOpen && currentView === 'list') {
    showQuestionList();
  }
}

// Listen for language changes
if (typeof window !== 'undefined') {
  // Store original changeLanguage function
  const originalChangeLanguage = window.changeLanguage;
  
  // Override changeLanguage to update chatbot
  window.changeLanguage = function(lang) {
    console.log('🌍 Language changed to:', lang);
    
    // Call original function (i18n.js will update window.currentLanguage)
    if (originalChangeLanguage && typeof originalChangeLanguage === 'function') {
      originalChangeLanguage(lang);
    }
    
    // Update chatbot
    updateChatbotBubble();
  };
  
  // Initialize on page load
  window.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Chatbot DOMContentLoaded');
    updateChatbotBubble();
    initChatbot();
  });
  
  // Also try immediate initialization
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('✅ Chatbot immediate init');
    updateChatbotBubble();
    initChatbot();
  }
  
  // Make functions globally available for debugging
  window.toggleChatbot = toggleChatbot;
  window.showQuestionList = showQuestionList;
  window.showAnswer = showAnswer;
}
