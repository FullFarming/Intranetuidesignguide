import { Link, useLocation } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

const routeMap: Record<string, string> = {
  '/': '대시보드',
  '/wreath': '화환 신청',
  '/supplies': '사무용품 신청',
  '/vehicle': '법인차량 예약',
  '/business-card': '명함 신청',
  '/document': '법인 문서 요청',
  '/facility': '고장 신고',
  '/manuals': '매뉴얼',
  '/inquiry': '문의하기',
  '/my-requests': '나의 신청 현황',
  '/profile': '프로필 관리',
  '/settings': '알림 설정',
};

const categoryMap: Record<string, string> = {
  '/wreath': '신청 서비스',
  '/supplies': '신청 서비스',
  '/vehicle': '신청 서비스',
  '/business-card': '신청 서비스',
  '/document': '신청 서비스',
  '/facility': '지원 서비스',
  '/manuals': '지원 서비스',
  '/inquiry': '지원 서비스',
  '/my-requests': '홈',
  '/profile': '설정',
  '/settings': '설정',
};

export function Breadcrumb() {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/') return null;

  const pageName = routeMap[path] || path;
  const category = categoryMap[path];

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '20px',
        fontSize: '0.8rem',
        color: '#9898A8',
      }}
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        style={{
          color: '#9898A8',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#0093AD')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#9898A8')}
      >
        <Home size={12} />
        홈
      </Link>

      {category && (
        <>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: '#B0B0BC' }}>{category}</span>
        </>
      )}

      <ChevronRight size={12} style={{ opacity: 0.5 }} />
      <span style={{ color: '#1D1740', fontWeight: 600 }}>{pageName}</span>
    </nav>
  );
}
