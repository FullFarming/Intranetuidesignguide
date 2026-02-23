import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { mockRequests, currentUser } from '../../data/mockData';
import { toast } from 'sonner';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

export default function ApprovalManagement() {
  const [requests, setRequests] = useState(mockRequests);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [search, setSearch] = useState('');

  if (currentUser.role !== 'admin') {
    return (
      <div style={{ maxWidth: '480px', margin: '80px auto', textAlign: 'center' }}>
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D1740', marginBottom: '8px' }}>접근 권한 없음</h2>
          <p style={{ fontSize: '0.875rem', color: '#6B6B80' }}>관리자 권한이 필요한 페이지입니다.</p>
        </div>
      </div>
    );
  }

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'approved' as const, updatedAt: '2026-02-22' } : r
      )
    );
    toast.success('승인되었습니다', {
      description: `${id} 신청이 승인 처리되었습니다.`,
    });
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'rejected' as const, updatedAt: '2026-02-22' } : r
      )
    );
    toast.error('거부되었습니다', {
      description: `${id} 신청이 거부 처리되었습니다.`,
    });
  };

  const filtered = requests.filter((r) => {
    const matchFilter = filter === 'all' || r.status === filter;
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.requester.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: { bg: 'rgba(241,180,52,0.1)', color: '#C27A00', text: '대기중' },
      approved: { bg: 'rgba(0,124,88,0.1)', color: '#007C58', text: '승인됨' },
      rejected: { bg: 'rgba(228,0,43,0.1)', color: '#E4002B', text: '거부됨' },
      completed: { bg: 'rgba(0,147,173,0.1)', color: '#0093AD', text: '완료' },
    };
    const style = styles[status as keyof typeof styles] || styles.pending;
    return (
      <span
        style={{
          fontSize: '0.75rem',
          background: style.bg,
          color: style.color,
          borderRadius: '6px',
          padding: '3px 8px',
          fontWeight: 700,
        }}
      >
        {style.text}
      </span>
    );
  };

  return (
    <div>
      <Breadcrumb />
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740', marginBottom: '4px' }}>승인 관리</h1>
        <p style={{ fontSize: '0.875rem', color: '#6B6B80' }}>신청 건을 승인하거나 거부하세요</p>
      </div>

      <div style={cardStyle}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '8px', background: '#F3F3F8', borderRadius: '10px', padding: '0 12px', border: '1.5px solid rgba(0,0,0,0.1)' }}>
            <Search size={15} color="#9898A8" />
            <input
              type="text"
              placeholder="신청 ID, 제목, 신청자 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#1D1740', fontSize: '0.875rem', width: '100%', fontFamily: 'inherit', height: '40px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { value: 'all', label: '전체', count: requests.length },
              { value: 'pending', label: '대기중', count: requests.filter((r) => r.status === 'pending').length },
              { value: 'approved', label: '승인됨', count: requests.filter((r) => r.status === 'approved').length },
              { value: 'rejected', label: '거부됨', count: requests.filter((r) => r.status === 'rejected').length },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as any)}
                style={{
                  background: filter === f.value ? '#1D1740' : '#F3F3F8',
                  border: `1px solid ${filter === f.value ? '#1D1740' : 'rgba(0,0,0,0.1)'}`,
                  borderRadius: '8px',
                  color: filter === f.value ? '#fff' : '#6B6B80',
                  padding: '6px 12px',
                  fontSize: '0.775rem',
                  fontWeight: filter === f.value ? 700 : 400,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {f.label}
                <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>({f.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#C0C0CC' }}>
              <Filter size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <p style={{ fontSize: '0.875rem' }}>조회된 신청이 없습니다</p>
            </div>
          ) : (
            filtered.map((req) => (
              <div
                key={req.id}
                style={{
                  background: '#F8F8FC',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '12px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1D1740' }}>{req.id}</span>
                      {getStatusBadge(req.status)}
                      <span style={{ fontSize: '0.72rem', background: 'rgba(0,0,0,0.06)', color: '#6B6B80', borderRadius: '4px', padding: '2px 6px' }}>{req.typeLabel}</span>
                    </div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1D1740', marginBottom: '8px' }}>{req.title}</h3>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#9898A8' }}>
                      <span>신청자: <strong style={{ color: '#6B6B80' }}>{req.requester}</strong></span>
                      <span>부서: {req.department}</span>
                      <span>신청일: {req.createdAt}</span>
                      {req.updatedAt !== req.createdAt && <span>처리일: {req.updatedAt}</span>}
                    </div>
                  </div>

                  {req.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                      <button
                        onClick={() => handleApprove(req.id)}
                        style={{
                          background: 'rgba(0,124,88,0.1)',
                          border: '1px solid rgba(0,124,88,0.3)',
                          borderRadius: '8px',
                          color: '#007C58',
                          padding: '8px 14px',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <CheckCircle size={14} />
                        승인
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        style={{
                          background: 'rgba(228,0,43,0.1)',
                          border: '1px solid rgba(228,0,43,0.3)',
                          borderRadius: '8px',
                          color: '#E4002B',
                          padding: '8px 14px',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <XCircle size={14} />
                        거부
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
