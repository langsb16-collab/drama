// Chatbot Q&A Database
const chatbotQA = {
  ko: [
    { q: 'JT365가 뭐예요?', a: 'JT365는 "전라도 로컬 미식 + 여행 + 지역 커뮤니티 + 거래" 정보를 한데 모은 플랫폼입니다. 맛집, 축제, 여행, 숙박, 중고거래, 지역 정책 정보 등을 제공합니다.', keywords: ['JT365', '뭐', '뭔지', '무엇', '소개'] },
    { q: '어떤 종류의 정보가 있어요?', a: '맛집 정보, 지역 축제, 숙박업소, 여행사, 지역 특화 여행/관광지, 중고거래 매물, 지역 정책/혜택 정보 등을 볼 수 있어요', keywords: ['정보', '종류', '뭐있어', '있나요'] },
    { q: '중고거래는 어떻게 되나요?', a: '"사고팔고" 섹션을 통해 지역 기반 중고거래가 가능합니다. 에스크로 결제, QR 직거래 인증, GPS 기반 동네 인증, 1:1 채팅, 후기 시스템 등이 적용돼요.', keywords: ['중고', '거래', '사고팔고', '어디', '어떻게'] },
    { q: '에스크로 결제 방식은 어떤 건가요?', a: '구매자가 결제하면 금액은 먼저 에스크로로 보관되고, 구매확정 후 판매자에게 송금됩니다. 미수령 또는 문제 발생 시 환불 처리도 가능합니다.', keywords: ['에스크로', '결제', '안전', '보관'] },
    { q: '직거래 인증은 어떻게 하나요?', a: '상품 단위로 생성된 QR을 구매자가 스캔하면 "직거래 완료" 인증이 가능해요. 판매자 단말기 없이도 모바일만으로 구현됩니다.', keywords: ['직거래', 'QR', '인증', '스캔'] },
    { q: '회원가입은 어떻게 해요?', a: '홈페이지 상단의 "회원가입" 또는 "로그인" 버튼을 클릭하여, 이메일과 비밀번호로 계정을 만들거나 로그인할 수 있습니다.', keywords: ['회원', '가입', '로그인', '계정'] },
    { q: '맛집 정보는 어디서 찾나요?', a: '메인 메뉴에서 "맛집", "축제", "숙박", "여행사" 항목을 선택하면, 해당 지역의 맛집, 숙소, 맞춤여행사 정보를 볼 수 있어요.', keywords: ['맛집', '여행', '찾기', '정보', '어디'] },
    { q: '지역 정책 정보도 있나요?', a: '네 — "우리동네 혜택" 섹션에서는 빈집 임대·리모델링, 로컬크리에이터 지원, 워케이션, 지방소멸 대응 사업 등 지역 정책 및 지원 정보를 안내합니다.', keywords: ['정책', '지원', '혜택', '우리동네'] },
    { q: '어떤 지역을 다루나요?', a: '주로 "전라도(전라남도, 전라북도)" 중심이지만, 여행사 정보는 전국(서울, 부산, 제주, 강원 등)까지 포함된 경우가 있습니다.', keywords: ['지역', '어디', '전라', '범위'] },
    { q: '후기 시스템이 있나요?', a: '네 — 거래가 성사된 사용자만 후기를 남길 수 있으며, 후기 작성 유도를 위한 자동 알림 기능이 포함됩니다.', keywords: ['후기', '리뷰', '평가', '평점'] }
  ],
  en: [
    { q: 'What is JT365?', a: 'JT365 is a platform that brings together information about Jeolla local cuisine, travel, community, and marketplace services. It provides restaurant guides, festivals, travel, lodging, secondhand trading, and local policy information.', keywords: ['JT365', 'what', 'about', 'platform'] },
    { q: 'What kind of information does it offer?', a: 'You can find restaurant information, local festivals, accommodations, travel agencies, regional tourist attractions, secondhand marketplace listings, and community policy/benefit information.', keywords: ['information', 'offer', 'provide', 'what'] },
    { q: 'How does the secondhand marketplace work?', a: 'You can buy and sell locally through the "Buy & Sell" section. It includes escrow payment, QR-based face-to-face trade verification, GPS neighborhood authentication, 1:1 chat, and a review system.', keywords: ['marketplace', 'secondhand', 'trade', 'how', 'buy', 'sell'] },
    { q: 'How does the escrow payment system work?', a: 'When the buyer makes a payment, the amount is held in escrow first. After the purchase is confirmed, the money is transferred to the seller. If the item isn\'t received or a problem occurs, a refund is possible.', keywords: ['escrow', 'payment', 'safe', 'secure'] },
    { q: 'How do I verify a face-to-face transaction?', a: 'A QR code generated per product can be scanned by the buyer to verify a successful direct transaction. It works entirely on mobile—no seller terminal device required.', keywords: ['verify', 'QR', 'face-to-face', 'direct'] },
    { q: 'How do I sign up or log in?', a: 'Click the "Sign Up" or "Log In" button at the top of the website to create an account or log in using your email and password.', keywords: ['sign', 'signup', 'login', 'register', 'account'] },
    { q: 'Where can I find restaurant information?', a: 'Select "Restaurants", "Festivals", "Lodging", or "Travel Agencies" from the main menu to browse local restaurant lists, accommodations, and custom travel agency recommendations.', keywords: ['restaurant', 'food', 'find', 'where', 'travel'] },
    { q: 'Do you provide local policy information?', a: 'Yes — the "Local Benefits" section offers information on vacant house rental/remodeling programs, local creator support, workation programs, and regional revitalization initiatives.', keywords: ['policy', 'support', 'benefit', 'local'] },
    { q: 'Which regions are covered?', a: 'The main focus is Jeollanam-do and Jeollabuk-do (the Jeolla region), but some travel agency information includes nationwide areas such as Seoul, Busan, Jeju, and Gangwon.', keywords: ['region', 'area', 'where', 'coverage'] },
    { q: 'Is there a review system?', a: 'Yes — only users who have completed a transaction can leave a review. Automatic reminders are also sent to encourage review submission.', keywords: ['review', 'rating', 'feedback'] }
  ],
  zh: [
    { q: 'JT365 是什么？', a: 'JT365 是一个整合"全罗道当地美食 + 旅行 + 地区社区 + 二手交易"信息的平台。提供餐厅推荐、地方庆典、旅行、住宿、二手交易以及地方政策等内容。', keywords: ['JT365', '什么', '介绍', '平台'] },
    { q: '提供哪些类型的信息？', a: '您可以查看餐厅信息、地方庆典、住宿、旅行社、特色旅游景点、二手商品信息、地区政策与优惠资讯。', keywords: ['信息', '类型', '有什么', '提供'] },
    { q: '二手交易怎么进行？', a: '可以通过"买卖区"进行基于地区的二手交易。支持托管支付、二维码当面交易认证、GPS 区域认证、1对1 聊天、交易评价系统等功能。', keywords: ['二手', '交易', '买卖', '怎么', '如何'] },
    { q: '托管支付是怎么运作的？', a: '买家付款后，金额会先存放在托管账户中；确认收货后再打款给卖家。如果未收到商品或发生问题，也可以申请退款。', keywords: ['托管', '支付', '安全', '保管'] },
    { q: '如何进行当面交易认证？', a: '商品会生成专属二维码，买家扫描后即可完成"当面交易认证"。整个过程只需手机，不需要卖家专用设备。', keywords: ['当面', '二维码', '认证', '扫描'] },
    { q: '如何注册或登录？', a: '点击网站顶部的"注册"或"登录"按钮，通过邮箱与密码即可完成注册或登录。', keywords: ['注册', '登录', '会员', '账户'] },
    { q: '在哪里可以找到美食信息？', a: '在主菜单选择"美食"、"庆典"、"住宿"、"旅行社"即可查看相关地区的餐厅、住宿与旅行社信息。', keywords: ['美食', '餐厅', '查找', '信息', '哪里'] },
    { q: '也提供地方政策信息吗？', a: '是的，在"我们社区福利"中可查看空房租赁/改造、地方创作者支援、Workation、地区活化项目等政策信息。', keywords: ['政策', '支援', '福利', '社区'] },
    { q: '平台主要涵盖哪些地区？', a: '主要以"全罗道（全罗南道、全罗北道）"为核心，但旅行社相关信息也包含首尔、釜山、济州、江原等全国地区。', keywords: ['地区', '哪里', '范围', '覆盖'] },
    { q: '有评价系统吗？', a: '是的，只有完成交易的用户才能留下评价，并且系统会自动发送评价提醒。', keywords: ['评价', '评论', '评分'] }
  ],
  ja: [
    { q: 'JT365とは何ですか？', a: 'JT365は、"全羅道のローカルグルメ＋旅行＋地域コミュニティ＋取引"の情報をまとめて提供するプラットフォームです。飲食店、祭り、旅行、宿泊、フリマ取引、地域政策などの情報を閲覧できます。', keywords: ['JT365', '何', '紹介', 'プラットフォーム'] },
    { q: 'どんな種類の情報がありますか？', a: '飲食店情報、地域の祭り、宿泊施設、旅行会社、地域特化の観光地、フリマ商品、地域の政策・支援情報などを見ることができます。', keywords: ['情報', '種類', 'ありますか', '提供'] },
    { q: 'フリマ取引はどうやって行いますか？', a: '「売ります・買います」セクションで地域ベースのフリマ取引ができます。エスクロー決済、QRによる対面取引認証、GPSによるエリア認証、1対1チャット、レビューシステムなどが利用可能です。', keywords: ['フリマ', '取引', '売買', 'どうやって', '方法'] },
    { q: 'エスクロー決済はどのような仕組みですか？', a: '購入者が支払うと、金額はまずエスクローに保管されます。受取確認後に販売者へ送金されます。未受取やトラブル発生時には返金対応も可能です。', keywords: ['エスクロー', '決済', '安全', '保管'] },
    { q: '対面取引の認証はどのように行いますか？', a: '商品ごとに生成されるQRコードを購入者がスキャンすると、「対面取引完了」の認証が可能です。販売者の専用端末は不要で、スマホだけで利用できます。', keywords: ['対面', 'QR', '認証', 'スキャン'] },
    { q: '会員登録やログインはどうすればいいですか？', a: 'ホームページ上部の「会員登録」または「ログイン」ボタンをクリックし、メールアドレスとパスワードで登録・ログインできます。', keywords: ['会員', '登録', 'ログイン', 'アカウント'] },
    { q: 'グルメ情報はどこで探せますか？', a: 'メインメニューの「グルメ」「祭り」「宿泊」「旅行会社」を選ぶと、地域の飲食店、宿泊先、旅行会社の情報を見ることができます。', keywords: ['グルメ', '飲食', '探す', '情報', 'どこ'] },
    { q: '地域政策情報もありますか？', a: 'はい。「わたしの地域特典」では、空き家賃貸・リモデリング、ローカルクリエイター支援、ワーケーション、地域活性化事業などの政策や支援情報を案内しています。', keywords: ['政策', '支援', '特典', '地域'] },
    { q: 'どの地域を対象にしていますか？', a: '主に"全羅道（全羅南道・全羅北道）"が中心ですが、旅行会社の情報はソウル、釜山、済州、江原など全国を含む場合があります。', keywords: ['地域', 'どこ', '範囲', '対象'] },
    { q: 'レビューシステムはありますか？', a: 'はい。取引が成立したユーザーのみレビューを残せます。また、レビュー投稿を促す自動通知機能もあります。', keywords: ['レビュー', '評価', '評判'] }
  ]
};

