import { useState } from 'react';
import { CreditCard, ArrowLeft, CheckCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { departments, positions } from '../data/mockData';
import { toast } from 'sonner';
import { Breadcrumb } from '../components/layout/Breadcrumb';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

export default function BusinessCard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    requestType: '신규', nameKo: '', nameEn: '',
    department: '', position: '', officePhone: '',
    mobilePhone: '', email: '', quantity: '1',
    design: 'standard', receiveMethod: '이메일',
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const designs = [
    { id: 'standard', name: '표준형', desc: '기본 C&W 명함 디자인' },
    { id: 'premium', name: '프리미엄형', desc: '고급 무광 코팅' },
    { id: 'bilingual', name: '한영 양면', desc: '앞면 한국어, 뒷면 영어' },
  ];

  if (submitted) {
    return (
      <div style={{ maxWidth: '480px', margin: '40px auto', textAlign: 'center' }}>
        <div style={cardStyle}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,124,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={32} color="#007C58" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D1740', marginBottom: '8px' }}>신청이 완료되었습니다!</h2>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginBottom: '24px' }}>인사팀 검토 후 제작이 시작됩니다. (약 5~7 영업일)</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/my-requests')} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', color: '#1D1740', padding: '11px 20px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>신청 현황</button>
            <button onClick={() => setSubmitted(false)} style={{ background: '#007C58', border: 'none', borderRadius: '10px', color: '#fff', padding: '11px 20px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>새 신청</button>
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
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740' }}>명함 신청</h1>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>새 명함 제작 또는 재발급</p>
        </div>
      </div>

      <div className="two-col-layout-wide">
        {/* Left: Form */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="#007C58" /> 명함 정보 입력
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="cw-label">신청 종류 *</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['신규', '재발급'].map((type) => (
                  <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 24px', borderRadius: '10px', border: `2px solid ${form.requestType === type ? '#007C58' : 'rgba(0,0,0,0.1)'}`, background: form.requestType === type ? 'rgba(0,124,88,0.07)' : '#F8F8FC', transition: 'all 0.2s', flex: 1, justifyContent: 'center' }}>
                    <input type="radio" name="requestType" value={type} checked={form.requestType === type} onChange={(e) => handleChange('requestType', e.target.value)} style={{ display: 'none' }} />
                    <span style={{ color: '#1D1740', fontWeight: 600, fontSize: '0.875rem' }}>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="cw-label">이름 (한글) *</label>
              <input type="text" className="cw-input" placeholder="홍길동" value={form.nameKo} onChange={(e) => handleChange('nameKo', e.target.value)} />
            </div>
            <div>
              <label className="cw-label">이름 (영문) *</label>
              <input type="text" className="cw-input" placeholder="Hong Gil-dong" value={form.nameEn} onChange={(e) => handleChange('nameEn', e.target.value)} />
            </div>
            <div>
              <label className="cw-label">부서 *</label>
              <select className="cw-input" value={form.department} onChange={(e) => handleChange('department', e.target.value)}>
                <option value="">선택하세요</option>
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="cw-label">직책/직급 *</label>
              <select className="cw-input" value={form.position} onChange={(e) => handleChange('position', e.target.value)}>
                <option value="">선택하세요</option>
                {positions.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="cw-label">사무실 전화</label>
              <input type="tel" className="cw-input" placeholder="02-0000-0000" value={form.officePhone} onChange={(e) => handleChange('officePhone', e.target.value)} />
            </div>
            <div>
              <label className="cw-label">휴대폰</label>
              <input type="tel" className="cw-input" placeholder="010-0000-0000" value={form.mobilePhone} onChange={(e) => handleChange('mobilePhone', e.target.value)} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="cw-label">이메일 *</label>
              <input type="email" className="cw-input" placeholder="gildon.hong@cushwake.com" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div>
              <label className="cw-label">수량 (1박스 = 100매) *</label>
              <select className="cw-input" value={form.quantity} onChange={(e) => handleChange('quantity', e.target.value)}>
                {['1', '2', '3', '4', '5'].map((n) => <option key={n} value={n}>{n}박스 ({parseInt(n) * 100}매)</option>)}
              </select>
            </div>
            <div>
              <label className="cw-label">수령 방법 *</label>
              <select className="cw-input" value={form.receiveMethod} onChange={(e) => handleChange('receiveMethod', e.target.value)}>
                <option value="이메일">이메일 (PDF 시안)</option>
                <option value="우편">우편</option>
                <option value="직접수령">직접수령</option>
              </select>
            </div>

            {/* Design Selection */}
            <div style={{ gridColumn: 'span 2' }}>
              <label className="cw-label" style={{ marginBottom: '10px', display: 'block' }}>디자인 선택</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {designs.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleChange('design', d.id)}
                    style={{
                      background: form.design === d.id ? 'rgba(0,124,88,0.07)' : '#F8F8FC',
                      border: `2px solid ${form.design === d.id ? '#007C58' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ width: '100%', height: '56px', background: 'linear-gradient(135deg, #1D1740, #2a205a)', borderRadius: '6px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(228,0,43,0.3)' }}>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>C&W</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#1D1740', fontWeight: 600 }}>{d.name}</p>
                    <p style={{ fontSize: '0.7rem', color: '#9898A8', marginTop: '2px' }}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              onClick={() => { setSubmitted(true); toast.success('명함 신청이 완료되었습니다!', { description: '인사팀 검토 후 제작이 시작됩니다. (약 5~7 영업일)', duration: 5000 }); }}
              style={{ background: '#007C58', border: 'none', borderRadius: '10px', color: '#fff', padding: '12px 28px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#005C40')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#007C58')}
            >
              신청 제출
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={15} color="#0093AD" /> 실시간 미리보기
            </h2>
            <p style={{ fontSize: '0.72rem', color: '#9898A8', marginBottom: '8px', fontWeight: 600 }}>앞면</p>
            <div style={{ width: '100%', aspectRatio: '1.75', background: 'linear-gradient(135deg, #1D1740 0%, #2d2260 100%)', borderRadius: '10px', padding: '18px', position: 'relative', border: '1px solid rgba(228,0,43,0.3)', marginBottom: '10px', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '6px', background: '#E4002B' }} />
              <div style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>C&W</div>
              <div style={{ position: 'absolute', bottom: '14px', left: '18px' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{form.nameKo || '홍 길 동'}</p>
                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{form.department || '부서명'} · {form.position || '직급'}</p>
                <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{form.email || 'email@cushwake.com'}</p>
              </div>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#9898A8', marginBottom: '8px', fontWeight: 600 }}>뒷면</p>
            <div style={{ width: '100%', aspectRatio: '1.75', background: '#E4002B', borderRadius: '10px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', letterSpacing: '1.5px' }}>CUSHMAN &</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', letterSpacing: '1.5px' }}>WAKEFIELD</p>
                <div style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.4)', margin: '8px auto' }} />
                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.5px' }}>KOREA</p>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D1740', marginBottom: '10px' }}>안내</h2>
            {['제작 기간: 승인 후 5~7 영업일', '최소 주문: 1박스 (100매)', 'PDF 시안 확인 후 제작 진행', '디자인 변경 시 추가 요청 필요'].map((note, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '7px', alignItems: 'flex-start' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#007C58', flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontSize: '0.8rem', color: '#6B6B80' }}>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
