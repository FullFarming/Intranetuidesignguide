import { useState } from 'react';
import { User, Mail, Phone, Building2, Save, Edit3, Shield, Clock, CheckCircle, Award, Camera, KeyRound, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { departments, positions, mockRequests } from '../data/mockData';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { motion } from 'motion/react';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4, ease: 'easeOut' } }),
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    nameKo: 'Noel Kim', nameEn: 'Noel Kim', department: 'WPR팀',
    officePhone: '02-3708-1001', mobilePhone: '010-1234-5678',
    email: 'noel.kim@cushwake.com',
    bio: 'C&W Korea WPR팀에서 부동산 자산관리 및 포트폴리오 전략을 담당하고 있습니다.',
  });
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const handleChange = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const handleSave = () => { setIsEditing(false); toast.success('프로필이 저장되었습니다.', { description: '변경된 정보가 적용되었습니다.', icon: '✓' }); };
  const handlePasswordChange = () => {
    if (!pwForm.current || !pwForm.next || !pwForm.confirm) { toast.error('모든 비밀번호 항목을 입력해 주세요.'); return; }
    if (pwForm.next !== pwForm.confirm) { toast.error('새 비밀번호가 일치하지 않습니다.'); return; }
    setPwForm({ current: '', next: '', confirm: '' });
    toast.success('비밀번호가 변경되었습니다.');
  };

  const stats = {
    total: mockRequests.length,
    approved: mockRequests.filter((r) => r.status === 'approved').length,
    completed: mockRequests.filter((r) => r.status === 'completed').length,
    pending: mockRequests.filter((r) => r.status === 'pending').length,
  };
  const recentActivity = mockRequests.slice(0, 4);
  const statusBadgeColor: Record<string, { color: string; bg: string; border: string }> = {
    pending: { color: '#C27A00', bg: '#FFF8E0', border: '#F1B434' },
    approved: { color: '#00613E', bg: '#E5F5EF', border: '#007C58' },
    rejected: { color: '#B8001F', bg: '#FEEAED', border: '#E4002B' },
    completed: { color: '#00607A', bg: '#E0F4F8', border: '#0093AD' },
  };
  const statusLabel: Record<string, string> = { pending: '대기 중', approved: '승인', rejected: '반려', completed: '완료' };

  return (
    <div>
      <Breadcrumb />
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740' }}>프로필 관리</h1>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>개인 정보 및 계정 설정을 관리하세요</p>
        </div>
        <button onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isEditing ? '#007C58' : '#F3F3F8', border: `1px solid ${isEditing ? '#007C58' : 'rgba(0,0,0,0.1)'}`, borderRadius: '10px', color: isEditing ? '#fff' : '#1D1740', padding: '9px 20px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
          {isEditing ? <><Save size={15} /> 저장</> : <><Edit3 size={15} /> 편집</>}
        </button>
      </motion.div>

      <div className="two-col-layout-wide">
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Profile Card */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '12px 0 20px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #0093AD, #007C58)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 700, color: '#fff', border: '3px solid rgba(255,255,255,0.8)', boxShadow: '0 4px 16px rgba(0,147,173,0.3)' }}>
                  김
                </div>
                <button style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', borderRadius: '50%', background: '#E4002B', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                  onClick={() => toast.info('프로필 사진 업로드 기능은 준비 중입니다.')}>
                  <Camera size={12} color="#fff" />
                </button>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1D1740' }}>{form.nameKo}</p>
                <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>{form.department}</p>
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '10px' }}>
                  <span style={{ background: '#E5F5EF', color: '#00613E', borderRadius: '100px', padding: '3px 10px', fontSize: '0.72rem', border: '1px solid #007C58', fontWeight: 700 }}>재직 중</span>
                  <span style={{ background: '#E0F4F8', color: '#006B80', borderRadius: '100px', padding: '3px 10px', fontSize: '0.72rem', border: '1px solid #0093AD' }}>입사 2022.03</span>
                </div>
              </div>
            </div>
            <div style={{ padding: '16px 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[{ icon: <Mail size={14} />, label: form.email }, { icon: <Phone size={14} />, label: form.officePhone }, { icon: <Building2 size={14} />, label: '서울특별시 여의도 파크원' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ color: '#9898A8', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: '0.8125rem', color: '#3A3A50' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D1740', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={14} color="#C27A00" /> 나의 신청 통계
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[{ label: '전체 신청', value: stats.total, color: '#0093AD' }, { label: '승인', value: stats.approved, color: '#007C58' }, { label: '완료', value: stats.completed, color: '#1D1740' }, { label: '대기 중', value: stats.pending, color: '#C27A00' }].map((s, i) => (
                <div key={i} style={{ background: '#F8F8FC', borderRadius: '12px', padding: '14px', border: '1px solid rgba(0,0,0,0.06)', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, lineHeight: 1.2 }}>{s.value}</p>
                  <p style={{ fontSize: '0.75rem', color: '#9898A8', marginTop: '4px' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D1740', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={14} color="#0093AD" /> 최근 신청 내역
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentActivity.map((r) => {
                const s = statusBadgeColor[r.status];
                return (
                  <div key={r.id} style={{ background: '#F8F8FC', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '0.8rem', color: '#1D1740', fontWeight: 500, marginBottom: '2px' }}>{r.title}</p>
                      <p style={{ fontSize: '0.72rem', color: '#9898A8' }}>{r.typeLabel} · {r.createdAt}</p>
                    </div>
                    <span style={{ fontSize: '0.72rem', background: s.bg, color: s.color, borderRadius: '100px', padding: '2px 8px', border: `1px solid ${s.border}`, fontWeight: 600, whiteSpace: 'nowrap' }}>{statusLabel[r.status]}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Personal Info Form */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} color="#0093AD" /> 개인 정보
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div><label className="cw-label">이름 (한글)</label><input type="text" className="cw-input" value={form.nameKo} disabled={!isEditing} onChange={(e) => handleChange('nameKo', e.target.value)} style={{ opacity: isEditing ? 1 : 0.7 }} /></div>
              <div><label className="cw-label">이름 (영문)</label><input type="text" className="cw-input" value={form.nameEn} disabled={!isEditing} onChange={(e) => handleChange('nameEn', e.target.value)} style={{ opacity: isEditing ? 1 : 0.7 }} /></div>
              <div><label className="cw-label">부서</label><select className="cw-input" value={form.department} disabled={!isEditing} onChange={(e) => handleChange('department', e.target.value)} style={{ opacity: isEditing ? 1 : 0.7 }}>{departments.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
              <div><label className="cw-label">사무실 전화</label><input type="tel" className="cw-input" value={form.officePhone} disabled={!isEditing} onChange={(e) => handleChange('officePhone', e.target.value)} style={{ opacity: isEditing ? 1 : 0.7 }} /></div>
              <div><label className="cw-label">휴대폰</label><input type="tel" className="cw-input" value={form.mobilePhone} disabled={!isEditing} onChange={(e) => handleChange('mobilePhone', e.target.value)} style={{ opacity: isEditing ? 1 : 0.7 }} /></div>
              <div style={{ gridColumn: 'span 2' }}><label className="cw-label">이메일</label><input type="email" className="cw-input" value={form.email} disabled={!isEditing} onChange={(e) => handleChange('email', e.target.value)} style={{ opacity: isEditing ? 1 : 0.7 }} /></div>
              <div style={{ gridColumn: 'span 2' }}><label className="cw-label">자기소개</label><textarea className="cw-input" value={form.bio} disabled={!isEditing} onChange={(e) => handleChange('bio', e.target.value)} rows={3} style={{ resize: 'vertical', opacity: isEditing ? 1 : 0.7 }} /></div>
            </div>
            {isEditing && (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={() => setIsEditing(false)} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', color: '#1D1740', padding: '10px 20px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>취소</button>
                <button onClick={handleSave} style={{ background: '#007C58', border: 'none', borderRadius: '10px', color: '#fff', padding: '10px 24px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={15} /> 저장
                </button>
              </div>
            )}
          </motion.div>

          {/* Security */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={16} color="#C27A00" /> 보안 설정
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label className="cw-label">현재 비밀번호</label><input type="password" className="cw-input" placeholder="현재 비밀번호 입력" value={pwForm.current} onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))} /></div>
              <div><label className="cw-label">새 비밀번호</label><input type="password" className="cw-input" placeholder="새 비밀번호 (8자 이상)" value={pwForm.next} onChange={(e) => setPwForm((p) => ({ ...p, next: e.target.value }))} /></div>
              <div><label className="cw-label">새 비밀번호 확인</label><input type="password" className="cw-input" placeholder="새 비밀번호 재입력" value={pwForm.confirm} onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))} /></div>
              <button onClick={handlePasswordChange} style={{ background: 'rgba(241,180,52,0.1)', border: '1px solid rgba(241,180,52,0.4)', borderRadius: '10px', color: '#C27A00', padding: '11px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <KeyRound size={15} /> 비밀번호 변경
              </button>
            </div>
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              <p style={{ fontSize: '0.8rem', color: '#9898A8', marginBottom: '10px', fontWeight: 600 }}>세션 및 계정</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                  <div>
                    <p style={{ fontSize: '0.8125rem', color: '#1D1740', fontWeight: 500 }}>마지막 로그인</p>
                    <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '2px' }}>2026-02-20 09:24 · Chrome / Windows</p>
                  </div>
                  <CheckCircle size={15} color="#007C58" />
                </div>
                <button onClick={() => toast.info('로그아웃 되었습니다.', { description: '로그인 페이지로 이동합니다.' })}
                  style={{ background: '#FEEAED', border: '1px solid #E4002B', borderRadius: '10px', color: '#B8001F', padding: '10px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 600 }}>
                  <LogOut size={14} /> 로그아웃
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}