// Chatbot state
let chatbotOpen = false;

// Toggle chatbot window
function toggleChatbot() {
  chatbotOpen = !chatbotOpen;
  const window = document.getElementById('chatbot-window');
  const bubble = document.getElementById('chatbot-bubble');
  
  if (chatbotOpen) {
    window.classList.remove('hidden');
    bubble.style.opacity = '0';
    bubble.style.pointerEvents = 'none';
  } else {
    window.classList.add('hidden');
    bubble.style.opacity = '1';
    bubble.style.pointerEvents = 'auto';
  }
}

// Send message
function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addMessage(message, 'user');
  input.value = '';
  
  // Find answer
  setTimeout(() => {
    const answer = findAnswer(message);
    addMessage(answer, 'bot');
  }, 500);
}

// Send quick question
function sendQuickQuestion(qId) {
  const lang = currentLanguage || 'ko';
  let question = '';
  
  if (qId === 'q1') {
    question = lang === 'ko' ? 'JT365가 뭐예요?' : 
               lang === 'en' ? 'What is JT365?' :
               lang === 'zh' ? 'JT365 是什么？' :
               'JT365とは何ですか？';
  } else if (qId === 'q2') {
    question = lang === 'ko' ? '중고거래는 어떻게 되나요?' :
               lang === 'en' ? 'How does the secondhand marketplace work?' :
               lang === 'zh' ? '二手交易怎么进行？' :
               'フリマ取引はどうやって行いますか？';
  } else if (qId === 'q3') {
    question = lang === 'ko' ? '회원가입은 어떻게 해요?' :
               lang === 'en' ? 'How do I sign up or log in?' :
               lang === 'zh' ? '如何注册或登录？' :
               '会員登録やログインはどうすればいいですか？';
  }
  
  addMessage(question, 'user');
  
  setTimeout(() => {
    const answer = findAnswer(question);
    addMessage(answer, 'bot');
  }, 500);
}

