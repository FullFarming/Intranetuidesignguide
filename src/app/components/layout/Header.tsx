import { useState } from 'react';
import { Bell, Search, ChevronDown, Menu, X, Settings, LogOut, User, Check } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';

interface HeaderProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

export function Header({ onMenuToggle, sidebarOpen }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const notifTypeIcon = (type: string) => {
    switch (type) {
      case 'approved': return <span style={{ color: '#409D82' }}>✓</span>;
      case 'rejected': return <span style={{ color: '#FF6B8A' }}>✗</span>;
      case 'completed': return <span style={{ color: '#40AEC2' }}>●</span>;
      default: return <span style={{ color: '#F1B434' }}>ℹ</span>;
    }
  };

  return (
    <header
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '64px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '64px', padding: '0 20px', gap: '16px' }}>
        {/* Menu Toggle — visible on all breakpoints */}
        <button
          onClick={onMenuToggle}
          style={{
            background: sidebarOpen ? 'rgba(29,23,64,0.08)' : 'rgba(0,0,0,0.04)',
            border: `1px solid ${sidebarOpen ? 'rgba(29,23,64,0.2)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: '8px',
            color: '#1D1740',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s',
          }}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
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
              fontSize: '14px',
              color: '#fff',
              letterSpacing: '0.5px',
            }}
          >
            C&W
          </div>
          <div className="hidden sm:block">
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D1740', lineHeight: 1.2 }}>
              Cushman & Wakefield
            </div>
            <div style={{ fontSize: '0.7rem', color: '#9898A8', lineHeight: 1.2 }}>
              Korea Intranet
            </div>
          </div>
        </div>

        {/* Search */}
        <div
          style={{
            flex: 1,
            maxWidth: '480px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: searchFocused ? '#FFFFFF' : '#F3F3F8',
              border: `1.5px solid ${searchFocused ? '#1D1740' : 'rgba(0,0,0,0.1)'}`,
              borderRadius: '10px',
              padding: '0 12px',
              height: '38px',
              gap: '8px',
              transition: 'all 0.2s',
              boxShadow: searchFocused ? '0 0 0 3px rgba(29,23,64,0.08)' : 'none',
            }}
          >
            <Search size={15} color={searchFocused ? '#1D1740' : '#9898A8'} />
            <input
              type="text"
              placeholder="신청 내역, 매뉴얼 검색..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#1D1740',
                fontSize: '0.875rem',
                width: '100%',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              style={{
                background: notifOpen ? 'rgba(29,23,64,0.08)' : 'rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '10px',
                color: '#1D1740',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s',
              }}
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '7px',
                    right: '7px',
                    background: '#E4002B',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    border: '1.5px solid #fff',
                  }}
                />
              )}
            </button>

            {notifOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  width: '340px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '14px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                  zIndex: 100,
                }}
              >
                <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1D1740' }}>알림</span>
                  <span style={{ fontSize: '0.75rem', color: '#0093AD', cursor: 'pointer' }}>모두 읽음</span>
                </div>
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '12px 16px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      background: n.read ? 'transparent' : '#F8F8FC',
                      borderBottom: '1px solid rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span style={{ fontSize: '1rem', marginTop: '1px' }}>{notifTypeIcon(n.type)}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.8125rem', color: n.read ? '#6B6B80' : '#1D1740', lineHeight: 1.4 }}>{n.message}</p>
                      <p style={{ fontSize: '0.725rem', color: '#9898A8', marginTop: '3px' }}>{n.time}</p>
                    </div>
                    {!n.read && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E4002B', flexShrink: 0, marginTop: '5px' }} />}
                  </div>
                ))}
                <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#0093AD', cursor: 'pointer' }}>전체 알림 보기</span>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              style={{
                background: profileOpen ? 'rgba(29,23,64,0.08)' : 'rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '10px',
                color: '#1D1740',
                height: '38px',
                padding: '0 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0093AD, #007C58)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                N
              </div>
              <span className="hidden sm:block" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1D1740' }}>Noel Kim</span>
              <ChevronDown size={13} style={{ opacity: 0.4, color: '#1D1740' }} />
            </button>

            {profileOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  width: '210px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '14px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                  zIndex: 100,
                }}
              >
                <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1D1740' }}>Noel Kim</p>
                  <p style={{ fontSize: '0.75rem', color: '#6B6B80', marginTop: '2px' }}>WPR팀</p>
                </div>
                {[
                  { icon: <User size={14} />, label: '프로필 관리' },
                  { icon: <Settings size={14} />, label: '알림 설정' },
                  { icon: <Check size={14} />, label: '나의 신청 현황' },
                ].map((item, i) => (
                  <button
                    key={i}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: '#3A3A50',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F5F5FA')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                  <button
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: '#E4002B',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }}
                  >
                    <LogOut size={14} />
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      {(notifOpen || profileOpen) && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 49 }}
          onClick={() => { setNotifOpen(false); setProfileOpen(false); }}
        />
      )}
    </header>
  );
}