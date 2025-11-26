# 🎯 자동응답봇 백업 시점

## 📅 백업 정보
- **백업 시간**: 홍콩 시간 2025-11-26 11:38
- **Git 커밋**: `3067d2e`
- **Git 태그**: `chatbot-backup-20251126`
- **GitHub**: https://github.com/langsb16-collab/drama

## ✅ 정상 작동 기능

### 1. 다국어 지원 (4개 언어)
- 🇰🇷 **한국어**: 완벽 작동
- 🇺🇸 **영어**: 완벽 작동
- 🇨🇳 **중국어**: 완벽 작동
- 🇯🇵 **일본어**: 완벽 작동

### 2. 챗봇 UI
- ✅ 말풍선 애니메이션 (4줄 표시)
- ✅ 언어별 말풍선 텍스트 자동 변경
- ✅ 클릭 시 챗봇 창 열림

### 3. 질문/답변 시스템
- ✅ 14개 질문 리스트 표시
- ✅ 질문 클릭 → 답변 표시
- ✅ 답변 화면에서 "질문 목록 보기" 버튼
- ✅ 검색 기능 (하단 입력창)

### 4. 언어 전환
- ✅ 헤더 국기 버튼 클릭 시 자동 언어 전환
- ✅ 챗봇 말풍선 텍스트 자동 업데이트
- ✅ 챗봇 창 열려있으면 질문 리스트 자동 갱신

## 🔧 복원 방법

### 방법 1: Git 태그로 복원
```bash
cd /home/user/webapp
git fetch --tags
git checkout chatbot-backup-20251126
git checkout -b restore-chatbot
git push -f origin main
```

### 방법 2: 커밋 해시로 복원
```bash
cd /home/user/webapp
git reset --hard 3067d2e
git push -f origin main
```

## 📝 주요 파일
- `docs/chatbot.js` - 챗봇 로직 및 Q&A 데이터
- `docs/i18n.js` - 다국어 처리 (window.currentLanguage 글로벌 동기화)
- `docs/index.html` - 챗봇 UI HTML

## 🌟 말풍선 텍스트

### 한국어
```
궁금하신
질문은
자동응답봇에
문의하세요
```

### 영어
```
If you have
any questions,
please contact
our Auto-Response Bot
```

### 중국어
```
如有疑问，
请咨询
自动回复
机器人
```

### 일본어
```
質問が
ありますか？
チャット
ボットに
```

## 📊 Q&A 데이터 구조
각 언어별 14개 질문/답변:
1. JT365 소개
2. 제공 정보 종류
3. 중고거래 방법
4. 에스크로 결제
5. 직거래 인증
6. 상품 카테고리
7. 회원가입/로그인
8. 맛집/여행 정보
9. 회원 기능
10. 지역 정책 정보
11. 서비스 지역
12. 여행사 등록
13. 리뷰 시스템
14. 플랫폼 목표

---

**이 시점으로 복원하면 자동응답봇이 완벽하게 작동합니다!** ✅