// Find answer
function findAnswer(question) {
  const lang = currentLanguage || 'ko';
  const qa = chatbotQA[lang];
  
  // Exact match
  for (const item of qa) {
    if (item.q.toLowerCase() === question.toLowerCase()) {
      return item.a;
    }
  }
  
  // Keyword match
  for (const item of qa) {
    for (const keyword of item.keywords) {
      if (question.toLowerCase().includes(keyword.toLowerCase())) {
        return item.a;
      }
    }
  }
  
  // Default answer
  const defaultAnswers = {
    ko: '죄송합니다. 이해하지 못했습니다. 다른 질문을 해주시거나 상단의 자주 묻는 질문 버튼을 이용해주세요.',
    en: 'Sorry, I didn\'t understand that. Please try a different question or use the quick question buttons above.',
    zh: '抱歉，我没理解您的问题。请尝试其他问题或使用上方的常见问题按钮。',
    ja: '申し訳ございません。質問を理解できませんでした。他の質問をするか、上のよくある質問ボタンをご利用ください。'
  };
  
  return defaultAnswers[lang];
}

// Add message to chat
function addMessage(text, type) {
  const messagesContainer = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  
  if (type === 'user') {
    messageDiv.className = 'flex items-start space-x-2 justify-end';
    messageDiv.innerHTML = `
      <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl rounded-tr-none p-3 shadow-sm max-w-[80%]">
        <p class="text-sm">${text}</p>
      </div>
    `;
  } else {
    messageDiv.className = 'flex items-start space-x-2';
    messageDiv.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
        </svg>
      </div>
      <div class="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
        <p class="text-sm text-gray-800">${text}</p>
      </div>
    `;
  }
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Update chatbot bubble text on language change
function updateChatbotBubble() {
  const lang = currentLanguage || 'ko';
  const bubbleText = document.getElementById('chatbot-bubble-text');
  
  const bubbleTexts = {
    ko: '궁금하신 질문은<br>자동 응답 봇에<br>문의하세요',
    en: 'Have questions?<br>Ask our<br>chatbot',
    zh: '有疑问吗？<br>请询问<br>聊天机器人',
    ja: '質問がありますか？<br>チャットボットに<br>聞いてください'
  };
  
  bubbleText.innerHTML = bubbleTexts[lang];
}

// Listen for language changes
if (typeof window !== 'undefined') {
  const originalChangeLanguage = window.changeLanguage;
  window.changeLanguage = function(lang) {
    if (originalChangeLanguage) {
      originalChangeLanguage(lang);
    }
    updateChatbotBubble();
  };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateChatbotBubble();
});
