import { useState } from 'react';
import {
  Bell, Mail, Smartphone, CheckCircle, XCircle, Clock,
  FileText, Wrench, Car, Flower2, Package, CreditCard,
  Globe, Moon, Volume2, Shield, Save,
} from 'lucide-react';
import { toast } from 'sonner';
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
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' } }),
};

interface ToggleProps { value: boolean; onChange: (v: boolean) => void; color?: string; }

function Toggle({ value, onChange, color = '#0093AD' }: ToggleProps) {
  return (
    <button onClick={() => onChange(!value)}
      style={{ width: '44px', height: '24px', borderRadius: '100px', background: value ? color : 'rgba(0,0,0,0.12)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, padding: 0 }}>
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: value ? '23px' : '3px', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
    </button>
  );
}

export default function Settings() {
  const [tab, setTab] = useState<'notifications' | 'system' | 'privacy'>('notifications');
  const [notifSettings, setNotifSettings] = useState({
    systemApproved: true, systemRejected: true, systemCompleted: true, systemReminder: false,
    emailApproved: true, emailRejected: true, emailWeekly: false, emailMarketing: false,
    pushAll: true, pushApproved: true, pushRejected: false,
    typeWreath: true, typeSupplies: true, typeVehicle: true, typeCard: true, typeFacility: true, typeDocument: true,
  });
  const [sysSettings, setSysSettings] = useState({ darkMode: false, soundAlerts: false, language: 'ko', timezone: 'Asia/Seoul', autoLogout: '60' });
  const toggleNotif = (key: keyof typeof notifSettings) => setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  const handleSave = () => toast.success('설정이 저장되었습니다.', { description: '변경된 알림 설정이 적용되었습니다.', icon: '✓' });

  const tabs = [
    { key: 'notifications', label: '알림 설정', icon: <Bell size={14} /> },
    { key: 'system', label: '시스템 설정', icon: <Globe size={14} /> },
    { key: 'privacy', label: '개인정보 및 보안', icon: <Shield size={14} /> },
  ] as const;

  return (
    <div>
      <Breadcrumb />
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740' }}>설정</h1>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>알림, 시스템, 보안 설정을 관리하세요</p>
        </div>
        <button onClick={handleSave}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#0093AD', border: 'none', borderRadius: '10px', color: '#fff', padding: '9px 20px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#007A90')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#0093AD')}>
          <Save size={15} /> 변경사항 저장
        </button>
      </motion.div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: '#F3F3F8', borderRadius: '12px', padding: '4px', width: 'fit-content', border: '1px solid rgba(0,0,0,0.07)' }}>
        {tabs.map(({ key, label, icon }) => (
          <button key={key} onClick={() => setTab(key)}
            style={{ background: tab === key ? '#FFFFFF' : 'transparent', border: 'none', borderRadius: '9px', color: tab === key ? '#1D1740' : '#6B6B80', padding: '8px 18px', fontSize: '0.8375rem', fontWeight: tab === key ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '7px', transition: 'all 0.15s', whiteSpace: 'nowrap', boxShadow: tab === key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
            {icon} {label}
          </button>
        ))}
      </motion.div>

      {/* NOTIFICATIONS TAB */}
      {tab === 'notifications' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="md:grid-cols-2 lg:grid-cols-3">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: 'rgba(0,147,173,0.1)', borderRadius: '7px', padding: '5px', display: 'inline-flex' }}><Bell size={14} color="#0093AD" /></span>
              시스템 ��림
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { key: 'systemApproved', label: '신청 승인 알림', desc: '신청이 승인되었을 때', icon: <CheckCircle size={13} color="#007C58" /> },
                { key: 'systemRejected', label: '신청 반려 알림', desc: '신청이 반려되었을 때', icon: <XCircle size={13} color="#E4002B" /> },
                { key: 'systemCompleted', label: '처리 완료 알림', desc: '신청 처리가 완료되었을 때', icon: <CheckCircle size={13} color="#0093AD" /> },
                { key: 'systemReminder', label: '신청 기한 리마인더', desc: '처리 기한 1일 전 알림', icon: <Clock size={13} color="#C27A00" /> },
              ].map((item) => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: '0.8375rem', color: '#1D1740', fontWeight: 500 }}>{item.label}</p>
                      <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '1px' }}>{item.desc}</p>
                    </div>
                  </div>
                  <Toggle value={notifSettings[item.key as keyof typeof notifSettings] as boolean} onChange={() => toggleNotif(item.key as keyof typeof notifSettings)} color="#0093AD" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: 'rgba(0,124,88,0.1)', borderRadius: '7px', padding: '5px', display: 'inline-flex' }}><Mail size={14} color="#007C58" /></span>
              이메일 알림
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { key: 'emailApproved', label: '승인/반려 결과 이메일', desc: '신청 결과를 이메일로 수신' },
                { key: 'emailRejected', label: '처리 완료 이메일', desc: '처리 완료 시 이메일 수신' },
                { key: 'emailWeekly', label: '주간 신청 요약', desc: '매주 월요일 신청 현황 요약' },
                { key: 'emailMarketing', label: '공지/업데이트 소식', desc: '시스템 업데���트 및 공지' },
              ].map((item) => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <div>
                    <p style={{ fontSize: '0.8375rem', color: '#1D1740', fontWeight: 500 }}>{item.label}</p>
                    <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '1px' }}>{item.desc}</p>
                  </div>
                  <Toggle value={notifSettings[item.key as keyof typeof notifSettings] as boolean} onChange={() => toggleNotif(item.key as keyof typeof notifSettings)} color="#007C58" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: 'rgba(228,0,43,0.08)', borderRadius: '7px', padding: '5px', display: 'inline-flex' }}><Smartphone size={14} color="#E4002B" /></span>
              서비스별 알림 수신
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { key: 'typeWreath', label: '화환 신청', icon: <Flower2 size={13} color="#E4002B" /> },
                { key: 'typeSupplies', label: '사무용품', icon: <Package size={13} color="#C27A00" /> },
                { key: 'typeVehicle', label: '법인차량', icon: <Car size={13} color="#0093AD" /> },
                { key: 'typeCard', label: '명함 신청', icon: <CreditCard size={13} color="#007C58" /> },
                { key: 'typeFacility', label: '고장 신고', icon: <Wrench size={13} color="#C27A00" /> },
                { key: 'typeDocument', label: '법인 문서', icon: <FileText size={13} color="#0093AD" /> },
              ].map((item) => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span>{item.icon}</span>
                    <p style={{ fontSize: '0.8375rem', color: '#1D1740', fontWeight: 500 }}>{item.label}</p>
                  </div>
                  <Toggle value={notifSettings[item.key as keyof typeof notifSettings] as boolean} onChange={() => toggleNotif(item.key as keyof typeof notifSettings)} color="#E4002B" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* SYSTEM TAB */}
      {tab === 'system' && (
        <div style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Moon size={15} color="#0093AD" /> 디스플레이
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                <div>
                  <p style={{ fontSize: '0.8375rem', color: '#1D1740', fontWeight: 500 }}>다크 모드</p>
                  <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '1px' }}>어두운 테마 사용</p>
                </div>
                <Toggle value={sysSettings.darkMode} onChange={(v) => setSysSettings((p) => ({ ...p, darkMode: v }))} color="#1D1740" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                <div>
                  <p style={{ fontSize: '0.8375rem', color: '#1D1740', fontWeight: 500 }}>알림음</p>
                  <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '1px' }}>새 알림 수신 시 소리 재생</p>
                </div>
                <Toggle value={sysSettings.soundAlerts} onChange={(v) => setSysSettings((p) => ({ ...p, soundAlerts: v }))} color="#C27A00" />
              </div>
            </div>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={15} color="#007C58" /> 언어 및 지역
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div><label className="cw-label">언어</label><select className="cw-input" value={sysSettings.language} onChange={(e) => setSysSettings((p) => ({ ...p, language: e.target.value }))}><option value="ko">한국어</option><option value="en">English</option></select></div>
              <div><label className="cw-label">시간대</label><select className="cw-input" value={sysSettings.timezone} onChange={(e) => setSysSettings((p) => ({ ...p, timezone: e.target.value }))}><option value="Asia/Seoul">Asia/Seoul (KST, UTC+9)</option><option value="America/New_York">America/New_York (EST, UTC-5)</option><option value="Europe/London">Europe/London (GMT, UTC+0)</option></select></div>
            </div>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Volume2 size={15} color="#C27A00" /> 세션 설정
            </h3>
            <div>
              <label className="cw-label">자동 로그아웃 (분)</label>
              <select className="cw-input" value={sysSettings.autoLogout} onChange={(e) => setSysSettings((p) => ({ ...p, autoLogout: e.target.value }))}>
                <option value="30">30분</option><option value="60">60분</option><option value="120">2시간</option><option value="480">8시간</option><option value="0">사용 안 함</option>
              </select>
              <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '6px' }}>비활성 상태가 지속될 경우 자동으로 로그아웃됩니다.</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* PRIVACY TAB */}
      {tab === 'privacy' && (
        <div style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={cardStyle}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={15} color="#0093AD" /> 데이터 및 개인정보
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { title: '신청 내역 보관 기간', desc: '완료된 신청 내역을 시스템에 보관하는 기간', value: '3년 (법적 의무)', readonly: true },
                { title: '접속 로그 기록', desc: '로그인 시간, IP 주소, 기기 정보 기록', value: '활성화 (필수)', readonly: true },
                { title: '개인정보 처리방침', desc: '마지막 업데이트: 2025-11-30', value: '보기 →', readonly: false, action: () => toast.info('개인정보 처리방침 페이지로 이동합니다.') },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <div>
                    <p style={{ fontSize: '0.8375rem', color: '#1D1740', fontWeight: 500 }}>{item.title}</p>
                    <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '1px' }}>{item.desc}</p>
                  </div>
                  <button onClick={item.action} disabled={item.readonly}
                    style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '7px', color: item.action ? '#0093AD' : '#9898A8', padding: '5px 12px', fontSize: '0.775rem', cursor: item.action ? 'pointer' : 'default', fontFamily: 'inherit', whiteSpace: 'nowrap', fontWeight: item.action ? 600 : 400 }}>
                    {item.value}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" style={{ ...cardStyle, border: '1.5px solid rgba(228,0,43,0.2)', background: '#FFFBFB' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#B8001F', marginBottom: '12px' }}>위험 구역</h3>
            <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginBottom: '16px', lineHeight: 1.6 }}>아래 작업은 되돌릴 수 없습니다. 신중하게 진행해 주세요.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => toast.warning('데이터 내보내기를 요청하였습니다. 이메일로 발송됩니다.')}
                style={{ background: '#F8F8FC', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', color: '#1D1740', padding: '11px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 500 }}>
                내 데이터 내보내기 (JSON)
              </button>
              <button onClick={() => toast.error('계정 삭제는 IT 헬프데스크(내선 1003)에 문의해 주세요.', { duration: 5000 })}
                style={{ background: '#FEEAED', border: '1px solid #E4002B', borderRadius: '10px', color: '#B8001F', padding: '11px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}>
                계정 비활성화 요청
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
