import { useState } from 'react';
import { Wrench, ArrowLeft, CheckCircle, Upload, AlertTriangle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Breadcrumb } from '../components/layout/Breadcrumb';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

const recentReports = [
  { id: 'FR-001', location: '3층 A구역', category: '복사기', desc: '용지 걸림 반복', urgency: '보통', status: 'completed', date: '2026-02-15' },
  { id: 'FR-002', location: '5층 회의실', category: '프로젝터', desc: '연결 불량', urgency: '높음', status: 'in_progress', date: '2026-02-18' },
  { id: 'FR-003', location: '2층 탕비실', category: '정수기', desc: '냉각 불량', urgency: '낮음', status: 'pending', date: '2026-02-19' },
];

export default function FacilityReport() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ floor: '', area: '', category: '', description: '', urgency: '보통', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const categories = [
    { group: '가구', items: ['책상', '의자', '캐비닛'] },
    { group: '회의실', items: ['프로젝터', '화상회의 시스템', '조명', 'TV/디스플레이'] },
    { group: '공용 공간', items: ['복사기', '냉장고', '정수기', '전자레인지'] },
    { group: 'IT', items: ['PC/노트북', '네트워크', '전화기'] },
    { group: '기타', items: ['문/잠금장치', '에어컨/난방', '조명'] },
  ];

  const urgencyConfig = {
    '낮음': { color: '#006B80', bg: 'rgba(0,147,173,0.08)', border: 'rgba(0,147,173,0.3)' },
    '보통': { color: '#C27A00', bg: 'rgba(241,180,52,0.1)', border: 'rgba(241,180,52,0.35)' },
    '높음': { color: '#B8001F', bg: 'rgba(228,0,43,0.08)', border: 'rgba(228,0,43,0.3)' },
  };

  const statusMap: Record<string, { label: string; color: string; bg: string }> = {
    pending: { label: '접수 완료', color: '#C27A00', bg: '#FFF8E0' },
    in_progress: { label: '처리 중', color: '#006B80', bg: '#E0F4F8' },
    completed: { label: '완료', color: '#00613E', bg: '#E5F5EF' },
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: '480px', margin: '40px auto', textAlign: 'center' }}>
        <div style={cardStyle}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(241,180,52,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={32} color="#C27A00" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D1740', marginBottom: '8px' }}>신고가 접수되었습니다!</h2>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginBottom: '24px' }}>시설팀에 배정되었으며, 담당자가 연락드릴 예정입니다.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/')} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', color: '#1D1740', padding: '11px 20px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>대시보드</button>
            <button onClick={() => { setSubmitted(false); setForm({ floor: '', area: '', category: '', description: '', urgency: '보통', notes: '' }); }} style={{ background: '#F1B434', border: 'none', borderRadius: '10px', color: '#1D1740', padding: '11px 20px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>새 신고</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate('/')} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#1D1740', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740' }}>고장 신고</h1>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>사무실 시설/장비 고장 신고</p>
        </div>
      </div>

      <div className="two-col-layout">
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wrench size={18} color="#C27A00" /> 신고 정보
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="cw-label">층 *</label>
              <select className="cw-input" value={form.floor} onChange={(e) => handleChange('floor', e.target.value)}>
                <option value="">선택하세요</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n} value={`${n}층`}>{n}층</option>)}
              </select>
            </div>
            <div>
              <label className="cw-label">구역</label>
              <select className="cw-input" value={form.area} onChange={(e) => handleChange('area', e.target.value)}>
                <option value="">선택하세요</option>
                {['A구역', 'B구역', 'C구역', '회의실', '탕비실', '화장실', '엘리베이터', '계단'].map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label className="cw-label">카테고리 *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {categories.flatMap((g) => g.items.map((item) => ({ label: item, group: g.group }))).slice(0, 12).map((item) => (
                  <button key={item.label} onClick={() => handleChange('category', item.label)}
                    style={{ background: form.category === item.label ? 'rgba(241,180,52,0.12)' : '#F8F8FC', border: `1.5px solid ${form.category === item.label ? '#F1B434' : 'rgba(0,0,0,0.08)'}`, borderRadius: '8px', color: form.category === item.label ? '#C27A00' : '#6B6B80', padding: '8px', fontSize: '0.775rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', textAlign: 'center', fontWeight: form.category === item.label ? 700 : 400 }}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label className="cw-label">고장 내용 *</label>
              <textarea className="cw-input" placeholder="고장 내용을 자세히 설명해 주세요" value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} style={{ resize: 'vertical' }} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label className="cw-label">긴급도 *</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {(['낮음', '보통', '높음'] as const).map((u) => {
                  const cfg = urgencyConfig[u];
                  return (
                    <button key={u} onClick={() => handleChange('urgency', u)}
                      style={{ flex: 1, background: form.urgency === u ? cfg.bg : '#F8F8FC', border: `2px solid ${form.urgency === u ? cfg.border : 'rgba(0,0,0,0.08)'}`, borderRadius: '10px', color: form.urgency === u ? cfg.color : '#6B6B80', padding: '10px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: form.urgency === u ? 700 : 400, fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s' }}>
                      {u === '높음' && <AlertTriangle size={14} />}
                      {u}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label className="cw-label">사진 첨부 (최대 3장)</label>
              <div style={{ border: '2px dashed rgba(0,0,0,0.15)', borderRadius: '12px', padding: '24px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s', background: '#F8F8FC' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(241,180,52,0.5)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)')}>
                <Upload size={24} color="#C0C0CC" style={{ margin: '0 auto 8px' }} />
                <p style={{ fontSize: '0.8125rem', color: '#9898A8' }}>클릭하거나 파일을 드래그하세요</p>
                <p style={{ fontSize: '0.725rem', color: '#B0B0C0', marginTop: '4px' }}>JPG, PNG (최대 5MB)</p>
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label className="cw-label">비고 (선택)</label>
              <textarea className="cw-input" placeholder="추가 요청사항" value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} rows={2} style={{ resize: 'vertical' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button onClick={() => { setSubmitted(true); toast.success('고장 신고가 접수되었습니다!', { description: '시설팀에 배정되었으며, 담당자가 연락드릴 예정입니다.', duration: 5000 }); }}
              style={{ background: '#F1B434', border: 'none', borderRadius: '10px', color: '#1D1740', padding: '12px 28px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              신고 접수하기
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={15} color="#C27A00" /> 최근 신고 내역
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentReports.map((r) => {
                const st = statusMap[r.status];
                const urg = urgencyConfig[r.urgency as keyof typeof urgencyConfig];
                return (
                  <div key={r.id} style={{ background: '#F8F8FC', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div>
                        <p style={{ fontSize: '0.8125rem', color: '#1D1740', fontWeight: 600 }}>{r.location} - {r.category}</p>
                        <p style={{ fontSize: '0.75rem', color: '#6B6B80', marginTop: '2px' }}>{r.desc}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.7rem', background: st.bg, color: st.color, borderRadius: '100px', padding: '2px 8px', fontWeight: 600 }}>{st.label}</span>
                      <span style={{ fontSize: '0.7rem', background: urg.bg, color: urg.color, borderRadius: '100px', padding: '2px 8px', border: `1px solid ${urg.border}`, fontWeight: 600 }}>{r.urgency}</span>
                      <span style={{ fontSize: '0.7rem', color: '#9898A8', marginLeft: 'auto' }}>{r.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D1740', marginBottom: '10px' }}>처리 현황 안내</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[{ step: '1', label: '신고 접수', desc: '즉시', color: '#0093AD' }, { step: '2', label: '시설팀 배정', desc: '30분 이내', color: '#C27A00' }, { step: '3', label: '현장 점검', desc: '당일', color: '#0093AD' }, { step: '4', label: '처리 완료', desc: '1~3 영업일', color: '#007C58' }].map((s) => (
                <div key={s.step} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${s.color}30` }}>
                    <span style={{ fontSize: '0.7rem', color: s.color, fontWeight: 700 }}>{s.step}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.8rem', color: '#1D1740', fontWeight: 500 }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#9898A8' }}>{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
