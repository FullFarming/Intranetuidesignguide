import { useState } from 'react';
import { ArrowLeft, Search, Filter, ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { mockRequests } from '../data/mockData';
import { Breadcrumb } from '../components/layout/Breadcrumb';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

export default function MyRequests() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [selected, setSelected] = useState<string | null>(null);

  const statuses = ['전체', '대기 중', '승인', '반려', '완료'];
  const types = ['전체', '화환 신청', '사무용품', '법인차량', '명함 신청', '법인 문서', '고장 신고'];

  const statusMap: Record<string, string> = {
    pending: '대기 중', approved: '승인', rejected: '반려', completed: '완료',
  };

  const filtered = mockRequests.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === '전체' || statusMap[r.status] === statusFilter;
    const matchType = typeFilter === '전체' || r.typeLabel === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, { label: string; color: string; bg: string; border: string }> = {
      pending: { label: '대기 중', color: '#C27A00', bg: '#FFF8E0', border: '#F1B434' },
      approved: { label: '승인', color: '#00613E', bg: '#E5F5EF', border: '#007C58' },
      rejected: { label: '반려', color: '#B8001F', bg: '#FEEAED', border: '#E4002B' },
      completed: { label: '완료', color: '#00607A', bg: '#E0F4F8', border: '#0093AD' },
    };
    const s = map[status];
    return <span style={{ fontSize: '0.75rem', background: s.bg, color: s.color, borderRadius: '100px', padding: '3px 10px', fontWeight: 700, whiteSpace: 'nowrap', border: `1px solid ${s.border}` }}>{s.label}</span>;
  };

  const statusIcon = (status: string) => {
    if (status === 'pending') return <Clock size={14} color="#C27A00" />;
    if (status === 'approved') return <CheckCircle size={14} color="#007C58" />;
    if (status === 'rejected') return <XCircle size={14} color="#E4002B" />;
    return <CheckCircle size={14} color="#0093AD" />;
  };

  const stats = {
    total: mockRequests.length,
    pending: mockRequests.filter((r) => r.status === 'pending').length,
    approved: mockRequests.filter((r) => r.status === 'approved').length,
    completed: mockRequests.filter((r) => r.status === 'completed').length,
  };

  const selectedReq = mockRequests.find((r) => r.id === selected);

  return (
    <div>
      <Breadcrumb />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate('/')} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#1D1740', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740' }}>나의 신청 현황</h1>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>신청 내역을 확인하고 관리하세요</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: '전체 신청', value: stats.total, color: '#0093AD', bg: 'rgba(0,147,173,0.08)' },
          { label: '대기 중', value: stats.pending, color: '#C27A00', bg: 'rgba(241,180,52,0.1)' },
          { label: '승인', value: stats.approved, color: '#007C58', bg: 'rgba(0,124,88,0.08)' },
          { label: '완료', value: stats.completed, color: '#1D1740', bg: 'rgba(29,23,64,0.05)' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#FFFFFF', borderRadius: '14px', padding: '16px', border: '1px solid rgba(0,0,0,0.07)', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color, lineHeight: 1.2 }}>{s.value}</p>
            <p style={{ fontSize: '0.775rem', color: '#9898A8', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className={selected ? 'two-col-layout' : ''} style={selected ? undefined : { display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* List */}
        <div style={cardStyle}>
          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: '#F3F3F8', borderRadius: '10px', padding: '0 12px', border: '1.5px solid rgba(0,0,0,0.1)' }}>
              <Search size={14} color="#9898A8" />
              <input type="text" placeholder="신청 번호 또는 제목 검색..." value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#1D1740', fontSize: '0.875rem', height: '40px', width: '100%', fontFamily: 'inherit' }} />
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Filter size={14} color="#9898A8" />
              {statuses.map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)} style={{ background: statusFilter === s ? '#1D1740' : '#F3F3F8', border: `1px solid ${statusFilter === s ? '#1D1740' : 'rgba(0,0,0,0.1)'}`, borderRadius: '7px', color: statusFilter === s ? '#fff' : '#6B6B80', padding: '5px 11px', fontSize: '0.775rem', fontWeight: statusFilter === s ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {types.map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)} style={{ background: typeFilter === t ? 'rgba(0,147,173,0.1)' : 'transparent', border: `1px solid ${typeFilter === t ? 'rgba(0,147,173,0.3)' : 'rgba(0,0,0,0.07)'}`, borderRadius: '6px', color: typeFilter === t ? '#006B80' : '#9898A8', padding: '4px 10px', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', fontWeight: typeFilter === t ? 600 : 400 }}>
                {t}
              </button>
            ))}
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#C0C0CC' }}>
                <p>검색 결과가 없습니다.</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    {['신청 번호', '구분', '제목', '담당자', '상태', '신청일', ''].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.72rem', color: '#9898A8', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((req, i) => (
                    <tr key={req.id} onClick={() => setSelected(selected === req.id ? null : req.id)}
                      style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', background: selected === req.id ? '#F3F3F8' : 'transparent', transition: 'background 0.15s' }}
                      onMouseEnter={(e) => { if (selected !== req.id) e.currentTarget.style.background = '#F8F8FC'; }}
                      onMouseLeave={(e) => { if (selected !== req.id) e.currentTarget.style.background = 'transparent'; }}>
                      <td style={{ padding: '12px 12px', fontSize: '0.775rem', color: '#0093AD', whiteSpace: 'nowrap', fontWeight: 600 }}>{req.id}</td>
                      <td style={{ padding: '12px 12px', fontSize: '0.775rem', color: '#6B6B80', whiteSpace: 'nowrap' }}>{req.typeLabel}</td>
                      <td style={{ padding: '12px 12px', fontSize: '0.8125rem', color: '#1D1740', maxWidth: '200px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{req.title}</div>
                      </td>
                      <td style={{ padding: '12px 12px', fontSize: '0.775rem', color: '#6B6B80', whiteSpace: 'nowrap' }}>{req.requester}</td>
                      <td style={{ padding: '12px 12px', whiteSpace: 'nowrap' }}>{statusBadge(req.status)}</td>
                      <td style={{ padding: '12px 12px', fontSize: '0.72rem', color: '#9898A8', whiteSpace: 'nowrap' }}>{req.createdAt}</td>
                      <td style={{ padding: '12px 12px' }}>
                        <ChevronRight size={14} color="#C0C0CC" style={{ transform: selected === req.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        {selected && selectedReq && (
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740' }}>신청 상세</h2>
              <button onClick={() => setSelected(null)} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '7px', color: '#6B6B80', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              {statusIcon(selectedReq.status)}
              {statusBadge(selectedReq.status)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: '신청 번호', value: selectedReq.id },
                { label: '구분', value: selectedReq.typeLabel },
                { label: '제목', value: selectedReq.title },
                { label: '신청자', value: selectedReq.requester },
                { label: '부서', value: selectedReq.department },
                { label: '신청일', value: selectedReq.createdAt },
                { label: '최종 수정', value: selectedReq.updatedAt },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: i < 6 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <span style={{ fontSize: '0.8rem', color: '#9898A8', width: '80px', flexShrink: 0 }}>{item.label}</span>
                  <span style={{ fontSize: '0.8rem', color: '#1D1740', fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>
            {/* Timeline */}
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontSize: '0.8rem', color: '#9898A8', marginBottom: '12px', fontWeight: 600 }}>처리 이력</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { event: '신청 접수', date: selectedReq.createdAt, color: '#0093AD', done: true },
                  { event: '검토 중', date: selectedReq.createdAt, color: '#C27A00', done: ['approved', 'rejected', 'completed'].includes(selectedReq.status) },
                  { event: selectedReq.status === 'rejected' ? '반려' : '승인', date: selectedReq.updatedAt, color: selectedReq.status === 'rejected' ? '#E4002B' : '#007C58', done: ['approved', 'rejected', 'completed'].includes(selectedReq.status) },
                  { event: '처리 완료', date: selectedReq.updatedAt, color: '#007C58', done: selectedReq.status === 'completed' },
                ].map((ev, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: ev.done ? 1 : 0.3 }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: ev.done ? ev.color : 'rgba(0,0,0,0.1)', flexShrink: 0, border: `2px solid ${ev.done ? ev.color : 'rgba(0,0,0,0.08)'}` }} />
                    <span style={{ fontSize: '0.8rem', color: ev.done ? '#1D1740' : '#C0C0CC', fontWeight: ev.done ? 500 : 400 }}>{ev.event}</span>
                    <span style={{ fontSize: '0.72rem', color: '#9898A8', marginLeft: 'auto' }}>{ev.done ? ev.date : '-'}</span>
                  </div>
                ))}
              </div>
            </div>
            {selectedReq.status === 'pending' && (
              <button style={{ width: '100%', marginTop: '20px', background: '#FEEAED', border: '1px solid #E4002B', borderRadius: '10px', color: '#B8001F', padding: '10px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                신청 취소
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
