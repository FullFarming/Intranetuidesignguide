import { useState } from 'react';
import { Car, ArrowLeft, CheckCircle, MapPin, Calendar, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { vehicleCalendarEvents } from '../data/mockData';
import { toast } from 'sonner';
import { Breadcrumb } from '../components/layout/Breadcrumb';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

const vehicles = [
  { id: 'v1', name: '소나타 (가나1234)', capacity: 4, available: true },
  { id: 'v2', name: 'K5 (나다5678)', capacity: 4, available: true },
  { id: 'v3', name: '카니발 (다라9012)', capacity: 8, available: false },
];

export default function VehicleRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: '', startTime: '09:00', endTime: '12:00',
    departure: '', destination: '', passengers: '1',
    purpose: '', notes: '', vehicle: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <div style={{ maxWidth: '480px', margin: '40px auto', textAlign: 'center' }}>
        <div style={cardStyle}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,147,173,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={32} color="#0093AD" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D1740', marginBottom: '8px' }}>예약이 완료되었습니다!</h2>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginBottom: '24px' }}>예약 확인증이 이메일로 발송되었습니다.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/')} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', color: '#1D1740', padding: '11px 20px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>대시보드</button>
            <button onClick={() => { setSubmitted(false); setForm({ date: '', startTime: '09:00', endTime: '12:00', departure: '', destination: '', passengers: '1', purpose: '', notes: '', vehicle: '' }); }} style={{ background: '#0093AD', border: 'none', borderRadius: '10px', color: '#fff', padding: '11px 20px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              새 예약
            </button>
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
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740' }}>법인차량 예약</h1>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>업무용 법인차량 이용 예약</p>
        </div>
      </div>

      <div className="two-col-layout-wide">
        {/* Left: Form */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Car size={18} color="#0093AD" /> 예약 정보
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="cw-label"><Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />이용 날짜 *</label>
              <input type="date" className="cw-input" value={form.date} onChange={(e) => handleChange('date', e.target.value)} min="2026-02-20" style={{ colorScheme: 'light' }} />
            </div>

            <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="cw-label"><Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />출발 시간 *</label>
                <select className="cw-input" value={form.startTime} onChange={(e) => handleChange('startTime', e.target.value)}>
                  {Array.from({ length: 18 }, (_, i) => { const h = Math.floor(i / 2) + 7; const m = i % 2 === 0 ? '00' : '30'; return `${String(h).padStart(2, '0')}:${m}`; }).map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="cw-label">도착 예정 시간 *</label>
                <select className="cw-input" value={form.endTime} onChange={(e) => handleChange('endTime', e.target.value)}>
                  {Array.from({ length: 18 }, (_, i) => { const h = Math.floor(i / 2) + 7; const m = i % 2 === 0 ? '00' : '30'; return `${String(h).padStart(2, '0')}:${m}`; }).map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="cw-label"><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />출발지 *</label>
              <input type="text" className="cw-input" placeholder="여의도 C&W 사무소" value={form.departure} onChange={(e) => handleChange('departure', e.target.value)} />
            </div>
            <div>
              <label className="cw-label"><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />목적지 *</label>
              <input type="text" className="cw-input" placeholder="목적지를 입력하세요" value={form.destination} onChange={(e) => handleChange('destination', e.target.value)} />
            </div>
            <div>
              <label className="cw-label"><Users size={12} style={{ display: 'inline', marginRight: '4px' }} />동승 인원 (운전자 포함)</label>
              <select className="cw-input" value={form.passengers} onChange={(e) => handleChange('passengers', e.target.value)}>
                {['1', '2', '3', '4', '5', '6', '7', '8'].map((n) => <option key={n} value={n}>{n}명</option>)}
              </select>
            </div>
            <div>
              <label className="cw-label">이용 목적 *</label>
              <input type="text" className="cw-input" placeholder="예: 클라이언트 미팅" value={form.purpose} onChange={(e) => handleChange('purpose', e.target.value)} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="cw-label">비고 (선택)</label>
              <textarea className="cw-input" placeholder="추가 요청사항" value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} rows={2} style={{ resize: 'vertical' }} />
            </div>
          </div>

          {/* Vehicle Selection */}
          <div style={{ marginTop: '20px' }}>
            <label className="cw-label" style={{ marginBottom: '10px', display: 'block' }}>차량 선택</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  onClick={() => v.available && handleChange('vehicle', v.id)}
                  style={{
                    background: form.vehicle === v.id ? 'rgba(0,147,173,0.07)' : '#F8F8FC',
                    border: `1.5px solid ${form.vehicle === v.id ? '#0093AD' : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: '12px',
                    padding: '14px 16px',
                    cursor: v.available ? 'pointer' : 'not-allowed',
                    opacity: v.available ? 1 : 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Car size={20} color={form.vehicle === v.id ? '#0093AD' : '#9898A8'} />
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#1D1740', fontWeight: 600 }}>{v.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#9898A8' }}>최대 {v.capacity}인승</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', padding: '3px 10px', borderRadius: '100px', background: v.available ? '#E5F5EF' : '#FEEAED', color: v.available ? '#00613E' : '#B8001F', border: `1px solid ${v.available ? '#007C58' : '#E4002B'}` }}>
                    {v.available ? '예약 가능' : '사용 중'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              onClick={() => { setSubmitted(true); toast.success('법인차량 예약이 완료되었습니다!', { description: '예약 확인증이 이메일로 발송됩니다.', duration: 5000 }); }}
              style={{ background: '#0093AD', border: 'none', borderRadius: '10px', color: '#fff', padding: '12px 28px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#007A90')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#0093AD')}
            >
              예약 신청하기
            </button>
          </div>
        </div>

        {/* Right: Calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={15} color="#C27A00" /> 차량 예약 현황
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {vehicleCalendarEvents.map((ev, i) => (
                <div key={i} style={{ background: 'rgba(0,147,173,0.06)', borderRadius: '10px', padding: '10px 14px', border: '1px solid rgba(0,147,173,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.775rem', color: '#0093AD', fontWeight: 700 }}>{ev.date}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6B6B80' }}>{ev.time}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#1D1740', fontWeight: 500 }}>{ev.driver}</p>
                  <p style={{ fontSize: '0.75rem', color: '#9898A8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <MapPin size={11} /> {ev.destination}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D1740', marginBottom: '12px' }}>이용 안내</h2>
            {['당일 예약은 1시간 전까지 신청 가능', '예약 취소는 출발 2시간 전까지', '운행 일지 앱에서 자동 생성', '운행 완료 후 피드백 필수'].map((note, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-start' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0093AD', flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontSize: '0.8rem', color: '#6B6B80' }}>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
