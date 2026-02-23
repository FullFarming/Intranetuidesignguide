import { useState } from 'react';
import { Flower2, CheckCircle, Send, ArrowLeft } from 'lucide-react';
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

export default function WreathRequest() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    occasionType: '경사',
    recipientName: '',
    recipientPhone: '',
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: '10:00',
    message: '',
    budget: '100000',
    notes: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setStep(3);
    toast.success('화환 신청이 완료되었습니다!', {
      description: '총무팀에서 검토 후 승인 알림을 보내드립니다.',
      duration: 5000,
    });
  };

  const budgetLabels: Record<string, string> = {
    '100000': '10만원',
    '150000': '15만원',
    '200000': '20만원',
  };

  return (
    <div>
      <Breadcrumb />
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#1D1740', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740' }}>화환 신청</h1>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>경조사 화환 발송 신청</p>
        </div>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['신청서 작성', '미리보기', '제출 완료'].map((label, i) => {
          const s = i + 1;
          const isActive = step === s;
          const isDone = step > s;
          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isDone ? '#007C58' : isActive ? '#E4002B' : 'rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isDone || isActive ? '#fff' : '#9898A8',
                    flexShrink: 0,
                  }}
                >
                  {isDone ? '✓' : s}
                </div>
                <span style={{ fontSize: '0.8125rem', color: isActive ? '#1D1740' : isDone ? '#007C58' : '#9898A8', fontWeight: isActive ? 600 : 400 }}>
                  {label}
                </span>
              </div>
              {i < 2 && <div style={{ width: '30px', height: '1px', background: 'rgba(0,0,0,0.12)', marginLeft: '4px' }} />}
            </div>
          );
        })}
      </div>

      {/* Step 1: Form */}
      {step === 1 && (
        <div style={{ maxWidth: '720px' }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flower2 size={18} color="#E4002B" /> 기본 정보
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Occasion Type */}
              <div style={{ gridColumn: 'span 2' }}>
                <label className="cw-label">신청 종류 *</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['경사', '조사'].map((type) => (
                    <label
                      key={type}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: `2px solid ${form.occasionType === type ? '#E4002B' : 'rgba(0,0,0,0.1)'}`,
                        background: form.occasionType === type ? 'rgba(228,0,43,0.06)' : '#F8F8FC',
                        transition: 'all 0.2s',
                        flex: 1,
                        justifyContent: 'center',
                      }}
                    >
                      <input
                        type="radio"
                        name="occasionType"
                        value={type}
                        checked={form.occasionType === type}
                        onChange={(e) => handleChange('occasionType', e.target.value)}
                        style={{ display: 'none' }}
                      />
                      <span style={{ fontSize: '1.2rem' }}>{type === '경사' ? '🎉' : '🕯️'}</span>
                      <span style={{ color: '#1D1740', fontWeight: 600, fontSize: '0.875rem' }}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Recipient Name */}
              <div>
                <label className="cw-label">수령인 이름 *</label>
                <input type="text" className="cw-input" placeholder="홍길동" value={form.recipientName} onChange={(e) => handleChange('recipientName', e.target.value)} />
              </div>

              {/* Recipient Phone */}
              <div>
                <label className="cw-label">수령인 연락처 *</label>
                <input type="tel" className="cw-input" placeholder="010-0000-0000" value={form.recipientPhone} onChange={(e) => handleChange('recipientPhone', e.target.value)} />
              </div>

              {/* Delivery Address */}
              <div style={{ gridColumn: 'span 2' }}>
                <label className="cw-label">배송 주소 *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" className="cw-input" placeholder="주소를 입력하세요" value={form.deliveryAddress} onChange={(e) => handleChange('deliveryAddress', e.target.value)} style={{ flex: 1 }} />
                  <button style={{ background: 'rgba(0,147,173,0.1)', border: '1px solid rgba(0,147,173,0.3)', borderRadius: '8px', color: '#006B80', padding: '0 16px', cursor: 'pointer', fontSize: '0.8125rem', fontFamily: 'inherit', whiteSpace: 'nowrap', fontWeight: 600 }}>
                    주소 검색
                  </button>
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <label className="cw-label">배송 날짜 *</label>
                <input type="date" className="cw-input" value={form.deliveryDate} onChange={(e) => handleChange('deliveryDate', e.target.value)} min="2026-02-20" style={{ colorScheme: 'light' }} />
              </div>

              {/* Delivery Time */}
              <div>
                <label className="cw-label">배송 시간 *</label>
                <select className="cw-input" value={form.deliveryTime} onChange={(e) => handleChange('deliveryTime', e.target.value)}>
                  {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="cw-label">예산 범위 *</label>
                <select className="cw-input" value={form.budget} onChange={(e) => handleChange('budget', e.target.value)}>
                  <option value="100000">10만원</option>
                  <option value="150000">15만원</option>
                  <option value="200000">20만원</option>
                </select>
              </div>

              {/* Message */}
              <div style={{ gridColumn: 'span 2' }}>
                <label className="cw-label">메시지 카드 내용 (최대 100자)</label>
                <textarea className="cw-input" placeholder="메시지를 입력하세요" value={form.message} onChange={(e) => handleChange('message', e.target.value)} maxLength={100} rows={3} style={{ resize: 'vertical' }} />
                <p style={{ fontSize: '0.7rem', color: '#9898A8', marginTop: '4px', textAlign: 'right' }}>{form.message.length}/100</p>
              </div>

              {/* Notes */}
              <div style={{ gridColumn: 'span 2' }}>
                <label className="cw-label">비고 (선택)</label>
                <textarea className="cw-input" placeholder="추가 요청사항이 있으면 입력하세요" value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} rows={2} style={{ resize: 'vertical' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                onClick={() => setStep(2)}
                style={{ background: '#E4002B', border: 'none', borderRadius: '10px', color: '#fff', padding: '12px 28px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#C0001E')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#E4002B')}
              >
                미리보기 확인 →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Preview */}
      {step === 2 && (
        <div style={{ maxWidth: '600px' }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px' }}>신청서 미리보기</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: '신청 종류', value: form.occasionType },
                { label: '수령인', value: form.recipientName || '-' },
                { label: '연락처', value: form.recipientPhone || '-' },
                { label: '배송 주소', value: form.deliveryAddress || '-' },
                { label: '배송 날짜/시간', value: `${form.deliveryDate || '-'} ${form.deliveryTime}` },
                { label: '예산', value: budgetLabels[form.budget] },
                { label: '메시지', value: form.message || '-' },
                { label: '비고', value: form.notes || '-' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: i < 7 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#9898A8', width: '120px', flexShrink: 0 }}>{item.label}</span>
                  <span style={{ fontSize: '0.8125rem', color: '#1D1740', fontWeight: 500, flex: 1 }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                onClick={() => setStep(1)}
                style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', color: '#1D1740', padding: '11px 24px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}
              >
                ← 수정하기
              </button>
              <button
                onClick={handleSubmit}
                style={{ background: '#E4002B', border: 'none', borderRadius: '10px', color: '#fff', padding: '11px 28px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Send size={15} /> 신청 제출
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Complete */}
      {step === 3 && (
        <div style={{ maxWidth: '480px', margin: '40px auto', textAlign: 'center' }}>
          <div style={cardStyle}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,124,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={32} color="#007C58" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D1740', marginBottom: '8px' }}>신청이 완료되었습니다!</h2>
            <p style={{ fontSize: '0.875rem', color: '#6B6B80', marginBottom: '8px' }}>접수 번호: <strong style={{ color: '#0093AD' }}>REQ-2026-{String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}</strong></p>
            <p style={{ fontSize: '0.8125rem', color: '#9898A8', marginBottom: '24px' }}>총무팀에서 검토 후 승인/반려 알림을 보내드립니다.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => navigate('/my-requests')}
                style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', color: '#1D1740', padding: '11px 20px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}
              >
                신청 현황 보기
              </button>
              <button
                onClick={() => { setStep(1); setForm({ occasionType: '경사', recipientName: '', recipientPhone: '', deliveryAddress: '', deliveryDate: '', deliveryTime: '10:00', message: '', budget: '100000', notes: '' }); }}
                style={{ background: '#E4002B', border: 'none', borderRadius: '10px', color: '#fff', padding: '11px 20px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                새 신청
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}