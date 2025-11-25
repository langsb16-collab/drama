import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes will be added here

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#FF6B35">
        <title>전라도 로컬 미식 슈퍼로드 - 맛집·축제·여행 올인원 플랫폼</title>
        
        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- Font Awesome -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        
        <style>
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
            margin: 0;
            padding: 0;
          }
          
          .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          }
          
          .gradient-orange-soft {
            background: linear-gradient(135deg, #FFB399 0%, #FFCC99 100%);
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          .loading-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          .feature-card {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(255, 107, 53, 0.2);
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="gradient-orange text-white py-6">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-utensils text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold">전라도 로컬 미식 슈퍼로드</h1>
                            <p class="text-sm opacity-90">Jeonlado Local Food Superroad</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm">🇰🇷 한국어</span>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Hero Section -->
        <section class="gradient-orange-soft py-20 text-center">
            <div class="container mx-auto px-4">
                <div class="loading-pulse mb-6">
                    <i class="fas fa-spinner fa-spin text-6xl text-orange-600"></i>
                </div>
                <h2 class="text-4xl font-bold text-gray-800 mb-4">프로젝트 로딩 중...</h2>
                <p class="text-xl text-gray-700 mb-8">전라도의 모든 맛과 여행을 한 곳에.</p>
                <p class="text-lg text-gray-600">맛집·축제·촬영지·숙박·농협까지, 전라도 생활지도의 새로운 기준</p>
            </div>
        </section>
        
        <!-- Features Preview -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <h3 class="text-3xl font-bold text-center text-gray-800 mb-12">
                    <i class="fas fa-star text-orange-500 mr-2"></i>
                    주요 기능
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Feature 1 -->
                    <div class="feature-card text-center">
                        <div class="mb-4">
                            <i class="fas fa-utensils text-5xl text-orange-500"></i>
                        </div>
                        <h4 class="text-xl font-bold text-gray-800 mb-2">53+ 드라마 촬영지</h4>
                        <p class="text-gray-600">오신의 사랑한 맛을 찾고 시군구별 정렬하세요</p>
                    </div>
                    
                    <!-- Feature 2 -->
                    <div class="feature-card text-center">
                        <div class="mb-4">
                            <i class="fas fa-calendar-alt text-5xl text-orange-500"></i>
                        </div>
                        <h4 class="text-xl font-bold text-gray-800 mb-2">30+ 지역 축제</h4>
                        <p class="text-gray-600">연중의 특별한 주를 경험하세요</p>
                    </div>
                    
                    <!-- Feature 3 -->
                    <div class="feature-card text-center">
                        <div class="mb-4">
                            <i class="fas fa-plane text-5xl text-orange-500"></i>
                        </div>
                        <h4 class="text-xl font-bold text-gray-800 mb-2">32+ 맞춤 여행사</h4>
                        <p class="text-gray-600">전문 가이드와 함께하는 특별한 여행</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Stats Section -->
        <section class="gradient-orange text-white py-16">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <i class="fas fa-map-marked-alt text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">200+</p>
                        <p class="text-lg opacity-90">전라도 맛집</p>
                    </div>
                    <div>
                        <i class="fas fa-calendar-star text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">30+</p>
                        <p class="text-lg opacity-90">지역 축제</p>
                    </div>
                    <div>
                        <i class="fas fa-film text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">50+</p>
                        <p class="text-lg opacity-90">한류 촬영지</p>
                    </div>
                    <div>
                        <i class="fas fa-hotel text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">100+</p>
                        <p class="text-lg opacity-90">숙박업소</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- CTA Section -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-4 text-center">
                <h3 class="text-3xl font-bold text-gray-800 mb-4">배달 수수료 0원!</h3>
                <p class="text-xl text-gray-600 mb-8">사장님 부담 없는 배달, 지금 무료로 입점하세요</p>
                <button class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl">
                    <i class="fas fa-store mr-2"></i>
                    가맹점 신청하기
                </button>
            </div>
        </section>
        
        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8">
            <div class="container mx-auto px-4 text-center">
                <p class="text-lg font-bold mb-2">전라도 로컬 미식 슈퍼로드</p>
                <p class="text-sm opacity-75">맛·여행·축제·촬영지까지, 전라도를 완성하는 단 하나의 슈퍼앱</p>
                <p class="text-sm opacity-75 mt-4">© 2024 Jeonlado Superroad. All rights reserved.</p>
            </div>
        </footer>
    </body>
    </html>
  `)
})

export default app
