// admin.js - 관리자 페이지 JavaScript

// 권한 확인
function checkAdminAccess() {
  if (!authManager.isAdmin()) {
    alert('관리자 권한이 필요합니다.');
    window.location.href = '/';
    return false;
  }
  return true;
}

// 페이지 로드 시 권한 확인
document.addEventListener('DOMContentLoaded', () => {
  if (!checkAdminAccess()) return;
  
  updateAdminUI();
  loadDashboardStats();
  loadUsersTable();
});

// 관리자 UI 업데이트
function updateAdminUI() {
  const user = authManager.getCurrentUser();
  const userInfo = document.getElementById('admin-user-info');
  
  if (user && userInfo) {
    userInfo.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="bg-white bg-opacity-20 w-8 h-8 rounded-full flex items-center justify-center">
          <i class="fas fa-user text-white"></i>
        </div>
        <div>
          <p class="text-sm font-semibold">${user.name}</p>
          <p class="text-xs opacity-75">관리자</p>
        </div>
        <button onclick="handleLogout()" class="ml-2 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-xs transition">
          <i class="fas fa-sign-out-alt mr-1"></i>로그아웃
        </button>
      </div>
    `;
  }
}

// 대시보드 통계 로드
async function loadDashboardStats() {
  try {
    // 회원 수
    const usersResult = authManager.getAllUsers();
    if (usersResult.success) {
      document.getElementById('stat-users').textContent = usersResult.users.length;
    }
    
    // 맛집 수 (JSON 파일에서 로드)
    const restaurantsResponse = await fetch('./data/restaurants.json');
    const restaurantsData = await restaurantsResponse.json();
    document.getElementById('stat-restaurants').textContent = restaurantsData.restaurants?.length || 350;
    
    // 여행사 수
    const agenciesResponse = await fetch('./data/travel-agencies.json');
    const agenciesData = await agenciesResponse.json();
    document.getElementById('stat-agencies').textContent = agenciesData.agencies?.length || 32;
    
    // 축제 수
    const festivalsResponse = await fetch('./data/festivals.json');
    const festivalsData = await festivalsResponse.json();
    document.getElementById('stat-festivals').textContent = festivalsData.festivals?.length || 60;
    
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// 섹션 전환
function showSection(sectionId) {
  // 모든 섹션 숨기기
  document.querySelectorAll('.admin-section').forEach(section => {
    section.classList.add('hidden');
  });
  
  // 선택한 섹션 표시
  document.getElementById(sectionId).classList.remove('hidden');
  
  // 사이드바 활성화 상태 업데이트
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  });
  
  const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  // 해당 섹션 데이터 로드
  if (sectionId === 'users') {
    loadUsersTable();
  }
}

// 회원 테이블 로드
function loadUsersTable() {
  const result = authManager.getAllUsers();
  const tbody = document.getElementById('users-table-body');
  
  if (!result.success) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="px-6 py-8 text-center text-red-500">
          ${result.message}
        </td>
      </tr>
    `;
    return;
  }
  
  if (result.users.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="px-6 py-8 text-center text-gray-500">
          등록된 회원이 없습니다.
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = result.users.map(user => `
    <tr class="hover:bg-gray-50">
      <td class="px-6 py-4 text-sm text-gray-900">${user.id.substring(0, 8)}...</td>
      <td class="px-6 py-4 text-sm font-medium text-gray-900">${user.name}</td>
      <td class="px-6 py-4 text-sm text-gray-600">${user.email}</td>
      <td class="px-6 py-4 text-sm">
        <span class="px-3 py-1 rounded-full text-xs font-semibold ${
          user.role === 'admin' ? 'bg-red-100 text-red-800' :
          user.role === 'merchant' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }">
          ${user.role === 'admin' ? '관리자' : user.role === 'merchant' ? '사업자' : '일반'}
        </span>
      </td>
      <td class="px-6 py-4 text-sm">
        <span class="px-3 py-1 rounded-full text-xs font-semibold ${
          user.status === 'active' ? 'bg-green-100 text-green-800' :
          user.status === 'suspended' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }">
          ${user.status === 'active' ? '활성' : user.status === 'suspended' ? '정지' : '비활성'}
        </span>
      </td>
      <td class="px-6 py-4 text-sm text-gray-600">${new Date(user.createdAt).toLocaleDateString('ko-KR')}</td>
      <td class="px-6 py-4 text-sm space-x-2">
        <button onclick='editUser(${JSON.stringify(user).replace(/'/g, "&apos;")})' class="text-blue-600 hover:text-blue-800">
          <i class="fas fa-edit"></i>
        </button>
        <button onclick="deleteUser('${user.id}')" class="text-red-600 hover:text-red-800">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// 회원 검색
function searchUsers() {
  const query = document.getElementById('user-search').value;
  const roleFilter = document.getElementById('user-role-filter').value;
  
  const result = authManager.getAllUsers();
  if (!result.success) return;
  
  let filtered = result.users;
  
  // 검색어 필터링
  if (query) {
    filtered = filtered.filter(u => 
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      u.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // 권한 필터링
  if (roleFilter !== 'all') {
    filtered = filtered.filter(u => u.role === roleFilter);
  }
  
  const tbody = document.getElementById('users-table-body');
  
  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="px-6 py-8 text-center text-gray-500">
          검색 결과가 없습니다.
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = filtered.map(user => `
    <tr class="hover:bg-gray-50">
      <td class="px-6 py-4 text-sm text-gray-900">${user.id.substring(0, 8)}...</td>
      <td class="px-6 py-4 text-sm font-medium text-gray-900">${user.name}</td>
      <td class="px-6 py-4 text-sm text-gray-600">${user.email}</td>
      <td class="px-6 py-4 text-sm">
        <span class="px-3 py-1 rounded-full text-xs font-semibold ${
          user.role === 'admin' ? 'bg-red-100 text-red-800' :
          user.role === 'merchant' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }">
          ${user.role === 'admin' ? '관리자' : user.role === 'merchant' ? '사업자' : '일반'}
        </span>
      </td>
      <td class="px-6 py-4 text-sm">
        <span class="px-3 py-1 rounded-full text-xs font-semibold ${
          user.status === 'active' ? 'bg-green-100 text-green-800' :
          user.status === 'suspended' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }">
          ${user.status === 'active' ? '활성' : user.status === 'suspended' ? '정지' : '비활성'}
        </span>
      </td>
      <td class="px-6 py-4 text-sm text-gray-600">${new Date(user.createdAt).toLocaleDateString('ko-KR')}</td>
      <td class="px-6 py-4 text-sm space-x-2">
        <button onclick='editUser(${JSON.stringify(user).replace(/'/g, "&apos;")})' class="text-blue-600 hover:text-blue-800">
          <i class="fas fa-edit"></i>
        </button>
        <button onclick="deleteUser('${user.id}')" class="text-red-600 hover:text-red-800">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// 회원 모달 열기 (추가)
