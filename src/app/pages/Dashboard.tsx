import { Link, useNavigate } from 'react-router';
import {
  Flower2, Package, Car, CreditCard, FileText, Wrench,
  ChevronRight, Clock, CheckCircle, XCircle, AlertCircle,
  Calendar, BookOpen, MessageSquare, Bell,
  BarChart2, ArrowUpRight, User,
} from 'lucide-react';
import { mockRequests, mockNotifications, mockStats, mockManuals, mockFAQs, vehicleCalendarEvents } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'motion/react';

const quickActions = [
  { icon: <Flower2 size={20} />, label: '화환 신청', path: '/wreath', color: '#E4002B', bg: 'rgba(228,0,43,0.08)', border: 'rgba(228,0,43,0.2)' },
  { icon: <Package size={20} />, label: '사무용품', path: '/supplies', color: '#C27A00', bg: 'rgba(241,180,52,0.1)', border: 'rgba(241,180,52,0.3)' },
  { icon: <Car size={20} />, label: '법인차량', path: '/vehicle', color: '#006B80', bg: 'rgba(0,147,173,0.08)', border: 'rgba(0,147,173,0.25)' },
  { icon: <CreditCard size={20} />, label: '명함 신청', path: '/business-card', color: '#00613E', bg: 'rgba(0,124,88,0.08)', border: 'rgba(0,124,88,0.25)' },
  { icon: <FileText size={20} />, label: '법인 문서', path: '/document', color: '#1D1740', bg: 'rgba(29,23,64,0.06)', border: 'rgba(29,23,64,0.15)' },
  { icon: <Wrench size={20} />, label: '고장 신고', path: '/facility', color: '#8B5A00', bg: 'rgba(241,180,52,0.1)', border: 'rgba(241,180,52,0.3)' },
];

const chartData = [
  { month: '9월', requests: 8 },
  { month: '10월', requests: 12 },
  { month: '11월', requests: 9 },
  { month: '12월', requests: 15 },
  { month: '1월', requests: 11 },
  { month: '2월', requests: 14 },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    pending: 'badge-pending',
    approved: 'badge-approved',
    rejected: 'badge-rejected',
    completed: 'badge-completed',
  };
  const label: Record<string, string> = {
    pending: '대기 중', approved: '승인', rejected: '반려', completed: '완료',
  };
  return <span className={map[status]}>{label[status]}</span>;
};

const card: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

// Calendar helpers
const today = new Date(2026, 1, 20);
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

