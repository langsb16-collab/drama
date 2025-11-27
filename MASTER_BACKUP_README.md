# 🎯 MASTER BACKUP - 휴대폰 언어전환 + 자동응답봇 완벽 작동 기준

## 📌 백업 정보

**이것이 모든 복원의 기준점입니다!**

### Git 정보
- **Tag**: `MASTER_BACKUP` / `header-lang-perfect-backup`
- **Commit**: `b37d408` - "Fix: PM2 설정도 docs 폴더 사용하도록 변경"
- **날짜**: 2025-11-27 08:13 UTC

### 핵심 기능

#### ✅ 1. 다국어 언어 전환 (휴대폰 완벽 작동)
- 🇰🇷 한국어 - 주황색 (bg-orange-500)
- 🇬🇧 영어   - 파란색 (bg-blue-500)  
- 🇨🇳 중국어 - 빨간색 (bg-red-500)
- 🇯🇵 일본어 - 보라색 (bg-purple-500)

**특징:**
- `changeLanguage()` 함수 완벽 작동
- `window.currentLanguage` 글로벌 동기화
- 버튼 클릭 시 배경색 변경
- 전체 페이지 텍스트 번역
- **휴대폰에서 버튼 정상 표시 및 작동**

#### ✅ 2. 자동응답 챗봇 4개국어
- 한국어 (ko): 14개 Q&A
- 영어 (en): 14개 Q&A
- 중국어 (zh): 14개 Q&A
- 일본어 (ja): 14개 Q&A

**특징:**
- 보라색 말풍선 버튼
- 질문 리스트 표시
- 클릭 시 답변 표시
- 언어 전환 시 챗봇도 자동 변경

#### ✅ 3. 헤더 디자인
- 로고 (왼쪽)
- 언어 버튼 (중앙)
- 로그인/회원가입 (오른쪽)
  - 로그인: 파란색
  - 회원가입: 주황색
- 회색 배경
- 깜박임 오류 해결

---

## 📂 파일 구조

### GitHub Pages 배포
```
/home/user/webapp/
├── docs/                    ✅ /docs 배포용
│   ├── index.html          ✅ 메인 페이지
│   ├── chatbot.js          ✅ 4개국어 챗봇 (22K)
│   ├── i18n.js             ✅ 4개국어 전환 (23K)
│   ├── app.js              ✅ 맛집/축제
│   ├── auth.js             ✅ 로그인
│   └── data/               ✅ JSON 데이터
│
├── (루트)                   ✅ / (root) 배포용
│   ├── index.html          ✅ 메인 페이지
│   ├── chatbot.js          ✅ 4개국어 챗봇
│   ├── i18n.js             ✅ 4개국어 전환
│   └── ...                 (docs와 동일)
```

**양쪽 모두 동일한 파일 = 어느 설정이든 작동**

---

## 🔄 복원 방법

### 1️⃣ 이 백업 시점으로 복원
```bash
cd /home/user/webapp
git reset --hard MASTER_BACKUP
# 또는
git reset --hard header-lang-perfect-backup
# 또는
git reset --hard b37d408
```

### 2️⃣ 루트에도 파일 복사 (/ root 배포용)
```bash
cp -r docs/* .
```

### 3️⃣ GitHub에 푸시
```bash
git add .
git commit -m "Restore: MASTER_BACKUP - 휴대폰 언어전환 + 자동응답봇 완벽 작동"
git push -f origin main
```

---

## 🌍 배포 설정

### GitHub Pages 설정 옵션

#### 옵션 1: `/docs` 폴더 사용
- Settings > Pages
- Folder: `/docs`
- ✅ 권장 (깔끔한 구조)

#### 옵션 2: `/ (root)` 사용  
- Settings > Pages
- Folder: `/ (root)`
- ✅ 루트에 파일 준비됨

**어느 설정이든 작동!**

---

## ✅ 테스트 방법

### 📱 휴대폰 테스트
1. https://jt365.me 접속
2. 언어 버튼 (🇰🇷 🇬🇧 🇨🇳 🇯🇵) 보이는지 확인
3. 각 버튼 클릭 → 배경색 변경, 텍스트 번역 확인
4. 보라색 말풍선 버튼 클릭 → 챗봇 작동 확인

### 💻 PC 테스트
1. 헤더 레이아웃 확인
2. 언어 전환 작동 확인
3. 챗봇 작동 확인

---

## 📌 중요 사항

**이 백업 시점은:**
- ✅ 휴대폰 언어전환 버튼 완벽 작동
- ✅ 자동응답 챗봇 4개국어 완벽 작동
- ✅ 모든 복원의 기준점
- ✅ `/docs`와 `/root` 모두 준비됨

**향후 문제 발생 시:**
```bash
git reset --hard MASTER_BACKUP
cp -r docs/* .
git add .
git commit -m "Restore to MASTER_BACKUP"
git push -f origin main
```

---

## 🎯 Production URLs

- **GitHub Pages**: https://jt365.me
- **GitHub Repo**: https://github.com/langsb16-collab/drama

---

**마지막 업데이트**: 2025-11-27 08:20 UTC  
**작성자**: Claude Code Agent  
**상태**: ✅ 완벽 작동 확인
