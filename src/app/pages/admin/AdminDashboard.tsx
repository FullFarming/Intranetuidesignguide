import { useNavigate } from 'react-router';
import { Shield, Users, FileText, CheckSquare, HelpCircle, BarChart3 } from 'lucide-react';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { mockRequests, currentUser } from '../../data/mockData';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  // 권한 체크
  if (currentUser.role !== 'admin') {
    return (
      <div style={{ maxWidth: '480px', margin: '80px auto', textAlign: 'center' }}>
        <div style={cardStyle}>
          <Shield size={48} color="#E4002B" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D1740', marginBottom: '8px' }}>접근 권한 없음</h2>
          <p style={{ fontSize: '0.875rem', color: '#6B6B80' }}>관리자 권한이 필요한 페이지입니다.</p>
        </div>
      </div>
    );
  }

  const pendingRequests = mockRequests.filter(r => r.status === 'pending').length;
  const todayRequests = mockRequests.filter(r => r.createdAt === '2026-02-22').length;

  const adminMenus = [
    {
      id: 'approvals',
      title: '승인 관리',
      desc: '신청 승인/거부',
      icon: CheckSquare,
      color: '#0093AD',
      bg: 'rgba(0,147,173,0.1)',
      count: pendingRequests,
      path: '/admin/approvals',
    },
    {
      id: 'users',
      title: '사용자 관리',
      desc: '신규 등록 및 권한 관리',
      icon: Users,
      color: '#1D1740',
      bg: 'rgba(29,23,64,0.1)',
      path: '/admin/users',
    },
    {
      id: 'manuals',
      title: '매뉴얼 관리',
      desc: '문서 수정/삭제/등록',
      icon: FileText,
      color: '#007C58',
      bg: 'rgba(0,124,88,0.1)',
      path: '/admin/manuals',
    },
    {
      id: 'faqs',
      title: 'FAQ 관리',
      desc: 'Q&A 수정/삭제/등록',
      icon: HelpCircle,
      color: '#F1B434',
      bg: 'rgba(241,180,52,0.1)',
      path: '/admin/faqs',
    },
  ];

  return (
    <div>
      <Breadcrumb />
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Shield size={24} color="#1D1740" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1740' }}>관리자 대시보드</h1>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#6B6B80' }}>시스템 전체를 관리하고 승인 처리를 진행하세요</p>
      </div>

      {/* Stats Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ ...cardStyle, border: '1.5px solid rgba(228,0,43,0.2)', background: 'rgba(228,0,43,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#6B6B80', marginBottom: '4px' }}>대기중 승인</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: '#E4002B' }}>{pendingRequests}</p>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(228,0,43,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckSquare size={20} color="#E4002B" />
            </div>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#9898A8' }}>처리 필요</p>
        </div>

        <div style={{ ...cardStyle, border: '1.5px solid rgba(0,147,173,0.2)', background: 'rgba(0,147,173,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#6B6B80', marginBottom: '4px' }}>금일 신청</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: '#0093AD' }}>{todayRequests}</p>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,147,173,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={20} color="#0093AD" />
            </div>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#9898A8' }}>오늘 접수 건수</p>
        </div>

        <div style={{ ...cardStyle, border: '1.5px solid rgba(0,124,88,0.2)', background: 'rgba(0,124,88,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#6B6B80', marginBottom: '4px' }}>전체 신청</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: '#007C58' }}>{mockRequests.length}</p>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,124,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} color="#007C58" />
            </div>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#9898A8' }}>누적 신청 건수</p>
        </div>
      </div>

      {/* Admin Menus */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740', marginBottom: '16px' }}>관리 메뉴</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {adminMenus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => navigate(menu.path)}
              style={{
                background: menu.bg,
                border: 'none',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <menu.icon size={22} color={menu.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740' }}>{menu.title}</h3>
                    {menu.count !== undefined && menu.count > 0 && (
                      <span style={{ fontSize: '0.7rem', background: '#E4002B', color: '#fff', borderRadius: '100px', padding: '2px 7px', fontWeight: 700 }}>{menu.count}</span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#6B6B80', lineHeight: 1.4 }}>{menu.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