function MiniCalendar() {
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const eventDates = vehicleCalendarEvents.map((e) => parseInt(e.date.split('-')[2]));

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '6px' }}>
        {daysOfWeek.map((d, i) => (
          <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', color: i === 0 ? '#E4002B' : i === 6 ? '#0093AD' : '#9898A8', padding: '4px 0', fontWeight: 600 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {cells.map((day, idx) => (
          <div
            key={idx}
            style={{
              textAlign: 'center',
              padding: '5px 2px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              cursor: day ? 'pointer' : 'default',
              background: day === today.getDate() ? '#E4002B' : eventDates.includes(day!) ? 'rgba(0,147,173,0.1)' : 'transparent',
              color: day === today.getDate() ? '#fff' : eventDates.includes(day!) ? '#006B80' : day ? '#1D1740' : 'transparent',
              fontWeight: day === today.getDate() ? 700 : 400,
            }}
          >
            {day || ''}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {vehicleCalendarEvents.slice(0, 3).map((ev, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0093AD', flexShrink: 0 }} />
            <span style={{ fontSize: '0.7rem', color: '#6B6B80', whiteSpace: 'nowrap' }}>{ev.date.slice(5)} {ev.time}</span>
            <span style={{ fontSize: '0.7rem', color: '#9898A8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.destination}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const pendingRequests = mockRequests.filter((r) => r.status === 'pending');

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: '24px' }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1740', lineHeight: 1.3 }}>
          안녕하세요, Noel Kim 님 👋
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#6B6B80', marginTop: '4px' }}>
          2026년 2월 20일 금요일 · 오늘도 좋은 하루 보내세요.
        </p>
      </motion.div>

      {/* Row 1: Quick Actions + Pending + Notifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-4">
        {/* Quick Actions — 3 cols */}
        <motion.div
          className="lg:col-span-3"
          style={card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
        >
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: 'rgba(228,0,43,0.1)', borderRadius: '7px', padding: '4px', display: 'inline-flex' }}><ArrowUpRight size={14} color="#E4002B" /></span>
            빠른 신청
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                style={{
                  background: action.bg,
                  border: `1px solid ${action.border}`,
                  borderRadius: '12px',
                  padding: '14px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${action.color}20`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ color: action.color }}>{action.icon}</span>
                <span style={{ fontSize: '0.7rem', color: '#3A3A50', fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pending Approvals — 3 cols */}
        <motion.div
          className="lg:col-span-3"
          style={card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: 'rgba(241,180,52,0.12)', borderRadius: '7px', padding: '4px', display: 'inline-flex' }}><AlertCircle size={14} color="#C27A00" /></span>
              승인 대기
            </h2>
            <span style={{ background: '#FFF8E0', color: '#C27A00', border: '1px solid #F1B434', borderRadius: '100px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 700 }}>{pendingRequests.length}건</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {pendingRequests.slice(0, 3).map((req) => (
              <div key={req.id} style={{ background: '#F8F8FC', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.775rem', color: '#1D1740', fontWeight: 600, lineHeight: 1.3 }}>{req.title}</span>
                  {statusBadge(req.status)}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#6B6B80' }}>{req.typeLabel}</span>
                  <span style={{ fontSize: '0.7rem', color: '#C0C0CC' }}>·</span>
                  <span style={{ fontSize: '0.7rem', color: '#9898A8' }}>{req.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/my-requests" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '12px', fontSize: '0.8rem', color: '#0093AD', textDecoration: 'none' }}>
            전체 보기 <ChevronRight size={14} />
          </Link>
        </motion.div>

        {/* Notifications — 6 cols */}
        <motion.div
          className="sm:col-span-2 lg:col-span-6"
          style={card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: 'rgba(0,147,173,0.1)', borderRadius: '7px', padding: '4px', display: 'inline-flex' }}><Bell size={14} color="#0093AD" /></span>
              최근 알림
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#0093AD', cursor: 'pointer' }}>전체 읽음</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {mockNotifications.map((n) => {
              const iconMap: Record<string, React.ReactNode> = {
                approved: <CheckCircle size={15} color="#007C58" />,
                rejected: <XCircle size={15} color="#E4002B" />,
                completed: <CheckCircle size={15} color="#0093AD" />,
                info: <Bell size={15} color="#C27A00" />,
              };
              return (
                <div key={n.id} style={{ display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: n.read ? 'transparent' : '#F8F8FC', border: n.read ? '1px solid transparent' : '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F5F5FA')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = n.read ? 'transparent' : '#F8F8FC')}
                >
                  <span style={{ flexShrink: 0, marginTop: '1px' }}>{iconMap[n.type]}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.8125rem', color: n.read ? '#6B6B80' : '#1D1740', lineHeight: 1.4 }}>{n.message}</p>
                    <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '2px' }}>{n.time}</p>
                  </div>
                  {!n.read && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#E4002B', flexShrink: 0, marginTop: '4px' }} />}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Row 2: Recent Requests + Stats + Calendar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-4">
        {/* Recent Requests — 6 cols */}
        <motion.div
          className="sm:col-span-2 lg:col-span-6"
          style={card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: 'rgba(0,124,88,0.1)', borderRadius: '7px', padding: '4px', display: 'inline-flex' }}><FileText size={14} color="#007C58" /></span>
              최근 신청 내역
            </h2>
            <Link to="/my-requests" style={{ fontSize: '0.75rem', color: '#0093AD', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}>
              전체 보 <ChevronRight size={13} />
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['신청 번호', '구분', '제목', '상태', '날짜'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: '0.72rem', color: '#9898A8', fontWeight: 600, whiteSpace: 'nowrap', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockRequests.slice(0, 5).map((req, i) => (
                  <tr
                    key={req.id}
                    style={{ borderBottom: i < 4 ? '1px solid rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F8F8FC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '10px 10px', fontSize: '0.75rem', color: '#0093AD', whiteSpace: 'nowrap' }}>{req.id}</td>
                    <td style={{ padding: '10px 10px', fontSize: '0.75rem', color: '#6B6B80', whiteSpace: 'nowrap' }}>{req.typeLabel}</td>
                    <td style={{ padding: '10px 10px', fontSize: '0.775rem', color: '#1D1740', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.title}</td>
                    <td style={{ padding: '10px 10px', whiteSpace: 'nowrap' }}>{statusBadge(req.status)}</td>
                    <td style={{ padding: '10px 10px', fontSize: '0.72rem', color: '#9898A8', whiteSpace: 'nowrap' }}>{req.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Stats — 3 cols */}
        <motion.div
          className="lg:col-span-3"
          style={card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: 'rgba(0,147,173,0.1)', borderRadius: '7px', padding: '4px', display: 'inline-flex' }}><BarChart2 size={14} color="#0093AD" /></span>
            이번 달 통계
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: '총 신청 건수', value: `${mockStats.thisMonthRequests}건`, color: '#0093AD', change: '+2' },
              { label: '승인율', value: `${mockStats.approvalRate}%`, color: '#007C58', change: '+3%' },
              { label: '평균 처리 기간', value: `${mockStats.avgProcessingDays}일`, color: '#C27A00', change: '-0.2일' },
              { label: '대기 중', value: `${mockStats.pendingCount}건`, color: '#C27A00', change: '' },
            ].map((stat, i) => (
              <div key={i} style={{ background: '#F8F8FC', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.72rem', color: '#9898A8', marginBottom: '2px' }}>{stat.label}</p>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, color: stat.color }}>{stat.value}</p>
                </div>
                {stat.change && (
                  <span style={{ fontSize: '0.72rem', color: '#007C58', background: 'rgba(0,124,88,0.1)', borderRadius: '6px', padding: '2px 7px', fontWeight: 600 }}>{stat.change}</span>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '12px' }}>
            <p style={{ fontSize: '0.72rem', color: '#9898A8', marginBottom: '6px' }}>월별 신청 추이</p>
            <ResponsiveContainer width="100%" height={55}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0093AD" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0093AD" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', fontSize: '0.75rem', color: '#1D1740', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(v) => [`${v}건`]}
                />
                <Area type="monotone" dataKey="requests" stroke="#0093AD" strokeWidth={2} fill="url(#reqGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Calendar — 3 cols */}
        <motion.div
          className="lg:col-span-3"
          style={card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: 'rgba(241,180,52,0.15)', borderRadius: '7px', padding: '4px', display: 'inline-flex' }}><Calendar size={14} color="#C27A00" /></span>
            2026년 2월
          </h2>
          <MiniCalendar />
        </motion.div>
      </div>

      {/* Row 3: Manuals & FAQ — full width */}
      <motion.div
        style={card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: 'rgba(0,124,88,0.1)', borderRadius: '7px', padding: '4px', display: 'inline-flex' }}><BookOpen size={14} color="#007C58" /></span>
            매뉴얼 & FAQ
          </h2>
          <Link to="/manuals" style={{ fontSize: '0.75rem', color: '#0093AD', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}>
            전체 보기 <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Manuals */}
          <div>
            <p style={{ fontSize: '0.78rem', color: '#9898A8', marginBottom: '10px', fontWeight: 600 }}>인기 매뉴얼</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {mockManuals.slice(0, 3).map((m) => (
                <div
                  key={m.id}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8F8FC', borderRadius: '10px', padding: '10px 14px', border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F0F0F8'; e.currentTarget.style.borderColor = 'rgba(0,147,173,0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#F8F8FC'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; }}
                >
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <BookOpen size={14} color="#0093AD" />
                    <div>
                      <p style={{ fontSize: '0.8125rem', color: '#1D1740', fontWeight: 500 }}>{m.title}</p>
                      <p style={{ fontSize: '0.7rem', color: '#9898A8' }}>{m.category} · 조회 {m.views}</p>
                    </div>
                  </div>
                  <ChevronRight size={14} color="#C0C0CC" />
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <p style={{ fontSize: '0.78rem', color: '#9898A8', marginBottom: '10px', fontWeight: 600 }}>자주 묻는 질문</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {mockFAQs.map((f) => (
                <div
                  key={f.id}
                  style={{ background: '#F8F8FC', borderRadius: '10px', padding: '10px 14px', border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F0F0F8')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#F8F8FC')}
                >
                  <p style={{ fontSize: '0.8125rem', color: '#1D1740', marginBottom: '4px', fontWeight: 500 }}>Q. {f.question}</p>
                  <p style={{ fontSize: '0.775rem', color: '#6B6B80' }}>A. {f.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact */}
          <div>
            <p style={{ fontSize: '0.78rem', color: '#9898A8', marginBottom: '10px', fontWeight: 600 }}>빠른 문의</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { dept: '총무팀', name: 'Sarah Lee', desc: '사무용품, 화환, 차량' },
                { dept: '인사팀', name: 'Noel Kim', desc: '명함, 법인 문서' },
                { dept: 'IT 헬프데스크', name: 'David Park', desc: '장비, 시스템 문의' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8F8FC', borderRadius: '10px', padding: '10px 14px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <MessageSquare size={14} color="#C27A00" />
                    <div>
                      <p style={{ fontSize: '0.8125rem', color: '#1D1740', fontWeight: 600 }}>{c.dept}</p>
                      <p style={{ fontSize: '0.7rem', color: '#9898A8' }}>{c.desc}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={13} color="#0093AD" />
                    <span style={{ fontSize: '0.75rem', color: '#0093AD', fontWeight: 700 }}>{c.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}