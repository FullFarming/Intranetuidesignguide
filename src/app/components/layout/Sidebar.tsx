import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard, Flower2, Package, Car, CreditCard, FileText,
  Wrench, BookOpen, MessageSquare, Settings, User, ChevronDown, ChevronRight,
  ListChecks, Shield,
} from 'lucide-react';
import { useState } from 'react';
import { currentUser } from '../../data/mockData';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuGroups = [
  {
    label: '홈',
    items: [
      { icon: <LayoutDashboard size={17} />, label: '대시보드', path: '/' },
      { icon: <ListChecks size={17} />, label: '나의 신청 현황', path: '/my-requests' },
    ],
  },
  {
    label: '신청 서비스',
    items: [
      { icon: <Flower2 size={17} />, label: '화환 신청', path: '/wreath' },
      { icon: <Package size={17} />, label: '사무용품 신청', path: '/supplies' },
      { icon: <Car size={17} />, label: '법인차량 예약', path: '/vehicle' },
      { icon: <CreditCard size={17} />, label: '명함 신청', path: '/business-card' },
      { icon: <FileText size={17} />, label: '법인 문서 요청', path: '/document' },
    ],
  },
  {
    label: '지원 서비스',
    items: [
      { icon: <Wrench size={17} />, label: '고장 신고', path: '/facility' },
      { icon: <BookOpen size={17} />, label: '매뉴얼', path: '/manuals' },
      { icon: <MessageSquare size={17} />, label: '문의하기', path: '/inquiry' },
    ],
  },
  {
    label: '설정',
    items: [
      { icon: <User size={17} />, label: '프로필 관리', path: '/profile' },
      { icon: <Settings size={17} />, label: '알림 설정', path: '/settings' },
    ],
  },
];

// Admin menu (only for admin users)
const adminMenuGroup = {
  label: '관리자',
  adminOnly: true,
  items: [
    { icon: <Shield size={17} />, label: '관리자 대시보드', path: '/admin' },
  ],
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const sidebarContent = (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Logo area (desktop) */}
      <div
        className="hidden lg:flex"
        style={{
          height: '64px',
          alignItems: 'center',
          padding: '0 20px',
          gap: '12px',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            background: '#E4002B',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '13px',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          C&W
        </div>
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1D1740', lineHeight: 1.2 }}>Cushman & Wakefield</div>
          <div style={{ fontSize: '0.7rem', color: '#9898A8', lineHeight: 1.2 }}>Korea Intranet</div>
        </div>
      </div>

      {/* User Info Card */}
      <div
        style={{
          margin: '16px 14px',
          padding: '12px 14px',
          background: '#F5F5FA',
          borderRadius: '12px',
          border: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0093AD, #007C58)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            N
          </div>
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1D1740', lineHeight: 1.3 }}>Noel Kim</p>
            <p style={{ fontSize: '0.7rem', color: '#6B6B80', lineHeight: 1.3 }}>WPR팀</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: '0 10px 20px' }}>
        {menuGroups.map((group) => (
          <div key={group.label} style={{ marginBottom: '6px' }}>
            <button
              onClick={() => toggleGroup(group.label)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B0B0C0', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {group.label}
              </span>
              <span style={{ color: '#C0C0D0' }}>
                {collapsed[group.label] ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
              </span>
            </button>

            {!collapsed[group.label] && (
              <div>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: '9px',
                        marginBottom: '2px',
                        textDecoration: 'none',
                        color: isActive ? '#E4002B' : '#4A4A60',
                        fontSize: '0.8375rem',
                        fontWeight: isActive ? 700 : 400,
                        background: isActive ? 'rgba(228,0,43,0.07)' : 'transparent',
                        borderLeft: isActive ? '3px solid #E4002B' : '3px solid transparent',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = '#F3F3F8';
                          e.currentTarget.style.color = '#1D1740';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#4A4A60';
                        }
                      }}
                    >
                      <span style={{ opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Admin menu (only for admin users) */}
        {currentUser.role === 'admin' && (
          <div key={adminMenuGroup.label} style={{ marginBottom: '6px' }}>
            <button
              onClick={() => toggleGroup(adminMenuGroup.label)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B0B0C0', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {adminMenuGroup.label}
              </span>
              <span style={{ color: '#C0C0D0' }}>
                {collapsed[adminMenuGroup.label] ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
              </span>
            </button>

            {!collapsed[adminMenuGroup.label] && (
              <div>
                {adminMenuGroup.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: '9px',
                        marginBottom: '2px',
                        textDecoration: 'none',
                        color: isActive ? '#E4002B' : '#4A4A60',
                        fontSize: '0.8375rem',
                        fontWeight: isActive ? 700 : 400,
                        background: isActive ? 'rgba(228,0,43,0.07)' : 'transparent',
                        borderLeft: isActive ? '3px solid #E4002B' : '3px solid transparent',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = '#F3F3F8';
                          e.currentTarget.style.color = '#1D1740';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#4A4A60';
                        }
                      }}
                    >
                      <span style={{ opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <p style={{ fontSize: '0.7rem', color: '#C0C0CC', textAlign: 'center' }}>
          © 2026 Cushman & Wakefield Korea
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:block"
        style={{
          width: '260px',
          background: '#FFFFFF',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 40,
          transform: open ? 'translateX(0)' : 'translateX(-260px)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: open ? '4px 0 24px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <aside
        className="lg:hidden"
        style={{
          width: '260px',
          background: '#FFFFFF',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 40,
          transform: open ? 'translateX(0)' : 'translateX(-260px)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: open ? '4px 0 32px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        {/* Mobile close button */}
        <div style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '28px', height: '28px', background: '#E4002B', borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 700, color: '#fff',
            }}>C&W</div>
            <span style={{ fontWeight: 700, color: '#1D1740', fontSize: '0.875rem' }}>메뉴</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F3F3F8',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '8px',
              color: '#1D1740',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ height: 'calc(100% - 64px)', overflowY: 'auto' }}>
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}