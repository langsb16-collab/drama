// auth.js - 회원가입/로그인 시스템 (LocalStorage 기반)

// 사용자 데이터 구조
class User {
  constructor(email, password, name, role = 'user') {
    this.id = Date.now().toString();
    this.email = email;
    this.password = password; // 실제로는 해시해야 함
    this.name = name;
    this.role = role; // 'admin', 'merchant', 'user'
    this.createdAt = new Date().toISOString();
    this.status = 'active';
    this.phone = '';
    this.avatar = '';
  }
}

// Auth 관리자
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.users = this.loadUsers();
    this.init();
  }

  init() {
    // 로컬스토리지에서 현재 사용자 로드
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }

    // 기본 관리자 계정 생성 (없으면)
    if (this.users.length === 0) {
      const admin = new User('admin@jt365.me', 'admin123', '관리자', 'admin');
      this.users.push(admin);
      this.saveUsers();
    }
  }

  loadUsers() {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  saveCurrentUser() {
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  // 회원가입
  register(email, password, name, role = 'user') {
    // 이메일 중복 확인
    if (this.users.find(u => u.email === email)) {
      return { success: false, message: '이미 존재하는 이메일입니다.' };
    }

    // 유효성 검사
    if (!email || !password || !name) {
      return { success: false, message: '모든 필드를 입력해주세요.' };
    }

    if (password.length < 6) {
      return { success: false, message: '비밀번호는 6자 이상이어야 합니다.' };
    }

    // 새 사용자 생성
    const user = new User(email, password, name, role);
    this.users.push(user);
    this.saveUsers();

    return { success: true, message: '회원가입이 완료되었습니다.', user };
  }

  // 로그인
  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    }

    if (user.status !== 'active') {
      return { success: false, message: '정지된 계정입니다. 관리자에게 문의하세요.' };
    }

    this.currentUser = user;
    this.saveCurrentUser();

    return { success: true, message: '로그인 되었습니다.', user };
  }

  // 로그아웃
  logout() {
    this.currentUser = null;
    this.saveCurrentUser();
    return { success: true, message: '로그아웃 되었습니다.' };
  }

  // 현재 사용자 확인
  getCurrentUser() {
    return this.currentUser;
  }

  // 관리자 권한 확인
  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  // 사업자 권한 확인
  isMerchant() {
    return this.currentUser && (this.currentUser.role === 'merchant' || this.currentUser.role === 'admin');
  }

  // 로그인 여부 확인
  isLoggedIn() {
    return this.currentUser !== null;
  }

  // 사용자 정보 업데이트
  updateUser(userId, updates) {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, message: '사용자를 찾을 수 없습니다.' };
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    this.saveUsers();

    // 현재 사용자인 경우 업데이트
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = this.users[userIndex];
      this.saveCurrentUser();
    }

    return { success: true, message: '사용자 정보가 업데이트되었습니다.', user: this.users[userIndex] };
  }

  // 사용자 삭제
  deleteUser(userId) {
    if (this.currentUser && this.currentUser.id === userId) {
      return { success: false, message: '자신의 계정은 삭제할 수 없습니다.' };
    }

    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, message: '사용자를 찾을 수 없습니다.' };
    }

    this.users.splice(userIndex, 1);
    this.saveUsers();

    return { success: true, message: '사용자가 삭제되었습니다.' };
  }

  // 모든 사용자 조회 (관리자 전용)
  getAllUsers() {
    if (!this.isAdmin()) {
      return { success: false, message: '권한이 없습니다.' };
    }

    return { success: true, users: this.users };
  }

  // 사용자 검색
  searchUsers(query) {
    if (!this.isAdmin()) {
      return { success: false, message: '권한이 없습니다.' };
    }

    const results = this.users.filter(u => 
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      u.name.toLowerCase().includes(query.toLowerCase())
    );

    return { success: true, users: results };
  }
}

// 전역 인스턴스 생성
const authManager = new AuthManager();

// UI 업데이트 함수
function updateAuthUI() {
  const user = authManager.getCurrentUser();
  const authButtons = document.getElementById('auth-buttons');
  const userInfo = document.getElementById('user-info');

  if (!authButtons) return;

  if (user) {
    authButtons.style.display = 'none';
    if (userInfo) {
      userInfo.style.display = 'flex';
      userInfo.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="bg-white bg-opacity-20 w-8 h-8 rounded-full flex items-center justify-center">
            <i class="fas fa-user text-white"></i>
          </div>
          <div class="text-white">
            <p class="text-sm font-semibold">${user.name}</p>
            <p class="text-xs opacity-75">${user.role === 'admin' ? '관리자' : user.role === 'merchant' ? '사업자' : '일반회원'}</p>
          </div>
          ${user.role === 'admin' ? `
            <a href="/admin.html" class="ml-2 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded-full transition">
              <i class="fas fa-cog mr-1"></i>관리자
            </a>
          ` : ''}
          <button onclick="handleLogout()" class="ml-2 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs rounded-full transition">
            <i class="fas fa-sign-out-alt mr-1"></i>로그아웃
          </button>
        </div>
      `;
    }
  } else {
    authButtons.style.display = 'flex';
    if (userInfo) {
      userInfo.style.display = 'none';
    }
  }
}

// 로그인 모달 표시
function showLoginModal() {
  const modal = document.getElementById('auth-modal');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  if (modal) {
    modal.style.display = 'flex';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  }
}

// 회원가입 모달 표시
function showRegisterModal() {
  const modal = document.getElementById('auth-modal');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  if (modal) {
    modal.style.display = 'flex';
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }
}

// 모달 닫기
function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// 로그인 처리
function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  const result = authManager.login(email, password);
  
  if (result.success) {
    alert(result.message);
    closeAuthModal();
    updateAuthUI();
    
    // 페이지 새로고침
    if (typeof loadRestaurants === 'function') {
      loadRestaurants();
    }
  } else {
    alert(result.message);
  }
}

// 회원가입 처리
function handleRegister(event) {
  event.preventDefault();
  
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const name = document.getElementById('register-name').value;
  
  const result = authManager.register(email, password, name);
  
  if (result.success) {
    alert(result.message);
    
    // 자동 로그인
    authManager.login(email, password);
    closeAuthModal();
    updateAuthUI();
  } else {
    alert(result.message);
  }
}

// 로그아웃 처리
function handleLogout() {
  if (confirm('로그아웃하시겠습니까?')) {
    authManager.logout();
    updateAuthUI();
    alert('로그아웃 되었습니다.');
    
    // 관리자 페이지에서는 메인으로 이동
    if (window.location.pathname.includes('admin')) {
      window.location.href = '/';
    }
  }
}

// 페이지 로드 시 UI 업데이트
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
});