function openUserModal() {
  document.getElementById('user-modal-title').textContent = '회원 추가';
  document.getElementById('user-form').reset();
  document.getElementById('user-id').value = '';
  document.getElementById('user-password').required = true;
  document.getElementById('user-modal').classList.remove('hidden');
  document.getElementById('user-modal').classList.add('flex');
}

// 회원 모달 닫기
function closeUserModal() {
  document.getElementById('user-modal').classList.add('hidden');
  document.getElementById('user-modal').classList.remove('flex');
}

// 회원 편집
function editUser(user) {
  document.getElementById('user-modal-title').textContent = '회원 수정';
  document.getElementById('user-id').value = user.id;
  document.getElementById('user-name').value = user.name;
  document.getElementById('user-email').value = user.email;
  document.getElementById('user-password').value = '';
  document.getElementById('user-password').required = false;
  document.getElementById('user-role').value = user.role;
  document.getElementById('user-status').value = user.status;
  
  document.getElementById('user-modal').classList.remove('hidden');
  document.getElementById('user-modal').classList.add('flex');
}

// 회원 삭제
function deleteUser(userId) {
  if (!confirm('정말 이 회원을 삭제하시겠습니까?')) return;
  
  const result = authManager.deleteUser(userId);
  
  if (result.success) {
    alert(result.message);
    loadUsersTable();
  } else {
    alert(result.message);
  }
}

// 회원 폼 제출
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('user-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const userId = document.getElementById('user-id').value;
      const name = document.getElementById('user-name').value;
      const email = document.getElementById('user-email').value;
      const password = document.getElementById('user-password').value;
      const role = document.getElementById('user-role').value;
      const status = document.getElementById('user-status').value;
      
      if (userId) {
        // 수정
        const updates = { name, email, role, status };
        if (password) {
          updates.password = password;
        }
        
        const result = authManager.updateUser(userId, updates);
        
        if (result.success) {
          alert(result.message);
          closeUserModal();
          loadUsersTable();
        } else {
          alert(result.message);
        }
      } else {
        // 추가
        if (!password) {
          alert('비밀번호를 입력해주세요.');
          return;
        }
        
        const result = authManager.register(email, password, name, role);
        
        if (result.success) {
          alert(result.message);
          closeUserModal();
          loadUsersTable();
        } else {
          alert(result.message);
        }
      }
    });
  }
});
